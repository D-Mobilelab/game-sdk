import { AxiosInstance } from '../lib/AxiosService';
import Constants from '../lib/Constants';
import { hideMenu, showMenu } from './menu-actions';
import { increaseMatchPlayed } from './user-actions';
import { hideGameOver, showGameOver } from './gameover-actions';
import { getContentId, setRelated } from './gameinfo-actions';
import { showBanner } from './banner-actions';

let onStartCallback = () => {};

function doStartSession(){
    return (dispatch, getState)=>{
        if(getState().session.opened){
         /**
         * TODO:
         * startSession called before endSession
         * report an error in debug env
         */
         console.warn("Cannot start a new session before closing the current one. Session reset");    
        }
    
        let session = {
            opened: true,
            startTime: new Date(),
            endTime: undefined,
            score: undefined,
            level: undefined
        }
        dispatch({type: 'START_SESSION', session});
        onStartCallback();
        return Promise.resolve();
    }
}


export function registerOnStartCallback(callback){
    onStartCallback = callback;
    return { type:'REGISTER_ON_START_SESSION_CALLBACK', registered: true};
}

export function startSession(){
    return (dispatch, getState) => {
        // Not initialized but init called and pending
        if(!getState().generic.initialized && getState().generic.initPending){
            dispatch({type:'ADD_TO_AFTER_INIT', session_start_after_init: true});
        //Not initialized, not even called init
        } else if(!getState().generic.initialized && !getState().generic.initPending){
            /**
             * TODO:
             * Init not event called before startSession
             * report an error in debug env
             */
            console.log("You should call init before startSession!");
        } else if(getState().user.canPlay || getState().user.canDownload){
            dispatch(hideMenu());
            dispatch(hideGameOver());
            dispatch(doStartSession());
        } else {
            console.log('User cannot play');
        }
    }
}

export function setRank(rank){
    return {
        type:'SET_RANK',
        rank:rank
    }
}

export function setMissingGameInfoPart(gameInfo){
    return {
        type: 'ADD_MISSING_GAME_INFO',
        gameInfo: gameInfo
    }
}

export function endSession(scoreAndLevel = { score: 0, level: 0 }){
    return (dispatch, getState) => {
        //only if already initialized
        if(!getState().generic.initialized){
            /**
             * TODO:
             * endSession before init
             * report an error in debug env
             */
            console.log("Cannot end a session before initialized");
            return;
        }

        /**
         * TODO: and isAndroid()
         * should not be visible on iOS
         */
        let { user, generic } = getState();
        if((user.matchPlayed % 3 === 0) && !generic.hybrid){
            dispatch(showBanner());
        }

        // and a session was started
        if (Object.keys(getState().session).length > 0 
            && getState().session.opened){
            let endTime = new Date;
            let session = { score: scoreAndLevel.score, level: scoreAndLevel.level, endTime, opened: false };
            dispatch({ type: 'END_SESSION', session });
            dispatch(increaseMatchPlayed());
            dispatch(showMenu());

            let lastSession = getState().session;
            //Lite only leaderboard
            if(!getState().generic.initConfig.lite){
                dispatch(showGameOver());
            }
            let GAMEOVER_API = Constants.GAME_OVER_JSON_API_URL.replace(':CONTENT_ID', getContentId());                
            let gameOverPromise = AxiosInstance.get(GAMEOVER_API, 
                {params: {
                        score: lastSession.score, 
                        level: lastSession.level, 
                        duration: new Date(lastSession.endTime) - new Date(lastSession.startTime),
                        start: lastSession.startTime.getTime(),
                        label: getState().game_info.label,
                        userId: getState().user.user,
                        cors_compliant: 1
                    } 
                })
                .then((response)=>{
                    // get ranking?
                    // response.data.ranking
                    // response.data.gameInfo
                    dispatch(setMissingGameInfoPart(response.data.gameInfo));
                    dispatch(setRank(response.data.rank));
                    dispatch(setRelated(response.data.related || []));                        
                });
                return gameOverPromise;
        } else {
            /**
             * TODO:
             * endSession before startSession
             * report an error in debug env
             */
            console.log("No session started!");
        }
    }
}