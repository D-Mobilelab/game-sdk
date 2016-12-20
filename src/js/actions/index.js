import axios from 'axios';
import Location from '../lib/Location';
import Constants from '../lib/Constants';
import Stargate from 'stargatejs';
import NewtonAdapter from 'newton-adapter';

let AxiosInstance = axios.create({
  baseURL: window.location.origin
});

let onStartCallback = () => {};
let onUserDataCallback = () => {};

let vhostKeys = [
    "CONTENT_RANKING",
    //"GAMEOVER_LIKE_CLASS_TO_TOGGLE",
    //"GAMEOVER_LIKE_SELECTOR",
    "IMAGES_SPRITE_GAME",
    "MOA_API_APPLICATION_OBJECTS_GET",
    "MOA_API_APPLICATION_OBJECTS_SET",
    //"MOA_API_USER_CHECK",
    "NEWTON_SECRETID"
];
export function init(initConfig){
    return (dispatch, getState) => {
        if(getState().initialized){
            return Promise.resolve();
        }

        dispatch({
            type: 'INIT_START', initConfig: initConfig, initPending: true
        });

        dispatch({ type: 'VHOST_LOAD_START' });
        return AxiosInstance.get(Constants.VHOST_API_URL, {
            params:{ keys: vhostKeys.join(',') }
        })
        .then((response)=>{
            dispatch({type: 'VHOST_LOAD_END', vhost: response.data});
            return dispatch(getUser());
        })
        .then(()=>{
            return dispatch(getGameInfo());
        })
        .then(()=>{
            dispatch({
                type: 'INIT_FINISHED', message: 'FINISHED', initialized: true, initPending: false
            });
            let menuStyle = {};
            menuStyle.backgroundImage = `url("${getState().vhost.IMAGES_SPRITE_GAME}")`;
            dispatch(showMenu(menuStyle));
            /**
             * Same here with loadUserData
             * if(getState().loadUserDataCalled){
             *      dispatch(getUserData());
             * }
             */
            if(getState().session_start_after_init){
                return dispatch(doStartSession());
            }
        }).catch((reason)=>{
            dispatch({
                type: 'INIT_ERROR', message: 'INIT_ERROR', initialized: false, initPending: false, error: reason
            });
        });
    }   
}

export function getUserFavourites(){
    return (dispatch, getState)=>{
        let getFavPromise;
        dispatch({ type: 'GET_FAVOURITES_START' }); 
        if (getState().user.logged){                        
            getFavPromise = AxiosInstance.get(Constants.USER_GET_LIKE, {
                params:{
                    user_id: getState().user.user, //userID
                    size: 51
                }
            });
        } else {
            getFavPromise = Promise.resolve({data:[]});
        }

        return getFavPromise.then((userFavouritesResponse)=>{
            dispatch({type: 'GET_FAVOURITES_END', favourites: userFavouritesResponse.data});
        }).catch((reason)=>{
            dispatch({type: 'GET_FAVOURITES_FAIL'});
        });
    }
}

export function getUser(){
    return (dispatch, getState) =>{
        dispatch({ type: 'USER_CHECK_LOAD_START' });
        return AxiosInstance.get(Constants.USER_CHECK)
                .then((userResponse) => {
                    dispatch({type: 'USER_CHECK_LOAD_END', user: userResponse.data});
                    return Promise.all([
                        dispatch(canPlay()),
                        dispatch(getUserFavourites())
                    ]);
                })                
                .catch((reason)=>{
                    dispatch({type: 'USER_CHECK_LOAD_FAIL', reason: reason});
                });
    }
    
}

export function startSession(){
    return (dispatch, getState) => {
        // no initialized but init called
        if(!getState().initialized && getState().initPending){
            dispatch({type:'ADD_TO_AFTER_INIT', session_start_after_init: true});
        } else if(!getState().initialized && !getState().initPending){
            // no initialized and init not even called
            console.log("You should call init before startSession!");
        } else {
            dispatch(hideMenu());
            dispatch(hideGameOver());
            dispatch(doStartSession());
        }
    }
}


function doStartSession(){
    return (dispatch, getState)=>{
        if(!getState().currentSession.opened){
            let currentSession = {
                opened: true,
                startTime: new Date(),
                endTime: undefined,
                score: undefined,
                level: undefined
            }
            dispatch({type: 'START_SESSION', currentSession});
            onStartCallback();
        } else {
            console.log("Cannot start a new session before closing the current one.");    
        }
        return Promise.resolve();
    }
}

