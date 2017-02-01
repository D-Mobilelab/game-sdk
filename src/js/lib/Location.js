import { Utils } from 'stargatejs';
import localStorage from './LocalStorage';

let theWindow = {};
const isProduction = () => process.env.NODE_ENV === 'production';
const isPreprod = () => process.env.NODE_ENV === 'preprod';

if (!isProduction() && !isPreprod()) {
  const windowConf = require('./windowConf');

  const gameId = localStorage.getItem('gfsdk-debug-game_id');
  const host = localStorage.getItem('gfsdk-debug-host');
  theWindow.location = windowConf(host, gameId);
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
    return Utils.dequeryfy(theWindow.location.href)[key];
  }

  getQueryString() {
    return Utils.dequeryfy(theWindow.location.href);
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
export default LocationInstance;
