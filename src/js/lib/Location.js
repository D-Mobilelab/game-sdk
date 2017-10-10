import { dequeryfy } from 'docomo-utils';
import localStorage from './LocalStorage';
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
    if (!theWindow.location.origin) {
      const port = (theWindow.location.port ? `:${theWindow.location.port}` : '');
      theWindow.location.origin = `${theWindow.location.protocol}//${theWindow.location.hostname}${port}`;
    }
    const isGameasyRegex = new RegExp(/http:\/\/www2?\.gameasy\.com\/([a-zA-Z0-9-_]*)/);
    const isGameasyMatch = theWindow.location.href.match(isGameasyRegex);

    let gameasyCountryCode = '', toJoin = [];
    if (isGameasyMatch !== null) {
      gameasyCountryCode = isGameasyMatch[1];
      // if we are in testing integration mode we need this for url composition
      gameasyCountryCode = gameasyCountryCode === 'test' ? 'ww-it' : gameasyCountryCode;
    }

    toJoin.push(theWindow.location.origin);
    if (gameasyCountryCode && gameasyCountryCode !== '') {
      toJoin.push(gameasyCountryCode);
    }
    return toJoin.join('/');
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
