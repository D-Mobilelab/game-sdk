/*!
 * Buongiorno Game SDK - JS Library
 * Copyright 2017, Buongiorno, S.P.A.
 * All Rights Reserved
 * Released under the Modified BSD License
 */

/*
 * SDK
 * @export
 * @class SDK
 */
class SDK {

  constructor() {
    this.state = {
      user: {
        user: null,
        level: 0,
        score: 0,
        userData: {
          CreatedAt: new Date(0).toISOString(),
          UpdatedAt: new Date(0).toISOString(),
          ProductId: null,
          contentId: null,
          domain: null,
          Creator: null,
          _id: null,
          info: null,
        },
        logged: false,
        favourites: [],
      },
      game_info: {},
    };

    this.onLoadUserData = function(){};

    const regex = /bundles\/(\w+)\//gi;
    const results = regex.exec(location.href);
    this.ID = '';
    try {
      this.ID = `::${results[1].toLowerCase()}`;
    } catch (e) {
      this.ID = location.href;
      console.warn('Error finding ID in', location.href);
    }

    const loadedState = localStorage.getItem(`${this.ID}`);
    if (loadedState) {
      this.state = JSON.parse(loadedState);
    }
  }

  /**
   * Initialize the sdk
   * @memberOf SDK
   * @param {Object}  initConfig
   * @param {Boolean} initConfig.lite - true if should show the gameover
   * @param {Object}  initConfig.moreGamesButtonStyle - a custom styles to pass to moregames button
   * @returns {Promise}
   */
  init(initConfig) {
    console.log('Init');
    this.onLoadUserData(this.state.user.userData);
    return Promise.resolve();
  }

  /**
   * Returns the whole state!
   * @returns {Object}
   * @memberOf SDK
   */
  getConfig() {
    console.log('getConfig');
    return this.state;
  }

  /**
   * Returns the number of the last level reached by user
   * @returns {Number}
   * @memberOf SDK
   */
  getLevel() {
    console.log('getLevel');
    return this.state.user.level;
  }

  /**
   * Shows the menu|moregames button.
   * call this function when in pause
   * @memberOf SDK
   */
  showMoreGamesButton() {
    console.log('showMoreGamesButton');
  }

  /**
   * Hides the menu | moregames button
   * call this function when on pause exit
   * @memberOf SDK
   */
  hideMoreGamesButton() {
    console.log('hideMoreGamesButton');
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
    console.log('loadUserData');
    this.onLoadUserData = onLoadUserData;
  }

  /**
   * Save an arbitrary object on server and on local
   * @param {Object} userDataInfo
   * @memberOf SDK
   */
  saveUserData(userDataInfo) {
    console.log('saveUserData');
    this.state.user.userData.info = userDataInfo;
  }

  /**
   * Clear the user data saved on local and on server.
   * Use this function only under explicit user input
   * @memberOf SDK
   */
  clearUserData() {
    console.log('clearUserData');
    this.state.user.userData.info = null;
  }

  /**
   * Redirect the browser to the game portal
   * @memberOf SDK
   */
  goToHome() {
    console.log('goToHome');
    localStorage.setItem(`${this.ID}`, JSON.stringify(this.state));
  }

  /**
   * Get the user avatar if any.
   * @returns {Object} avatarObj
   * @returns {String} avatarObj.src - the url of the avatar object
   * @returns {String} avatarObj.nickname - the name of the user
   * @memberOf SDK
   */
  getAvatar() {
    console.log('getAvatar');
    return {
      src: '',
      nickname: '',
    };
  }

  /**
   * Get the userNickName if any. otherwise undefined
   * @returns {Object|undefined}
   * @memberOf SDK
   */
  getNickname() {
    console.log('getNickname');
    return '';
  }

  /**
   * Register a function that will be called
   * on each startSession call
   * @param {Function} onStartSessionCallback
   * @memberOf SDK
   */
  onStartSession(onStartSessionCallback = function(){}) {
    console.log('onStartSession');
    this.onStartSessionCallback = onStartSessionCallback;
  }

  /**
   * Starts a session. If the init it's still in pending
   * the session will start on init finished
   * @memberOf SDK
   */
  startSession() {
    console.log('startSession');
    this.onStartSessionCallback();
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
    console.log('endSession');
    this.state.user.level = scoreAndLevel.level ? scoreAndLevel.level : 1;
    this.state.user.score = scoreAndLevel.score;
  }

  /**
   * Get the version object
   * @returns {Object} version
   * @returns {String} version.version - The commit string in semantic version syntax
   * @returns {String} version.build - The hash of the commit version refers
   * @memberOf SDK
   */
  getVersion() {
    console.log('getVersion');
  }

  generateReport() {
    console.log('generateReport');
  }
}
/**
 * Called when the data, saved with saveUserData,
 * has been loaded from server
 * @callback onLoadUserDataCb
 * @param {Object|null} userProgress
 */
const sdkInstance = new SDK();
module.exports = sdkInstance;
