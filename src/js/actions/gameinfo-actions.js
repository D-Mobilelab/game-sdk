import Constants from '../lib/Constants';
import Location from '../lib/Location';
import { AxiosInstance } from '../lib/AxiosService';

export function setRelated(related){
    return {
        type: 'SET_RELATED',
        related: related
    }
}

export function getGameInfo(){
    return (dispatch, getState) => {
        dispatch({type:'GAME_INFO_LOAD_START'});
        return AxiosInstance.get(Constants.GAME_INFO_API_URL, {
            params:{
                content_id: getContentId(), 
                cors_compliant: 1
            }
        }).then((response) => {            
            dispatch({type:'GAME_INFO_LOAD_END', game_info: response.data.game_info});
        }).catch((reason) => {
            dispatch({type:'GAME_INFO_LOAD_FAIL', error: reason});
        });
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