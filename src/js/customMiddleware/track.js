import NewtonAdapter from 'newton-adapter';
import FacebookPixelAdapter from 'facebookpixeladapter';

const mapNewtonEventToFacebook = {
  GameLoad: 'ViewContent',
  GameStart: 'AddToCart',
  GameEnd: 'Purchase',
};

export default function track(eventObject) {
  NewtonAdapter.trackEvent(eventObject);
  if (eventObject.name in mapNewtonEventToFacebook) {
    eventObject.properties.content_ids = [eventObject.properties.label];
    eventObject.properties.content_name = eventObject.properties.game_title;
    eventObject.properties.content_type = 'product';
    eventObject.properties.currency = 'USD';
    eventObject.properties.value = 1;
    FacebookPixelAdapter.track(mapNewtonEventToFacebook[eventObject.name], eventObject.properties);
  } else {
    FacebookPixelAdapter.trackCustom(eventObject.name, eventObject.properties);
  }
}
