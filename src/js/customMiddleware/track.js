import NewtonAdapter from 'newton-adapter';
import FacebookPixelAdapter from 'facebookpixeladapter';
import FacebookInterface from '../lib/FacebookInterface';

export default function track(eventObject) {
  NewtonAdapter.trackEvent(eventObject);
  FacebookInterface.trackEvent(eventObject.name, eventObject.properties);
  FacebookPixelAdapter.trackCustom(eventObject.name, eventObject.properties);
}
