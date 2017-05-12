import Utils from 'docomo-utils';
import localStorage from './LocalStorage';
import windowConf from './windowConf';

let theWindow = {};
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'preprod') {
  const GAME_ID = localStorage.getItem('gfsdk-debug-game_id');
  const HOST = localStorage.getItem('gfsdk-debug-host');
  const params = {};

  if (HOST) { params.HOST = HOST; }
  if (GAME_ID) { params.GAME_ID = GAME_ID; }
  theWindow.location = windowConf(params);
} else {
  theWindow = window;
}

class Location {
  getOrigin() {
    if (!theWindow.location.origin) {
      const port = (theWindow.location.port ? `:${theWindow.location.port}` : '');
      theWindow.location.origin = `${theWindow.location.protocol}//${theWindow.location.hostname}${port}`;
    }
    const isGameasyRegex = new RegExp(/http:\/\/www2?\.gameasy\.com\/([a-zA-Z0-9-_]*)/);
    const isGameasyMatch = theWindow.location.href.match(isGameasyRegex);

    let gameasyCountryCode = '',
        toJoin = [];
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
    return Utils.dequeryfy(theWindow.location.search)[key];
  }

  getQueryString() {
    return Utils.dequeryfy(theWindow.location.search);
  }

  /**
   * gameasy.ru, gameasy.sg, www.gameasy.com
   * @returns {Boolean} - return if the hostname it's a gameasy whitelabel
   */
  isGameasy() {
    /**
     * this regex should get host
     * let hostRegex = new RegExp(/(https?:)\/\/(www2?)?\.?([a-zA-Z0-9_-]+)\.?\.[a-zA-Z0-9_-]{2,}/, 'g');
     */
    const host = theWindow.location.host || theWindow.location.hostname;
    const domainLevels = host.split('.');
    return domainLevels.some(level => level.indexOf('gameasy') > -1);
  }

  /**
   * isGamifive
   * @returns {Boolean} - return if the hostname it's a gamifive whitelabel
   */
  isGamifive() {
    return !this.isGameasy();
  }
}

const LocationInstance = new Location();
window.Location = LocationInstance;
export default LocationInstance;
