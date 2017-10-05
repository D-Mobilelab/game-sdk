/*!
 * Buongiorno Game SDK - JS Library
 * Copyright 2017, Buongiorno, S.P.A.
 * All Rights Reserved
 * Released under the Modified BSD License
 */
import { Actions } from './js/actions/index';
import version from './version';

const privates = new WeakMap();
/*
 * SDK
 * @export
 * @class SDK
 */
export default class SDK {
  constructor(store) {
    privates.set(this, { store });
  }

  /**
   * Returns if the sdk has been initialized
   * @returns {Boolean}
   * @memberof SDK
   */
  isInitialized() {
    const { store } = privates.get(this);
    const { generic } = store.getState();
    return generic.initialized;
  }

  /**
   * Initialize the sdk
   * @memberOf SDK
   * @param {Object} initConfig
   * @param {Boolean} initConfig.lite - true if should show the gameover
   * @param {Object} initConfig.moreGamesButtonStyle - DEPRECATED since v2.5.3: a custom styles to pass to moregames button
   * @param {String} [initConfig.menuPosition='BOTTOM_RIGHT'] - TOP_LEFT, BOTTOM_LEFT, TOP_RIGHT, BOTTOM_RIGHT
   * @returns {Promise}
   */
  init(initConfig) {
    const { store } = privates.get(this);
    return store.dispatch(Actions.init(initConfig));
  }

  /**
   * Returns the whole state!
   * @returns {Object}
   * @memberOf SDK
   */
  getConfig() {
    const { store } = privates.get(this);
    return store.getState();
  }

  /**
   * Returns the number of the last level reached by user
   * @returns {Number}
   * @memberOf SDK
   */
  getLevel() {
    const { store } = privates.get(this);
    const { user } = store.getState();
    return user.level;
  }

  /**
   * Shows the menu|moregames button.
   * call this function when in pause
   * @param {string} [position] - custom position
   * @memberOf SDK
   */
  showMoreGamesButton(position) {
    const { store } = privates.get(this);
    store.dispatch(Actions.showMenu(position));
  }

  /**
   * Hides the menu | moregames button
   * call this function when on pause exit
   * @memberOf SDK
   */
  hideMoreGamesButton() {
    const { store } = privates.get(this);
    store.dispatch(Actions.hideMenu());
  }

  /**
   * Loads the arbitrary data from our server.
   * Returns somenthing only for retrocompatibility.
   * Since version >=2 must be called with the callback signature
   * @param {SDK~onLoadUserData} onLoadUserDataCb - The callback that handles the response.
   * @returns {Object|undefined}
   * @memberOf SDK
   */
  loadUserData(onLoadUserData) {
    // retro compatibility
    const { store } = privates.get(this);
    store.dispatch(Actions.loadUserData(onLoadUserData));
    if (window.GamifiveInfo && window.GamifiveInfo.user) {
      console.info('GamifiveSDK: Load userInfo from in page data');
      const userInfoCloned = JSON.parse(JSON.stringify(window.GamifiveInfo.user));

      if (!userInfoCloned.gameInfo) {
        userInfoCloned.gameInfo = { info: null };
      }

      if (typeof userInfoCloned.gameInfo.info === 'string') {
        try {
          userInfoCloned.gameInfo.info = JSON.parse(userInfoCloned.gameInfo.info);
        } catch (e) {
          userInfoCloned.gameInfo.info = null;
        }
      }
      return userInfoCloned.gameInfo.info;
    }
  }

  /**
   * Save an arbitrary object on server and on local
   * @param {Object} userDataInfo
   * @memberOf SDK
   */
  saveUserData(userDataInfo) {
    const { store } = privates.get(this);
    store.dispatch(Actions.saveUserData(userDataInfo));
  }

  /**
   * Clear the user data saved on local and on server.
   * Use this function only under explicit user input
   * @memberOf SDK
   */
  clearUserData() {
    const { store } = privates.get(this);
    store.dispatch(Actions.clearUserData());
  }

  /**
   * Redirect the browser to the game portal
   * @memberOf SDK
   */
  goToHome() {
    const { store } = privates.get(this);
    store.dispatch(Actions.goToHome());
  }

  /**
   * Get the user avatar if any.
   * @returns {Object} avatarObj
   * @returns {String} avatarObj.src - the url of the avatar object
   * @returns {String} avatarObj.nickname - the name of the user
   * @memberOf SDK
   */
  getAvatar() {
    const { store } = privates.get(this);
    const { user } = store.getState();
    return user.avatar;
  }

  /**
   * Get the userNickName if any. otherwise undefined
   * @returns {Object|undefined}
   * @memberOf SDK
   */
  getNickname() {
    const { store } = privates.get(this);
    const { user } = store.getState();
    return user.nickname;
  }

  /**
   * Register a function that will be called
   * on each startSession call
   * @param {Function} onStartSessionCallback
   * @memberOf SDK
   */
  onStartSession(onStartSessionCallback) {
    const { store } = privates.get(this);
    store.dispatch(Actions.registerOnStartCallback(onStartSessionCallback));
  }

  /**
   * Starts a session. If the init it's still in pending
   * the session will start on init finished
   * @memberOf SDK
   */
  startSession() {
    const { store } = privates.get(this);
    store.dispatch(Actions.startSession());
  }

  /**
   * Ends a session and calculate the session time.
   * This function can be called without params.
   * In this case only the session time is calculated. 
   * It can be called also with just the score and in this case the level is implicitly 1
   * this is useful for games without levels.
   * @param {Object} [scoreAndLevel={score:0, level:1}]
   * @memberOf SDK
   */
  endSession(scoreAndLevel) {
    const { store } = privates.get(this);
    store.dispatch(Actions.endSession(scoreAndLevel));
  }

  /**
   * Get the version object
   * @returns {Object} version
   * @returns {String} version.version - The commit string in semantic version syntax
   * @returns {String} version.build - The hash of the commit version refers
   * @memberOf SDK
   */
  getVersion() {
    return version;
  }

  generateReport() {
    const { store } = privates.get(this);
    return store.dispatch(Actions.generateReportAction());
  }
}
/**
 * Called when the data, saved with saveUserData,
 * has been loaded from server
 * @callback onLoadUserDataCb
 * @param {Object|null} userProgress
 */
