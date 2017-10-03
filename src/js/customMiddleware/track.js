import NewtonAdapter from 'newton-adapter';
import FacebookInterface from '../lib/FacebookInterface';

export default function track(eventObject) {
  NewtonAdapter.trackEvent(eventObject);
  FacebookInterface.trackEvent(eventObject.name, eventObject.properties);
}
