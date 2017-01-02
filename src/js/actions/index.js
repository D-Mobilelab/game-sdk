import Location from '../lib/Location';
import Constants from '../lib/Constants';
import Stargate from 'stargatejs';
import { AxiosInstance } from '../lib/AxiosService';

import * as sessionActions from './session-actions';
import * as userActions from './user-actions';
import * as gameinfoActions from './gameinfo-actions';
import * as userDataActions from './userData-actions';
import * as menuActions from './menu-actions';
import * as gameoverActions from './gameover-actions';
import * as vhostActions from './vhost-actions';
import * as newtonActions from './newton-actions';
import * as bannerActions from './banner-actions';

let vhostKeys = [
    "CONTENT_RANKING",
    //"GAMEOVER_LIKE_CLASS_TO_TOGGLE",
    //"GAMEOVER_LIKE_SELECTOR",
    "IMAGES_SPRITE_GAME",
    "MOA_API_APPLICATION_OBJECTS_GET",
    "MOA_API_APPLICATION_OBJECTS_SET",
    //"MOA_API_USER_CHECK",
    "NEWTON_SECRETID",
    "TLD",
    "NT_REAL_COUNTRY"
];

function init(initConfig){
    return (dispatch, getState) => {
        
        dispatch({type: 'SET_IS_HYBRID', hybrid: Stargate.isHybrid() });
        if(getState().generic.initialized){
            return Promise.resolve();
        }

        dispatch({ type: 'INIT_START', initConfig: initConfig, initPending: true });

        return Stargate.initialize()
        .then(() => {
            dispatch({ type: 'SET_CONNECTION_STATE', connectionState: Stargate.checkConnection()});
            Stargate.addListener('connectionchange', (connState) => {
                dispatch({ type: 'SET_CONNECTION_STATE', connectionState: connState });
            });
        })
        .then(() => dispatch(vhostActions.load(Constants.VHOST_API_URL, vhostKeys)))
        .then(() => dispatch(userActions.getUser()))
        .then(() => dispatch(gameinfoActions.getGameInfo()))
        .then(() =>{
            // return if you want to wait
            dispatch(newtonActions.init());
        })
        .then(() => {
            
            let menuStyle = {};
            if(getState().vhost.IMAGES_SPRITE_GAME && getState().vhost.IMAGES_SPRITE_GAME !== ''){
                menuStyle.backgroundImage = `url("${getState().vhost.IMAGES_SPRITE_GAME}")`;
            }

            dispatch(menuActions.showMenu(menuStyle));

            if(getState().generic.loadUserDataCalled){
                return dispatch(userDataActions.loadUserData());
            }
        }).then(() => {
            if(getState().generic.session_start_after_init){
               dispatch(sessionActions.startSession());
            }

            dispatch({
                type: 'INIT_FINISHED', message: 'FINISHED', initialized: true, initPending: false
            });
        }).catch((reason)=>{
            dispatch({
                type: 'INIT_ERROR', message: 'INIT_ERROR', initialized: false, initPending: false, error: reason
            });
        });
    }   
}

export let Actions = {    
    init,
    ...sessionActions,
    ...userActions,
    ...menuActions,
    ...gameoverActions,
    ...userDataActions,
    ...gameinfoActions,
    ...bannerActions
}