import Newton from 'newton';
import md5 from 'blueimp-md5';
import Reporter from '../lib/Reporter';
import { AxiosInstance } from '../lib/AxiosService';
import * as Constants from '../lib/Constants';
import { hideMenu, showMenu } from './menu-actions';
import { hideMenuList, showMenuList } from './menulist-actions';
import { increaseMatchPlayed } from './user-actions';
import { hideGameOver, hideEnterNameModal, showEnterNameModal, showLeaderboard, hideLeaderboard, redirectLanding } from './gameover-actions';
import { getUserType } from './utils';
import { showBanner, deferredBanner } from './adv-actions';
import location from '../lib/Location';

let onStartCallback = () => { };

function doStartSession() {
  return (dispatch, getState) => {
    if (getState().session.opened) {
      /**
       * TODO:
       * startSession called before endSession
       * report an error in debug env
       */

      Reporter.add('warn', 'Trying to start a session when one is already opened');
      console.warn('Cannot start a new session before closing the current one. Session reset');
    }

    const session = {
      opened: true,
      startTime: new Date(),
      endTime: undefined,
      score: undefined,
      level: undefined,
    };
    dispatch({ type: 'START_SESSION', session });
    /** put timestamp on start session for test */
    window._START_SESSION_TIMESTAMP_ = session.startTime.getTime();
    onStartCallback();
    return Promise.resolve();
  };
}


export function registerOnStartCallback(callback) {
  onStartCallback = callback;
  return { type: 'REGISTER_ON_START_SESSION_CALLBACK', registered: true };
}

export function startSession() {
  return (dispatch, getState) => {
    if (getState().user.canPlay || getState().user.canDownload) {
      dispatch((getState().vhost.GFSDK_MENU_TYPE === 'extended') ? hideMenuList() : hideMenu());
      dispatch(hideGameOver());
      dispatch(hideEnterNameModal());
      dispatch(hideLeaderboard());
      dispatch(doStartSession());
    } else {
      console.log('User cannot play');
    }
  };
}

export function setRank(rank) {
  return {
    type: 'SET_RANK',
    rank,
  };
}

export function endSession(data = { score: 0, level: 1 }) {
  if (!data.level) {
    Reporter.add('warn', 'end session called without level. Is Your game without levels?');
    data.level = 1;
  }
  return (dispatch, getState) => {
    const { user, vhost, generic } = getState();
    // only if already initialized
    if (!generic.initialized) {
      /**
       * TODO:
       * endSession before init
       * report an error in debug env
       */
      Reporter.add('error', 'endSession before init!');
      console.log('Cannot end a session before initialized');
      // return;
    }

    const { FW_TYPE_PROFILE, GFSDK_ENDSESSION_TO_LANDING, CAT_DEFAULT_SUBSCRIBE_URL, DEST_DOMAIN } = vhost;
    const creativity = location.getQueryStringKey('utm_term');

    const bannerCondition = [
      (user.matchPlayed % 3 === 0),
      vhost.INSTALL_HYBRID_VISIBLE,
    ].every(condition => condition === true);

    const freemiumCondition = [
      getUserType(user) !== 'premium',
      !isNaN(creativity),
      GFSDK_ENDSESSION_TO_LANDING,
    ].every(condition => condition === true);

    const AndroidCondition = [
      generic.platformInfo.android,
      (typeof vhost.GOOGLEPLAY_STORE_URL !== "undefined")
    ].every(condition => condition === true);

    const IosCondition = [
      generic.platformInfo.ios,
      (typeof vhost.ITUNES_STORE_URL !== "undefined")
    ].every(condition => condition === true);

    if (bannerCondition && !freemiumCondition && (AndroidCondition || IosCondition)) {
      (generic.initConfig.lite)?dispatch(showBanner()):dispatch(deferredBanner());
    }

    // and a session was started
    if (Object.keys(getState().session).length > 0 && getState().session.opened) {
      const endTime = new Date();
      const session = { score: data.score, level: data.level, endTime, opened: false };
      dispatch({ type: 'END_SESSION', session });
      dispatch(increaseMatchPlayed());
      dispatch((vhost.GFSDK_MENU_TYPE === 'extended') ? showMenuList() : showMenu());
      // const lastSession = getState().session;
      const { game_type } = getState().game_info;
      const { initConfig } = getState().generic;

      if (freemiumCondition) {
        dispatch(redirectLanding({
          CAT_DEFAULT_SUBSCRIBE_URL,
          DEST_DOMAIN,
          creativity,
          subscribed: getUserType(user) === 'premium',
        }));
        return;
      }

      if (FW_TYPE_PROFILE === 'bandai' && game_type === 'bandai') {
        dispatch(showEnterNameModal());
        return;
      }

      if (initConfig.lite === false) {
        dispatch(showEnterNameModal({ showReplayButton: true }));
        return;
      }

      return;
    }
    /**
     * TODO:
     * endSession before startSession
     * report an error in debug env
     */
    Reporter.add('error', 'endSession before startSession!');
    console.log('No session started!');
  };
}

/**
 * The register score function for bandai
 * @param {string} alias - the alias to register
 * @param {number} inputFocus - the index of the input field in the gameover
 * @returns {function} - return the redux thunk function
 */
export function registerScore(alias, inputFocus) {
  return (dispatch, getState) => {
    const shouldTrack = true;
    let eventName = 'NicknameAdded';
    if (inputFocus === 0 && alias === 'aaa') {
      eventName = 'DefaultNicknameAdded';
    }
    const lastSession = getState().session;
    const userId = getState().user.user;
    const { vhost, banner } = getState();
    const { id, category_id, category } = getState().game_info;    
    const NewtonInstance = Newton.getSharedInstance();
    const sessionId = NewtonInstance.getSessionId();
    const params = {
      player_name: alias,
      score: lastSession.score,
      level: lastSession.level,
      gametime: new Date(lastSession.endTime) - new Date(lastSession.startTime),
      user_id: userId,
      category_id:  category_id || category.id_category,
      content_id: id,
      session_id: sessionId,
    };

    params.signature = md5(`${params.user_id}${params.score}${params.content_id}pacmania`);
    // set is loading: true
    dispatch({ type: 'REGISTER_SCORE_START' });
    return AxiosInstance.post(vhost.MOA_API_LEADERBOARD_POST_SCORE, params,
      { withCredentials: true })
      .then((response) => {
        const realResponse = response.data.response;

        if (realResponse.error === 0) {
          const payload = {
            leaderboard: realResponse.data.top_scorer,
            shouldTrack,
            eventName,
          };
          dispatch({ type: 'REGISTER_SCORE_SUCCESS', payload });
          dispatch(hideEnterNameModal());
          dispatch(showLeaderboard());

          if (banner.deferredShow) {
            dispatch(showBanner());
          }
        } else {
          dispatch({ type: 'REGISTER_SCORE_FAIL', payload: { error: realResponse } });
        }
      })
      .catch((reason) => {
        dispatch({ type: 'REGISTER_SCORE_FAIL', payload: { error: reason.toString() } });
      });
  };
}
