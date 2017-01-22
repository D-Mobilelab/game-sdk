import { Utils } from 'stargatejs';
import Location from '../lib/Location';
import { AxiosInstance } from '../lib/AxiosService';
import { storage } from '../lib/Storage';
import { getContentId } from './gameinfo-actions';
import { getUserType } from './user-actions';

/**
 * LOAD_USER_DATA_SERVER_START
 * LOAD_USER_DATA_SERVER_END
 * LOAD_USER_DATA_SERVER_ERROR
 *
 * SAVE_USER_DATA_SERVER_START
 * SAVE_USER_DATA_SERVER_END
 * SAVE_USER_DATA_SERVER_ERROR
 *
 * LOAD_USER_DATA_LOCAL_START
 * LOAD_USER_DATA_LOCAL_END
 * LOAD_USER_DATA_LOCAL_ERROR
 *
 * SAVE_USER_DATA_LOCAL_START
 * SAVE_USER_DATA_LOCAL_END
 * SAVE_USER_DATA_LOCAL_ERROR
 */

let onUserDataCallback = () => {};
export function saveUserData(newInfo) {
  return (dispatch, getState) => {
    if (getState().generic.initPending) {

    } else if (getState().generic.initialized) {
      const { user } = getState();
      if (typeof newInfo === 'string') {
        console.warn('GamifiveSDK: the data to be saved should be an object! got a:', typeof newInfo);
        try {
          console.warn('GamifiveSDK: try to parse the string');
          newInfo = JSON.parse(newInfo);
        } catch (e) {
          console.error('GamifiveSDK: could not save the data: not even json parseable', newInfo);
          newInfo = null;
        }
        return Promise.resolve();
      }
          /**
           * ONLY
           * FOR PREMIUM USER
           */
      dispatch({ type: 'SAVE_USER_DATA_LOCAL_START' });
      if (getUserType(user) === 'guest') {
        const message = 'User type guest cannot save their data';
        console.warn('GamifiveSDK: User not logged cannot save userData', message);
        dispatch({ type: 'SAVE_USER_DATA_LOCAL_END', payload: { message, info: newInfo, UpdatedAt: new Date().toISOString() } });
        return Promise.resolve();
      }

      return Promise.all([
        dispatch(setUserDataOnServer(newInfo)),
        dispatch(setUserDataOnLocal(newInfo)),
      ])
      .catch((reason) => {
        dispatch({ type: 'SAVE_USER_DATA_ERROR', payload: reason });
      });
    }
  };
}

export function loadUserData(callback = onUserDataCallback) {
  return (dispatch, getState) => {
    onUserDataCallback = callback;
    if (getState().generic.initPending && !getState().generic.initialized) {
            // register this callback
      return dispatch({ type: 'REGISTER_ON_USER_DATA_CALLBACK', loadUserDataCalled: true });
    } else if (getState().generic.initialized) {
      return Promise.all([
        dispatch(getUserDataFromServer()),
        dispatch(getUserDataFromLocal()),
      ]).then(() => {
        const { user } = getState();
        const finalUserData = syncUserData([
          user.localUserData,
          user.remoteUserData,
        ]);
        dispatch({ type: 'LOAD_USER_DATA_END', payload: finalUserData });
        return onUserDataCallback(getState().user.userData.info);
      });
    }
  };
}

function getUserDataFromServer() {
  return (dispatch, getState) => {
    const { vhost, user } = getState();
    if (!vhost.MOA_API_APPLICATION_OBJECTS_GET) {
      onUserDataCallback(user.userData.info);
      return Promise.resolve(user.userData);
    }

    const NewtonInstance = Newton.getSharedInstance();
    const userDataGetApi = vhost.MOA_API_APPLICATION_OBJECTS_GET
                            .replace(':QUERY', JSON.stringify({ contentId: getContentId() }))
                            .replace(':ID', user.userData._id || '')
                            .replace(':ACCESS_TOKEN', NewtonInstance.getUserToken())
                            .replace(':EXTERNAL_TOKEN', user.user) // userId
                            .replace(':COLLECTION', 'gameInfo');

    dispatch({ type: 'LOAD_USER_DATA_SERVER_START' });
    return AxiosInstance.get(userDataGetApi)
          .then((response) => {
            const { data } = response;
            const realResponseData = data.response.data;
            let payload = null;
            if (realResponseData &&
                Array.isArray(realResponseData) &&
                realResponseData.length > 0) {
              payload = realResponseData[0]; // userData
              payload.info = JSON.parse(payload.info);
            }
            dispatch({ type: 'LOAD_USER_DATA_SERVER_END', payload });
          })
          .catch((reason) => {
            dispatch({ type: 'LOAD_USER_DATA_SERVER_ERROR', payload: reason });
            return reason;
          });
  };
}

