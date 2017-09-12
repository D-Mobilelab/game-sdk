import Newton from 'newton';
import Reporter from '../lib/Reporter';
import { AxiosInstance } from '../lib/AxiosService';
import { isAndroid } from '../lib/Platform';
import * as Constants from '../lib/Constants';
import { hideMenu, showMenu } from './menu-actions';
import { increaseMatchPlayed } from './user-actions';
import { hideGameOver, showGameOver, showEnterNameModal, showLeaderboard } from './gameover-actions';
import { getContentId, setRelated } from './gameinfo-actions';
import { showBanner } from './banner-actions';

let onStartCallback = () => { };
const hybrid = process.env.APP_ENV === 'HYBRID';

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

      Reporter.add('error', 'start session before init!');
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

export function endSession(data = { score: 0, level: 1 }) {
  if (!data.level) {
    Reporter.add('warn', 'end session called without level. Is Your game without levels?');
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
      Reporter.add('error', 'endSession before init!');
      console.log('Cannot end a session before initialized');
      return;
    }

    const { user, vhost } = getState();
    const bannerCondition = [
      (user.matchPlayed % 3 === 0),
      !hybrid,
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

      if (vhost.WHITE_LABEL.indexOf('bandai') > -1) {
        dispatch(showEnterNameModal());
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
          // dispatch(setMissingGameInfoPart(response.data.gameInfo));
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
    Reporter.add('error', 'endSession before startSession!');
    console.log('No session started!');
  };
}

export function registerScore(alias) {
  return (dispatch, getState) => {
    const lastSession = getState().session;
    const { vhost } = getState();
    const { content_id, category } = getState().game_info;
    const NewtonInstance = Newton.getSharedInstance();
    const userToken = NewtonInstance.getUserToken();
    const params = {
      player_name: alias,
      score: lastSession.score,
      level: lastSession.level,
      gametime: new Date(lastSession.endTime) - new Date(lastSession.startTime),
      user_id: userToken,
      category_id: category.id_category,
      content_id,
      session_id: userToken,
      white_label: vhost.WHITE_LABEL,
      country: vhost.REAL_COUNTRY,
    };

    // set is loading: true
    return AxiosInstance.post(vhost.MOA_API_LEADERBOARD_POST_SCORE, params)
      .then((response) => {
        // set is loading false
        // showLeaderBoard(leaderboard)
        const realResponse = response.data.response;
        if (realResponse.error === 0) {
          // mock it for now
          /*realResponse.data.top_scorer = [
            {
              player_name: "pas",
              score: "90",
              level: "6",
              white_label: "xx_bandai",
              country: "it",
              content_id: "ff5ca19abe70b0f0bcc6d309594255cc",
              user_id: "E_5661827a319011e7a847005056b60712",
              gametime: "15",
              additional_data: "",
              category_id: "5bfa4fcff1f05613b419ebb072035925",
              session_id: "fakesessionid1234",
              timestamp: 1499077223,
              position: 1,
              formatted: true
            },
            {
              player_name: "daf",
              score: "89",
              level: "6",
              white_label: "xx_bandai",
              country: "it",
              content_id: "ff5ca19abe70b0f0bcc6d309594255cc",
              user_id: "E_5661827a319011e7a847005056b60712",              
              gametime: "15",
              additional_data: "",
              category_id: "5bfa4fcff1f05613b419ebb072035925",
              session_id: "fakesessionid1234",
              timestamp: 1499077223,
              position: 2,
              formatted: true
            },
            {
              player_name: "dfa",
              score: "89",
              level: "6",
              white_label: "xx_bandai",
              country: "it",
              content_id: "ff5ca19abe70b0f0bcc6d309594255cc",
              user_id: "E_5661827a319011e7a847005056b60712",              
              gametime: "15",
              additional_data: "",
              category_id: "5bfa4fcff1f05613b419ebb072035925",
              session_id: "fakesessionid1234",
              timestamp: 1499077223,
              position: 3,
              formatted: true
            },
            {
              player_name: "pas",
              score: "89",
              level: "6",
              white_label: "xx_bandai",
              country: "it",
              content_id: "ff5ca19abe70b0f0bcc6d309594255cc",
              user_id: "E_5661827a319011e7a847005056b60712",              
              gametime: "15",
              additional_data: "",
              category_id: "5bfa4fcff1f05613b419ebb072035925",
              session_id: "fakesessionid1234",
              timestamp: 1499077223,
              position: 4,
              formatted: true
            },
            {
              player_name: "faf",
              score: "89",
              level: "6",
              white_label: "xx_bandai",
              country: "it",
              content_id: "ff5ca19abe70b0f0bcc6d309594255cc",
              user_id: "E_5661827a319011e7a847005056b60712",              
              gametime: "15",
              additional_data: "",
              category_id: "5bfa4fcff1f05613b419ebb072035925",
              session_id: "fakesessionid1234",
              timestamp: 1499077223,
              position: 5,
              formatted: true
            },
          ];*/
          dispatch(showLeaderboard({ leaderboard: realResponse.data.top_scorer }));
        }
      })
      .catch((reason) => {
        console.log(reason);
        // set is loading false
        // dispatch(showLeaderboard(true));
      });
  };
}
