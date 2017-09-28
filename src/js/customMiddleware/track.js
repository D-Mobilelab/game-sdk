import NewtonAdapter from 'newton-adapter';
import FacebookPixelAdapter from 'facebookpixeladapter';


export default function track(eventObject) {
  NewtonAdapter.trackEvent(eventObject);
  FacebookPixelAdapter.trackCustom(eventObject.name, eventObject.properties);
}
