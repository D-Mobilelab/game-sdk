import axios from 'axios';
import Location from '../lib/Location';
import Constants from '../lib/Constants';

let AxiosInstance = axios.create({
  baseURL: 'http://www2.gameasy.com' // replace with Location.getOrigin()
});

let vhostKeys = [
    "CONTENT_RANKING",
    "GAMEOVER_LIKE_CLASS_TO_TOGGLE",
    "GAMEOVER_LIKE_SELECTOR",
    "IMAGES_SPRITE_GAME",
    "MOA_API_APPLICATION_OBJECTS_GET",
    "MOA_API_APPLICATION_OBJECTS_SET",
    "MOA_API_USER_CHECK",
    "NEWTON_SECRETID"
]

export function init(initConfig){
    return (dispatch, getState) => {
        dispatch({
            type: 'INIT_START', initConfig: initConfig
        });

        dispatch({ type: 'VHOST_LOAD_START' });
        return AxiosInstance.get(Constants.VHOST_API_URL, {
            params:{
                keys: vhostKeys.join(',')
            }
        }).then((response)=>{
            dispatch({type: 'VHOST_LOAD_END', vhost: response.data});
            return dispatch(getUser());
        }).then(()=>{
            dispatch({
                type: 'INIT_FINISHED', message: 'FINISHED', initialized: true
            });
        });
    }
   
}

export function getUser(){
    return (dispatch, getState) =>{
        dispatch({type: 'USER_CHECK_LOAD_START'});
        return AxiosInstance.get(Constants.USER_CHECK)
                .then((userResponse)=>{
                    dispatch({type: 'USER_CHECK_LOAD_END', user: userResponse.data});
                    dispatch({type: 'GET_FAVOURITES_START'}); 
                    if (getState().user.logged){                        
                        return Axios.get(Constants.USER_GET_LIKE, {
                            params:{
                                user_id: getState().user.user,
                                size:51
                            }
                        })
                    } else {
                        return {data:[]};
                    }
                })
                .then((userFavouritesResponse)=>{
                    dispatch({type: 'GET_FAVOURITES_END', favourites: userFavouritesResponse.data});
                })
                .catch((reason)=>{
                    dispatch({type: 'USER_CHECK_LOAD_FAIL', reason: reason});
                });
    }
    
}

let onStartCallback = function(){};
export function startSession(){
    return function thunk(dispatch, getState){
        if(getState().initialized){
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
                console.log("Cannot start a new session before closing the current.");    
            }
        } else {
            console.log("Cannot start a session before init: not initialized");
        }                
    }
}

export function endSession(scoreAndLevel){
    return function thunk(dispatch, getState){
        if (Object.keys(getState().currentSession).length > 0 && getState().currentSession.opened){
            let endTime = new Date;
            let session = { score: scoreAndLevel.score, level: scoreAndLevel.level, endTime, opened: false }
            dispatch({ type: 'END_SESSION', session });
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

export function registerOnStartCallback(callback){
    onStartCallback = callback;
    return { type:'REGISTER_ON_START_SESSION_CALLBACK', registered: true};
}