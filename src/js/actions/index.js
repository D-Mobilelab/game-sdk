import Stargate from 'stargatejs';
import Location from '../lib/Location';
import Constants from '../lib/Constants';
import Reporter from '../lib/Reporter';
import HistoryGame from '../lib/HistoryGame';

import * as sessionActions from './session-actions';
import * as userActions from './user-actions';
import * as gameinfoActions from './gameinfo-actions';
import * as userDataActions from './userData-actions';
import * as menuActions from './menu-actions';
import * as gameoverActions from './gameover-actions';
import * as vhostActions from './vhost-actions';
import * as newtonActions from './newton-actions';
import * as bannerActions from './banner-actions';
import * as sharerActions from './sharer-actions';

const { Utils } = Stargate;
const vhostKeys = [
  'CONTENT_RANKING',
    // "GAMEOVER_LIKE_CLASS_TO_TOGGLE",
    // "GAMEOVER_LIKE_SELECTOR",
  'IMAGES_SPRITE_GAME',
  'MOA_API_APPLICATION_OBJECTS_GET',
  'MOA_API_APPLICATION_OBJECTS_SET',
    // "MOA_API_USER_CHECK",
  'NEWTON_SECRETID',
  'TLD',
  'NT_REAL_COUNTRY',
  'INSTALL_HYBRID_VISIBLE',
];

/*
function hashHandler(event, dispatch) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  const { oldURL, newURL } = event;
  if (oldURL.indexOf('gameplay') > -1 && newURL.indexOf('index') > -1) {
    dispatch({ type: 'BACK_CLICKED', payload: event });
    dispatch(menuActions.goToHome());
    return false;
  }
  return false;
}
*/

function historyHandler(event, dispatch) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  const { state } = event;
  if (state.location === 'step1') {
    /* * 
     * This means the user have clicked back and 
     * coming from a related game
     * */
    dispatch({ type: 'BACK_CLICKED' });
    
    const lastHistoryGame = HistoryGame.pop();
    if (lastHistoryGame) {
      window.location.href = lastHistoryGame;
      return false;
    }

    dispatch(menuActions.goToHome());
    return false;
  } 
  /*
  else if (state.location === 'step0') {
    dispatch({ type: 'BACK_CLICKED' });
    dispatch(menuActions.goToHome());
    return false;
  }
  */
}

function wrapHandler(fn, dispatch) {
  return function realHandler(event) {
    return fn.call(null, event, dispatch);
  };
}

/*
* window.location.hash = '#index';
* window.location.hash = '#gameplay';
*/

window.history.replaceState({ location: 'step0' }, document.title, `${window.location.pathname}#0`);
window.history.pushState({ location: 'step1' }, document.title, `${window.location.pathname}#1`);
window.history.pushState({ location: 'step2' }, document.title, `${window.location.pathname}#2`);

/** registering state change */
function init(initConfig) {
  return (dispatch, getState) => {
    window.addEventListener('popstate', wrapHandler(historyHandler, dispatch));
    /** registering hash change */
    /* window.onhashchange = wrapHandler(hashHandler, dispatch);*/
    
    dispatch({ type: 'SET_IS_HYBRID', hybrid: Stargate.isHybrid() });
    if (getState().generic.initialized) {
      return Promise.resolve();
    }

    dispatch({ type: 'INIT_START', initConfig, initPending: true });

    return Stargate.initialize()
        .then(() => {
          dispatch({ type: 'SET_CONNECTION_STATE', connectionState: Stargate.checkConnection() });
          Stargate.addListener('connectionchange', (connState) => {
            dispatch({ type: 'SET_CONNECTION_STATE', connectionState: connState });
          });
        })
        .then(() => {
          const dictURL = [Location.getOrigin(), Constants.DICTIONARY_API_URL].join('');
          return dispatch(vhostActions.dictLoad(dictURL));
        })
        .then(() => dispatch(vhostActions.load(Constants.VHOST_API_URL, vhostKeys)))
        .then(() => dispatch(userActions.getUser()))
        .then(() => dispatch(gameinfoActions.getGameInfo()))
        .then(() => dispatch(sharerActions.initFacebook({ fbAppId: getState().game_info.fbAppId })))
        .then(() => {
          // return if you want to wait
          dispatch(newtonActions.init());
          return dispatch(newtonActions.login());
        })
        .then(() => {
          const menuStyle = {};
          if (getState().vhost.IMAGES_SPRITE_GAME && getState().vhost.IMAGES_SPRITE_GAME !== '') {
          //  menuStyle.backgroundImage = `url("${getState().vhost.IMAGES_SPRITE_GAME}")`;
          }

          dispatch(menuActions.showMenu(menuStyle));
          dispatch({
            type: 'INIT_FINISHED', message: 'FINISHED', initialized: true, initPending: false,
          });
          if (getState().generic.loadUserDataCalled) {
            return dispatch(userDataActions.loadUserData());
          }
        })
        .then(() => {
          if (getState().generic.session_start_after_init) {
            dispatch(sessionActions.startSession());
          }
        })
        .catch((reason) => {
          dispatch({
            type: 'INIT_ERROR', message: 'INIT_ERROR', initialized: false, initPending: false, error: reason,
          });
        });
  };
}

function redirectOnStore() {
  let mfpUrl = [Location.getOrigin(), '/#!/mfp'].join('');
  mfpUrl = Utils.queryfy(mfpUrl, {
    return_url: `${Location.getCurrentHref()}`,
    title: '',
  });

  /**
   * TODO:
   * fix with a 'GOOGLEPLAY_STORE_URL' took from the vhost
   */
  const packageID = 'com.docomodigital.gameasy.ww';
  mfpUrl = `https://app.appsflyer.com/${packageID}?pid=Webapp&c=/&af_sub1=<af_sub1>`;
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preprod') {
    window.location.href = mfpUrl;
  }
  return {
    type: 'REDIRECT_ON_STORE',
    payload: mfpUrl,
  };
}

function generateReportAction() {
  const reportCsv = Reporter.generateReport();
  return {
    type: 'GENERATE_REPORT',
    payload: reportCsv,
  };
}

function goToRelated(related) {
  setTimeout(() => {
    HistoryGame.push(`${window.location.origin}${window.location.pathname}`);
    window.location.href = related.url_play;
  }, 300);

  return {
    type: 'RELATED_CLICKED',
    payload: related
  };
}

export const Actions = {
  init,
  generateReportAction,
  redirectOnStore,
  goToRelated,
  ...sessionActions,
  ...userActions,
  ...menuActions,
  ...gameoverActions,
  ...userDataActions,
  ...gameinfoActions,
  ...bannerActions,
  ...sharerActions,
};
