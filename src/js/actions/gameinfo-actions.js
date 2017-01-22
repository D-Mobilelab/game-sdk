import Constants from '../lib/Constants';
import Location from '../lib/Location';
import { AxiosInstance } from '../lib/AxiosService';
import Stargate from 'stargatejs';

export function setRelated(related){
    return {
        type: 'SET_RELATED',
        related: related
    }
}

export function getGameInfo(){
    return (dispatch, getState) => {
        dispatch({type:'GAME_INFO_LOAD_START'});
        let { generic } = getState()
        if(generic.connectionState.online) {
            return AxiosInstance.get(Constants.GAME_INFO_API_URL, {
                params:{
                    content_id: getContentId(), 
                    cors_compliant: 1
                }
                }).then((response) => {            
                    dispatch({type:'GAME_INFO_LOAD_END', game_info: response.data.game_info });
                    persist(response.data.game_info);
                }).catch((reason) => {
                    dispatch({type:'GAME_INFO_LOAD_FAIL', error: reason});
                });
        } else if (!generic.connectionState.online && generic.hybrid){
            let GAMEINFO_FILE_PATH = [Stargate.file.BASE_DIR, Constants.GAMEINFO_JSON_FILENAME].join('');
            return Stargate.file.readFileAsJSON(GAMEINFO_FILE_PATH)
                .then((gameInfos) => {
                    let gameInfo = gameInfos[getContentId()]
                    dispatch({type:'GAME_INFO_LOAD_END', game_info: gameInfo });
                }).catch((reason) => {
                    dispatch({type:'GAME_INFO_LOAD_FAIL', error: reason});
                });
        }

    }
}

function persist(gameInfo) {
    if (Stargate.isHybrid() && window.location.protocol === 'cdvfile:') {
        return Stargate.file.readFileAsJSON(Constants.GAMEINFO_FILE_PATH)
        .then((offlineData) => {
            offlineData.GamifiveInfo[getContentId()] = gameInfo;
            return offlineData;
        })
        .then((updated) => Stargate.file.write(GAMEINFO_FILE_PATH, JSON.stringify(updated)));
    }
}

export function getContentId(){
    let urlToMatch = Location.getCurrentHref();
    let contentIdRegex = new RegExp(Constants.CONTENT_ID_REGEX);
    let match = urlToMatch.match(contentIdRegex);

    if (match !== null && match.length > 0){
        return match[2];
    }
    throw new Error('Cannot get content id from url');
}