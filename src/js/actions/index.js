import FacebookPixelAdapter from 'facebookpixeladapter';
import ReactGA from 'react-ga';
import * as Constants from '../lib/Constants';
import { isAndroid, isIOS } from '../lib/Platform';
import Reporter from '../lib/Reporter';
import * as HistoryGame from '../lib/HistoryGame';
import { getUserType, getLabel, getMenuType } from './utils';
import * as sessionActions from './session-actions';
import * as userActions from './user-actions';
import * as user30Actions from './user30-actions';
import * as gameinfoActions from './gameinfo-actions';
import * as userDataActions from './userData-actions';
import * as menuActions from './menu-actions';
import * as gameoverActions from './gameover-actions';
import * as vhostActions from './vhost-actions';
import * as newtonActions from './newton-actions';
import * as bannerActions from './banner-actions';
import * as sharerActions from './sharer-actions';
import * as interstitialActions from './interstitial-actions';
import * as menulistActions from './menulist-actions';

import focusAction from './focus-action';
import historyHandler, { addSteps } from './history-actions';
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

    dispatch({ type: 'PLATFORM_INFO', payload: { android: isAndroid(), ios: isIOS() } });
    if (!process.env.LOCAL_DEV) {
      dispatch(listenToWindowEvents('focus', focusAction));
      dispatch(listenToWindowEvents('blur', focusAction));
    }

    dispatch({ type: 'SET_LABEL', label: getLabel() });

    dispatch({ type: 'INIT_START', initConfig, initPending: true });
    return Promise.all([
      dispatch(vhostActions.load(Constants.VHOST_API_URL, vhostKeys)),
      dispatch(vhostActions.dictLoad(Constants.DICTIONARY_API_URL)),
    ])
      .then(() => {
        const { vhost } = getState();
        if (typeof vhost.GFSDK_OVERRIDE_BACK === 'undefined' || vhost.GFSDK_OVERRIDE_BACK) {
          addSteps();
          dispatch(listenToWindowEvents('popstate', historyHandler));
        }
      })
      .then(() => {
        if (!getState().vhost.ENABLE_NEWTON_USER) {
          return dispatch(userActions.getUser()); // UO20
        }
      })
      .then(() => dispatch(gameinfoActions.getGameInfo()))
      .then(() => {
        // return if you want to wait
        dispatch(newtonActions.init());
        return dispatch(newtonActions.login());
      })
      .then(() => {
        if (getState().vhost.ENABLE_NEWTON_USER) {
          return dispatch(user30Actions.uo30GetUser()); // UO30
        }
      })
      .then(() => {
        const { user, vhost } = getState();
        if (vhost.FB_TRACKING_ENABLE) { FacebookPixelAdapter.init(vhost.FB_PIXELID); }
        dispatch(sharerActions.initFacebook({
          fbAppId: vhost.FB_APPID,
          enableTracking: vhost.FB_TRACKING_ENABLE,
        }));
        if (vhost.GOOGLE_ANALYTICS_ID_UNIVERSAL) {
          ReactGA.initialize(vhost.GOOGLE_ANALYTICS_ID_UNIVERSAL);
          ReactGA.set({ '&uid': user.user }); // uo30?
        }
      })
      .then(() => {
        const { user, vhost } = getState();

        const userType = getUserType(user);
        console.log('user: '+userType);
        // User is not premium and ads enabled in configuration => show interstitial
        const condition = [userType !== 'premium', (vhost.SHOW_INGAME_ADS && vhost.SHOW_INGAME_ADS == 1)].every(elem => elem);
        if (condition) {
          dispatch(interstitialActions.show());
        }
        return true;
      })
      .then(() => {
        dispatch((getMenuType() === 'extended') ? menulistActions.showMenuList() : menuActions.showMenu());
        dispatch({
          type: 'INIT_FINISHED', message: 'FINISHED', initialized: true, initPending: false,
        });

        // if (getState().generic.loadUserDataCalled) {
          return dispatch(userDataActions.loadUserData());
        // }
        return Promise.resolve();
      })
      .then(() => {
        if (getState().generic.session_start_after_init) {
          console.log('session started after init');
          dispatch(sessionActions.startSession());
        }
      })
      .catch((reason) => {
        if (window.Raven && window.Raven.isSetup()) {
          window.Raven.captureException(reason);
        }
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
  ...user30Actions,
  ...menuActions,
  ...menulistActions,
  ...gameoverActions,
  ...userDataActions,
  ...gameinfoActions,
  ...bannerActions,
  ...sharerActions,
};
