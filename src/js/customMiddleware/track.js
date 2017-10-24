import NewtonAdapter from 'newton-adapter';
import FacebookPixelAdapter from 'facebookpixeladapter';
import FacebookInterface from '../lib/FacebookInterface';

const mapNewtonEventToFacebook = {
  GameLoad: 'ViewContent',
  GameStart: 'AddToCart',
  GameEnd: 'Purchase',
};

export default function track(eventObject) {
  NewtonAdapter.trackEvent(eventObject);
  // FacebookInterface.trackEvent(eventObject.name, eventObject.properties);
  if (eventObject.name in mapNewtonEventToFacebook) {
    eventObject.properties.content_ids = [eventObject.properties.label];
    eventObject.properties.content_name = eventObject.properties.game_title;
    eventObject.properties.content_type = 'product';
    eventObject.properties.value = 0;
    FacebookPixelAdapter.track(mapNewtonEventToFacebook[eventObject.name], eventObject.properties);
  } else {
    FacebookPixelAdapter.trackCustom(eventObject.name, eventObject.properties);
  }
}
