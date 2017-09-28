import FacebookPixelAdapter from 'facebookpixeladapter';
import * as Constants from '../lib/Constants';
import Reporter from '../lib/Reporter';
import * as HistoryGame from '../lib/HistoryGame';

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
import * as interstitialActions from './interstitial-actions';

const vhostKeys = [
  'poggioacaiano',
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
  if (state && state.location === 'step1') {
    /* *
     * This means the user have clicked back and
     * coming from a related game
     * */
    dispatch({ type: 'BACK_CLICKED' });

    const lastHistoryGame = HistoryGame.pop();
    if (lastHistoryGame) {
      window.location.replace(lastHistoryGame);
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

const addressBar = `${window.location.pathname}${window.location.search}`;
window.history.replaceState({ location: 'step0' }, document.title, `${addressBar}#0`);
window.history.pushState({ location: 'step1' }, document.title, `${addressBar}#1`);
window.history.pushState({ location: 'step2' }, document.title, `${addressBar}#2`);

/** registering state change */
function init(initConfig) {
  return (dispatch, getState) => {
    window.addEventListener('popstate', wrapHandler(historyHandler, dispatch));
    /** registering hash change */
    /* window.onhashchange = wrapHandler(hashHandler, dispatch);*/

    // dispatch({ type: 'SET_IS_HYBRID', hybrid: Stargate.isHybrid() });
    if (getState().generic.initialized) {
      return Promise.resolve();
    }

    dispatch({ type: 'INIT_START', initConfig, initPending: true });

    return Promise.resolve()
      .then(() => dispatch(vhostActions.dictLoad(Constants.DICTIONARY_API_URL)))
      .then(() => dispatch(vhostActions.load(Constants.VHOST_API_URL, vhostKeys)))
      .then(() => {
        const { vhost } = getState();
        FacebookPixelAdapter.init(vhost.FACEBOOK_PIXEL_ID);
      })
      .then(() => dispatch(userActions.getUser()))
      .then(() => {
        const { user } = getState();
        const { vhost } = getState();
        const userType = userActions.getUserType(user);
        /** User is not premium and ads enabled in configuration => show interstitial */
        const condition = [userType !== 'premium', (vhost.SHOW_INGAME_ADS && vhost.SHOW_INGAME_ADS == 1)].every(elem => elem);        
        if (condition) { dispatch(interstitialActions.show()); }
        return true;
      })
      .then(() => dispatch(gameinfoActions.getGameInfo()))
      .then(() => dispatch(sharerActions.initFacebook({ fbAppId: getState().vhost.FB_APPID })))
      .then(() => {
        // return if you want to wait
        dispatch(newtonActions.init());
        return dispatch(newtonActions.login());
      })
      .then(() => {
        const menuStyle = {};
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
          type: 'INIT_ERROR', message: 'INIT_ERROR', initialized: false, initPending: false, reason: reason.toString(),
        });
      });
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
    if (related.format && related.format !== 'androidapplications') {
      HistoryGame.push(`${window.location.origin}${window.location.pathname}`);
    }
    window.location.replace(related.url_play);
  }, 100);

  return {
    type: 'RELATED_CLICKED',
    payload: related,
  };
}

export const Actions = {
  init,
  generateReportAction,
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