function setUserDataOnServer(newInfo) {
  return (dispatch, getState) => {
        // SAVE_USER_DATA
    const Logger = window.console;
    const { vhost, game_info, user } = getState();
    const userDataSetApi = vhost.MOA_API_APPLICATION_OBJECTS_SET;

    if (!userDataSetApi) {
      Logger.log('GamifiveSDK', 'Api endpoint is disabled in vhost', userDataSetApi);
      return Promise.resolve();
    }

    if (!user.userData._id || user.userData._id === '') {
      Logger.warn('GamifiveSDK', 'You must call loadUserData first!');
      return Promise.resolve();
    }

    let infoSerialized;
    if (typeof newInfo === 'object' || newInfo === null) {
      infoSerialized = JSON.stringify(newInfo);
    }

    const APPLICATION_OBJECT_SET_END_POINT = vhost.MOA_API_APPLICATION_OBJECTS_SET.split('?')[0];
    const queryObject = Utils.dequeryfy(vhost.MOA_API_APPLICATION_OBJECTS_SET);

        /**
         * TODO: call NewtonInstance.syncUserState
         * to ensure the user server side it's in sync with the local one
         */
    const NewtonInstance = Newton.getSharedInstance();
    const body = {
      access_token: NewtonInstance.getUserToken(),
      external_token: user.user,
      id: user.userData._id || '',
      info: infoSerialized,
      domain: Location.getOrigin(),
      contentId: game_info.contentId || game_info.id,
      collection: 'gameInfo',
    };

    const newBody = { ...queryObject, ...body };

    const config = {
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
      transformRequest: [(data) => {
        const str = Utils.queryfy('', data).replace('?', '');
        return str;
      }],
    };

    dispatch({ type: 'SAVE_USER_DATA_SERVER_START' });
    return AxiosInstance.post(APPLICATION_OBJECT_SET_END_POINT, newBody, config)
            .then((response) => {
              const { data } = response;
              if (data.response.data) {
                data.response.data.info = newInfo;
                dispatch({ type: 'SAVE_USER_DATA_SERVER_END', payload: data.response.data });
              } else {
                console.warn('GamifiveSDK', 'NEWTON', 'userData FAIL to be set on server', data.response);
                dispatch({ type: 'SAVE_USER_DATA_SERVER_ERROR', payload: data.response });
              }
            }).catch((reason) => {
              console.warn('GamifiveSDK', 'PHP', 'userData FAIL to be set on server', reason);
              dispatch({ type: 'SAVE_USER_DATA_SERVER_ERROR', payload: reason });
            });
  };
}

function setUserDataOnLocal(newInfo) {
  return (dispatch, getState) => {
    const { user, game_info } = getState();

    const game_id = game_info.contentId || game_info.id;
    const key = `${user.user}-${game_id}`;
    const newUserData = { ...user.userData, info: newInfo, UpdatedAt: new Date().toISOString() };

    return storage.setItem(key, newUserData).then((result) => {
      dispatch({ type: 'SAVE_USER_DATA_LOCAL_END', payload: newUserData });
    }).catch((reason) => {
      dispatch({ type: 'SAVE_USER_DATA_LOCAL_ERROR', payload: reason });
    });
  };
}

function getUserDataFromLocal() {
  return (dispatch, getState) => {
    const { user, game_info } = getState();
    if (getUserType(user) === 'guest') {
      dispatch({ type: 'LOAD_USER_DATA_LOCAL_END', payload: 'User type guest cannot load their data' });
      return;
    }

    dispatch({ type: 'LOAD_USER_DATA_LOCAL_START' });
    const game_id = game_info.contentId || game_info.id;
    const key = `${user.user}-${game_id}`;
    return storage.getItem(key)
          .then((localUserData) => {
            dispatch({ type: 'LOAD_USER_DATA_LOCAL_END', payload: localUserData });
          })
          .catch((reason) => {
            dispatch({ type: 'LOAD_USER_DATA_LOCAL_ERROR', payload: reason });
          });
  };
}

/**
 * Synchronize the local and server gameInfo object
 * @param {Array} results - the local and the server gameinfo object
 * @returns {Object} return the most updated gameInfo object
 */
function syncUserData(results) {
  const Logger = window.console;

  const [localGameInfo, serverGameInfo] = results;
  Logger.info('GamifiveSDK: sync userData', localGameInfo, serverGameInfo);
  if (localGameInfo && serverGameInfo) {
    let localUpdatedAt = new Date(localGameInfo.UpdatedAt);
    let serverUpdatedAt = new Date(serverGameInfo.UpdatedAt);
        // seconds and ms to
    localUpdatedAt = new Date(localUpdatedAt.setSeconds(-1, 1000));
    serverUpdatedAt = new Date(serverUpdatedAt.setSeconds(-1, 1000));

    /**
     * This is the unique _id that in newton stands for userid-gameid object
     * and should always be added to the request otherwise php try to set on newton with a POST and not
     * with a PATCH resulting in a newton error 'Duplicate key error'
     */
    localGameInfo._id = serverGameInfo._id;

        // local is more relevant
    if (localUpdatedAt.getTime() > serverUpdatedAt.getTime()) {
      Logger.info('GamifiveSDK: sync userData', 'local > server', localUpdatedAt, serverUpdatedAt);
      return localGameInfo;
    } else if (localUpdatedAt.getTime() < serverUpdatedAt.getTime()) {
       // server is more relevant
      Logger.info('GamifiveSDK: sync userData', 'local < server', localUpdatedAt, serverUpdatedAt);
      return serverGameInfo;
    } else if (localUpdatedAt.getTime() === serverUpdatedAt.getTime()) {
      Logger.info('GamifiveSDK: sync userData', 'local === server', localUpdatedAt, serverUpdatedAt);
      return localGameInfo;
    }
  } else if (localGameInfo && !serverGameInfo) {
    Logger.info('GamifiveSDK: sync userData', 'local won', 'no server');
    return localGameInfo;
  } else if (!localGameInfo && serverGameInfo) {
    Logger.info('GamifiveSDK: sync userData', 'server won', 'no local');
    return serverGameInfo;
  }
}
