import Stargate from 'stargatejs';
import Location from '../lib/Location';
import Constants from '../lib/Constants';
import { generateReport } from '../lib/Reporter';

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

function init(initConfig) {
  return (dispatch, getState) => {
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
  let mfp_url = [Location.getOrigin(), '/#!/mfp'].join('');
  mfp_url = Utils.queryfy(mfp_url, {
    returnurl: `${Location.getCurrentHref()}`,
    title: '',
  });

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preprod') {
    setTimeout(() => {
      window.location.href = mfp_url;
    }, 500);
  }

  return {
    type: 'REDIRECT_ON_STORE',
    payload: mfp_url,
  };
}

function generateReportAction() {
  const reportCsv = generateReport();
  return {
    type: 'GENERATE_REPORT',
    payload: reportCsv,
  };
}


export const Actions = {
  init,
  generateReportAction,
  redirectOnStore,
  ...sessionActions,
  ...userActions,
  ...menuActions,
  ...gameoverActions,
  ...userDataActions,
  ...gameinfoActions,
  ...bannerActions,
  ...sharerActions,

};
