import { AxiosInstance } from '../lib/AxiosService';
import { isAndroid } from '../lib/Platform';
import Constants from '../lib/Constants';
import { hideMenu, showMenu } from './menu-actions';
import { increaseMatchPlayed } from './user-actions';
import { hideGameOver, showGameOver } from './gameover-actions';
import { getContentId, setRelated } from './gameinfo-actions';
import { showBanner } from './banner-actions';

let onStartCallback = () => {};

function doStartSession() {
  return (dispatch, getState) => {
    if (getState().session.opened) {
      /**
     * TODO:
     * startSession called before endSession
     * report an error in debug env
     */
      const warn = {
        type: 'warn',
        message: 'Trying to start a session when one is already opened',
      };
      window.__GAME_REPORT__.push(warn);
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
        // Not initialized but init called and pending
    if (!getState().generic.initialized && getState().generic.initPending) {
      dispatch({ type: 'ADD_TO_AFTER_INIT', session_start_after_init: true });
      // Not initialized, not even called init
    } else if (!getState().generic.initialized && !getState().generic.initPending) {
    /**
     * TODO:
     * Init not event called before startSession
     * report an error in debug env
     */
      const error = {
        type: 'error',
        message: 'start session before init!',
      };
      window.__GAME_REPORT__.push(error);
      console.log('You should call init before startSession!');
    } else if (getState().user.canPlay || getState().user.canDownload) {
      dispatch(hideMenu());
      dispatch(hideGameOver());
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

export function setMissingGameInfoPart(gameInfo) {
  return {
    type: 'ADD_MISSING_GAME_INFO',
    gameInfo,
  };
}

export function endSession(data = { score: 0, level: 1 }) {
  if (!data.level) {
    data.level = 1;
  }
  return (dispatch, getState) => {
    // only if already initialized
    if (!getState().generic.initialized) {
      /**
       * TODO:
       * endSession before init
       * report an error in debug env
       */
      const error = {
        type: 'error',
        message: 'endSession before init!',
      };
      window.__GAME_REPORT__.push(error);
      console.log('Cannot end a session before initialized');
      return;
    }

    const { user, generic, vhost } = getState();
    const bannerCondition = [
      (user.matchPlayed % 3 === 0),
      !generic.hybrid,
      isAndroid(),
      vhost.INSTALL_HYBRID_VISIBLE,
    ].every(condition => condition === true);

    if (bannerCondition) {
      dispatch(showBanner());
    }

    // and a session was started
    if (Object.keys(getState().session).length > 0
            && getState().session.opened) {
      const endTime = new Date();
      const session = { score: data.score, level: data.level, endTime, opened: false };
      dispatch({ type: 'END_SESSION', session });
      dispatch(increaseMatchPlayed());
      dispatch(showMenu());

      const lastSession = getState().session;
          // Lite only leaderboard
      if (!getState().generic.initConfig.lite) {
        dispatch(showGameOver());
      }
      const GAMEOVER_API = Constants.GAME_OVER_JSON_API_URL.replace(':CONTENT_ID', getContentId());
      const gameOverPromise = AxiosInstance.get(GAMEOVER_API, {
        params: {
          score: lastSession.score,
          level: lastSession.level,
          duration: new Date(lastSession.endTime) - new Date(lastSession.startTime),
          start: lastSession.startTime.getTime(),
          label: getState().game_info.label,
          userId: getState().user.user,
          cors_compliant: 1,
        },
      })
      .then((response) => {
        // get ranking?
        // response.data.ranking
        // response.data.gameInfo
        dispatch(setMissingGameInfoPart(response.data.gameInfo));
        dispatch(setRank(response.data.rank));
        dispatch(setRelated(response.data.related || []));
      });
      return gameOverPromise;
    }
      /**
       * TODO:
       * endSession before startSession
       * report an error in debug env
       */
      const error = {
        type: 'error',
        message: 'endSession before startSession!',
      };
      window.__GAME_REPORT__.push(error);
      console.log('No session started!');
  };
}