export function canPlay(){
    return (dispatch, getState)=>{
        let url = Constants.CAN_DOWNLOAD_API_URL.replace(":ID", getContentId());
        return AxiosInstance.get(url, {
            params:{ cors_compliant:1 }
            }).then((response)=>{
                dispatch({type:'SET_CAN_PLAY', canPlay: response.data.canDownload});
            });        
    }
}


export function endSession(scoreAndLevel={score:0,level:0}){
    return (dispatch, getState) => {
        //only if already initialized
        if(!getState().initialized){
            console.log("Cannot end a session before initialized");
            return;
        }
        // and a session was started
        if (Object.keys(getState().currentSession).length > 0 
            && getState().currentSession.opened){
            let endTime = new Date;
            let session = { score: scoreAndLevel.score, level: scoreAndLevel.level, endTime, opened: false };
            dispatch({ type: 'END_SESSION', session });
            
            dispatch(showMenu());

            let lastSession = getState().currentSession;
            //Lite only leaderboard
            if(!getState().initConfig.lite){
                dispatch(showGameOver());
            }
            let GAMEOVER_API = Constants.GAME_OVER_JSON_API_URL.replace(':CONTENT_ID', getContentId());                
            let gameOverPromise = AxiosInstance.get(GAMEOVER_API, 
                {params: {
                        score: lastSession.score, 
                        level: lastSession.level, 
                        duration: new Date(lastSession.endTime) - new Date(lastSession.startTime),
                        start: lastSession.startTime.getTime(),
                        label: getState().gameInfo.label,
                        userId: getState().user.user,
                        cors_compliant: 1
                    } 
                })
                .then((response)=>{
                    // get ranking?
                    // response.data.ranking
                    dispatch(setRelated(response.data.related || []));                        
                });
                return gameOverPromise;
        } else {
            console.log("No session started!");
        }
    }    
}

export function setIsHybrid(){
    /*return {
        type: 'SET_IS_HYBRID',
        hybrid: Stargate.isHybrid()
    }*/
}

export function showGameOver(){
    return {
        type:'SHOW_GAME_OVER'
    }
}

export function hideGameOver(){
    return {
        type:'HIDE_GAME_OVER'
    }
}

function getContentId(){
    var urlToMatch = Location.getCurrentHref();
    var contentIdRegex = new RegExp(Constants.CONTENT_ID_REGEX);
    var match = urlToMatch.match(contentIdRegex);

    if (match !== null && match.length > 0){
        return match[2];
    }
    throw new Error('Cannot get content id from url');
}

export function getGameInfo(){
    return (dispatch, getState) => {
        dispatch({type:'GAME_INFO_LOAD_START'});
        return AxiosInstance.get(Constants.GAME_INFO_API_URL, {
            params:{
                content_id: getContentId(), 
                cors_compliant: 1
            }
        }).then((response)=>{            
            dispatch({type:'GAME_INFO_LOAD_END', gameInfo: response.data.game_info});
        }).catch((reason)=>{
            dispatch({type:'GAME_INFO_LOAD_FAIL', error: reason});
        });
    }
}

export function goToHome(){
    return {
        type:'GO_TO_HOME'
    }
}

export function showMenu(style){
    return {
        type: 'MENU_SHOW',
        style: style
    }
}

export function hideMenu(){
    return {
        type: 'MENU_HIDE'
    }
}

export function registerOnStartCallback(callback){
    onStartCallback = callback;
    return { type:'REGISTER_ON_START_SESSION_CALLBACK', registered: true};
}

export function loadUserData(callback){

    return (dispatch, getState) => {
        onUserDataCallback = callback;        
        if(getState().initPending && !getState().initialized){
            // register this callback
            return {type:'REGISTER_ON_USER_DATA_CALLBACK', loadUserDataCalled: true}
        } else if(getState().initialized && getState().user.logged) {
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
                                .replace(':ID', getState().user.userData._id)
                                .replace(':ACCESS_TOKEN', '')
                                .replace(':EXTERNAL_TOKEN', getState().user.user)
                                .replace(':COLLECTION', 'gameInfo');
            return AxiosInstance.get(userDataGetApi)
                        .then((response)=>{
                            // write the reducer part
                            dispatch({type: 'SET_USER_DATA', userData: userDataSynchronized});
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

export function saveUserData(){
    return (dispatch, getState) => {
        if(getState().initPending){

        }
    }
}

export function setRelated(related){
    return {
        type: 'SET_RELATED',
        related: related
    }
}