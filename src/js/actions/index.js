import FacebookPixelAdapter from 'facebookpixeladapter';
import * as Constants from '../lib/Constants';
import Reporter from '../lib/Reporter';
import * as HistoryGame from '../lib/HistoryGame';
import { getUserType } from './utils';
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

import focusAction from './focus-action';
import historyHandler from './history-actions';
import listenToWindowEvents from './listenToWindowEvents';

const vhostKeys = [
  'poggioacaiano',
];

// registering state change
function init(initConfig) {
  return (dispatch, getState) => {
    if (getState().generic.initialized) {
      return Promise.resolve();
    }

    dispatch(listenToWindowEvents('popstate', historyHandler));
    dispatch(listenToWindowEvents('focus', focusAction));
    dispatch(listenToWindowEvents('blur', focusAction));

    dispatch({ type: 'INIT_START', initConfig, initPending: true });

    return Promise.resolve()
      .then(() => dispatch(vhostActions.dictLoad(Constants.DICTIONARY_API_URL)))
      .then(() => dispatch(vhostActions.load(Constants.VHOST_API_URL, vhostKeys)))
      .then(() => dispatch(userActions.getUser()))
      .then(() => dispatch(gameinfoActions.getGameInfo()))
      .then(() => {
        // return if you want to wait
        dispatch(newtonActions.init());
        return dispatch(newtonActions.login());
      })
      .then(() => {
        const { vhost } = getState();
        if (vhost.FB_TRACKING_ENABLE) { FacebookPixelAdapter.init(vhost.FB_PIXELID); }
        dispatch(sharerActions.initFacebook({
          fbAppId: vhost.FB_APPID,
          enableTracking: vhost.FB_TRACKING_ENABLE,
        }));
      })
      .then(() => {
        const { user, vhost } = getState();
        const userType = getUserType(user);
        // User is not premium and ads enabled in configuration => show interstitial        
        const condition = [userType !== 'premium', (vhost.SHOW_INGAME_ADS && vhost.SHOW_INGAME_ADS == 1)].every(elem => elem);
        if (condition) {
          dispatch(interstitialActions.show());
        }
        return true;
      })
      .then(() => {
        dispatch(menuActions.showMenu());
        dispatch({
          type: 'INIT_FINISHED', message: 'FINISHED', initialized: true, initPending: false,
        });
        if (getState().generic.loadUserDataCalled) {
          return dispatch(userDataActions.loadUserData());
        }
        return Promise.resolve();
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
