import { dequeryfy } from 'docomo-utils';
import { localStorage } from './LocalStorage';
import windowConf from './windowConf';

let theWindow = {};
if (process.env.LOCAL_DEV === true) {
  console.warn('LOCAL_DEV');
  const GAME_ID = localStorage.getItem('gfsdk-debug-game_id');
  const HOST = localStorage.getItem('gfsdk-debug-host');
  const params = {};

  if (HOST) { params.HOST = HOST; }
  if (GAME_ID) { params.GAME_ID = GAME_ID; }
  theWindow.location = windowConf(params);
} else {
  theWindow = window;
}

export class Location {
  getOrigin() {
    const origin = window._ORIGIN_ ? window._ORIGIN_.substr(0, window._ORIGIN_.length - 1) : theWindow.location.origin;
    return origin;
  }

  getCurrentHref() {
    return theWindow.location.href;
  }

  getQueryStringKey(key) {
    return dequeryfy(theWindow.location.search)[key];
  }

  getQueryString() {
    return dequeryfy(theWindow.location.search);
  }

  getRealOrigin() {
    return theWindow.location.origin;
  }
}

const LocationInstance = new Location();
window.Location = LocationInstance;
export default LocationInstance;
