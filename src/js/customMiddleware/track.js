import NewtonAdapter from 'newton-adapter';
import FacebookPixelAdapter from 'facebookpixeladapter';

const mapNewtonEventToFacebook = {
  GameLoad: 'ViewContent',
  GameStart: 'AddToCart',
  GameEnd: 'Purchase',
};

export default function track(eventObject) {
  NewtonAdapter.trackEvent(eventObject);
  FacebookPixelAdapter.trackCustom(eventObject.name, eventObject.properties);
  if (eventObject.name in mapNewtonEventToFacebook) {
    const clonedEventObject = Object.assign({}, eventObject);
    clonedEventObject.properties = {};
    clonedEventObject.properties.content_ids = [eventObject.properties.label];
    clonedEventObject.properties.content_name = eventObject.properties.game_title;
    clonedEventObject.properties.content_type = 'product';
    clonedEventObject.properties.currency = 'USD';
    clonedEventObject.properties.value = 1;
    FacebookPixelAdapter.track(mapNewtonEventToFacebook[clonedEventObject.name], clonedEventObject.properties);
  }
}

/*
pageViewProps.action = 'pageview';
pageViewProps.page_name = $rootScope.currentRoute;
pageViewProps.page_title = document.title;
pageViewProps.http_referrer = document.referrer || '';
pageViewProps.previous_pageview = prevRef || '';
pageViewProps.page_path = $location.absUrl();
pageViewProps.msisdn = $stateParams.msisdn || '';
//label, content, category
NewtonAdapter.trackPageview({ properties: pageViewProps });
*/
