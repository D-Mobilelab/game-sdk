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
  FacebookInterface.trackEvent(eventObject.name, eventObject.properties);
  if (eventObject.name in mapNewtonEventToFacebook) {
    FacebookPixelAdapter.track(mapNewtonEventToFacebook[eventObject.name], eventObject.properties);
  } else {
    FacebookPixelAdapter.trackCustom(eventObject.name, eventObject.properties);
  }
}
