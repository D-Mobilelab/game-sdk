import Location from '../lib/Location';
import { AxiosInstance } from '../lib/AxiosService';
import { getContentId } from './gameinfo-actions';
import { Utils } from 'stargatejs';

let onUserDataCallback = () => {};
export function saveUserData(newUserData){
    return (dispatch, getState) => {
        if(getState().generic.initPending){

        } else if (getState().generic.initialized){
            // SAVE_USER_DATA
            let { vhost, game_info, user } = getState();
            let userDataSetApi = vhost.MOA_API_APPLICATION_OBJECTS_SET;

            if (!userDataSetApi){
                // return
            }

            let APPLICATION_OBJECT_SET_END_POINT = vhost.MOA_API_APPLICATION_OBJECTS_SET.split('?')[0];
            let queryObject = Utils.dequeryfy(vhost.MOA_API_APPLICATION_OBJECTS_SET);
            let body = {
                access_token: '',
                external_token: user.user,
                id: user.userData._id || '',
                info: JSON.stringify(newUserData),
                domain: Location.getOrigin(), 
                contentId: game_info.id,
                collection: 'gameInfo'
            }

            let newBody = {...queryObject, ...body};
            dispatch({ type: 'SAVE_USER_DATA_START' });
            return AxiosInstance.post(APPLICATION_OBJECT_SET_END_POINT, {params: newBody})
            .then((response) => {
                dispatch({ type: 'SAVE_USER_DATA_END', payload: response.data });
            }).catch((reason) => {
                dispatch({ type: 'SAVE_USER_DATA_ERROR', payload: reason });
            });
        }
    }
}

export function loadUserData(callback = onUserDataCallback){

    return (dispatch, getState) => {
        onUserDataCallback = callback;
        if(getState().generic.initPending && !getState().generic.initialized){
            // register this callback
            return dispatch({type:'REGISTER_ON_USER_DATA_CALLBACK', loadUserDataCalled: true});
        } else if(getState().generic.initialized) {
            /*            
            return Promise.all([
                getUserDataFromLocal(), 
                getUserDataFromServer()
            ]).then(syncUserData)
              .then((userDataSynchronized) =>{
                  dispatch({type: 'SET_USER_DATA', userData: userDataSynchronized});
                  return onUserDataCallback(getState().user.userData.info);                                    
              });
            */
            let { vhost, user } = getState();
            if(!vhost.MOA_API_APPLICATION_OBJECTS_GET) { 
                onUserDataCallback(user.userData.info);
                return Promise.resolve(user.userData.info);
            }

            let userDataGetApi = vhost.MOA_API_APPLICATION_OBJECTS_GET
                                .replace(':QUERY', JSON.stringify({ contentId: getContentId() }))
                                .replace(':ID', user.userData._id || '')
                                .replace(':ACCESS_TOKEN', '')
                                .replace(':EXTERNAL_TOKEN', user.user) //userId
                                .replace(':COLLECTION', 'gameInfo');
                                
            dispatch({ type: 'LOAD_USER_DATA_START'});
            return AxiosInstance.get(userDataGetApi)
                                .then((response)=>{
                                    // write the reducer part
                                    dispatch({ type: 'LOAD_USER_DATA_END', userData: response.data });
                                    return onUserDataCallback(getState().user.userData.info);
                                }).catch((reason) => {
                                    dispatch({ type: 'LOAD_USER_DATA_ERROR', payload: reason });
                                });
        } else {

        }
    }
}

function getUserDataFromServer(){

}

function getUserDataFromLocal(){

}

function setUserDataOnServer(){

}

function setUserDataOnLocal(){

}

function syncUserData(gameInfos){

}