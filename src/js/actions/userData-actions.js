import { AxiosInstance } from '../lib/AxiosService';
import { getContentId } from './gameinfo-actions';

let onUserDataCallback = () => {};
export function saveUserData(){
    return (dispatch, getState) => {
        if(getState().generic.initPending){

        }
    }
}

export function loadUserData(callback = onUserDataCallback){

    return (dispatch, getState) => {
        onUserDataCallback = callback;
        if(getState().generic.initPending && !getState().generic.initialized){
            // register this callback
            return {type:'REGISTER_ON_USER_DATA_CALLBACK', loadUserDataCalled: true}
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
            let userDataGetApi = getState().vhost.MOA_API_APPLICATION_OBJECTS_GET
                                .replace(':QUERY', JSON.stringify({ contentId: getContentId() }))
                                .replace(':ID', getState().user.userData._id || '')
                                .replace(':ACCESS_TOKEN', '')
                                .replace(':EXTERNAL_TOKEN', getState().user.user)
                                .replace(':COLLECTION', 'gameInfo');
            return AxiosInstance.get(userDataGetApi)
                                .then((response)=>{
                                    // write the reducer part
                                    // dispatch({ type: 'SET_USER_DATA', userData: userDataSynchronized });
                                    return onUserDataCallback(getState().user.userData.info);
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