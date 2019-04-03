import FacebookPixelAdapter from 'facebookpixeladapter';
import ReactGA from 'react-ga';
import * as Constants from '../lib/Constants';
import { isAndroid, isIOS, name } from '../lib/Platform';
import Reporter from '../lib/Reporter';
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
import * as advActions from './adv-actions';
import * as sharerActions from './sharer-actions';
import * as interstitialActions from './interstitial-actions';
import * as menulistActions from './menulist-actions';
import * as styleActions from './style-actions';

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

    dispatch({ type: 'PLATFORM_INFO', payload: { android: isAndroid(), ios: isIOS(), name: name() } });
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
        try {
          if (vhost.GOOGLE_ANALYTICS_ID_UNIVERSAL) {
            ReactGA.initialize(vhost.GOOGLE_ANALYTICS_ID_UNIVERSAL);
            ReactGA.set({ '&uid': user.user });
            dispatch({ type: 'INIT_GA', initializedGA: true });
          }
        } catch (e) {
          console.log('GA not initialized, reason:'+e);
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
        dispatch((getState().vhost.GFSDK_MENU_TYPE === 'extended') ? menulistActions.showMenuList() : menuActions.showMenu());
        dispatch({
          type: 'INIT_FINISHED', message: 'FINISHED', initialized: true, initPending: false,
        });

        return dispatch(userDataActions.loadUserData());
      })
      .then(() => {
        if (getState().generic.session_start_after_init) {
          console.log('session started after init');
          dispatch(sessionActions.startSession());
        }
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

export const Actions = {
  init,
  generateReportAction,
  ...sessionActions,
  ...userActions,
  ...user30Actions,
  ...menuActions,
  ...menulistActions,
  ...gameoverActions,
  ...userDataActions,
  ...gameinfoActions,
  ...advActions,
  ...sharerActions,
  ...styleActions,
};
