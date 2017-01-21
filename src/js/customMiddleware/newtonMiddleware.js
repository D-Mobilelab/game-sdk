import NewtonAdapter from 'newton-adapter';
import Location from '../lib/Location';
import { getUserType } from '../actions/user-actions';

export const newtonMiddleware = (store) => (next) => (action) => {
    const currentState = store.getState();
    let qs = Location.getQueryString();
    let userFrom = ( qs['dest'] || qs['trackExecutionKey'] ) ? 'acquisition' : 'natural';
    let userType = getUserType(currentState.user);
    const { CONTENT_RANKING } = currentState.vhost;

    switch (action.type) {
        case 'INIT_FINISHED':
            NewtonAdapter.trackEvent({ 
                name: 'GameLoad',
                properties:{
                    action: 'Yes',
                    category: 'Play',
                    game_title: currentState.game_info.game.title,
                    label: currentState.game_info.contentId,
                    valuable: 'No'
                }
            });
            break;
        case 'START_SESSION':
            NewtonAdapter.trackEvent({
                name: "GameStart",
                rank: getContentRanking('GameStart', 'Play', currentState.game_info.contentId, userType, CONTENT_RANKING, userFrom),
                properties:{
                    category: "Play", 
                    game_title: currentState.game_info.game.title,
                    label: currentState.game_info.contentId,
                    valuable: "Yes",
                    action: "Yes"
                }
            });
            break;
        case 'END_SESSION':

            NewtonAdapter.trackEvent({
                rank: getContentRanking('GameEnd', 'Play', currentState.game_info.contentId, userType, CONTENT_RANKING, userFrom),
                name:'GameEnd', 
                properties:{
                    category: 'Play',
                    game_title: currentState.game_info.game.title,
                    label: currentState.game_info.contentId,
                    valuable: 'No',
                    action: 'No'                
                }
            });
            break;
        case 'GO_TO_HOME':

            NewtonAdapter.trackEvent({
                rank: getContentRanking('GameLoad', 'Play', currentState.game_info.contentId, 'guest', CONTENT_RANKING, userFrom),           
                name: 'GoToHome',
                properties:{
                    action: 'Yes',
                    category: 'Behavior',
                    game_title: currentState.game_info.game.title,
                    label: currentState.game_info.contentId,
                    valuable: 'No'                            
                }
            });
            break;
        case 'INIT_ERROR':
            NewtonAdapter.trackEvent({
                name: 'SdkInitError',                        
                properties:{
                    action: 'No',
                    category: 'SDK_ERROR',
                    game_title: currentState.game_info.game.title,
                    label: currentState.game_info.contentId,
                    valuable: 'No',
                    reason: currentState.generic.error
                }
            });
            break;
        case 'REDIRECT_ON_STORE':
            NewtonAdapter.trackEvent({
                name: 'NativeAppPromoClick',
                properties:{
                    action: 'Yes',
                    category: 'Behavior',
                    valuable: 'Yes',
                }
            });
            break;
        case 'SHOW_BANNER':
            NewtonAdapter.trackEvent({
                name: 'NativeAppPromoLoad',                        
                properties:{
                    action: 'Yes',
                    category: 'Behavior',
                    valuable: 'Yes',
                }
            });
            break;
        case 'HIDE_BANNER':
            NewtonAdapter.trackEvent({
                name: 'NativeAppPromoClose',                        
                properties:{
                    action: 'Yes',
                    category: 'Behavior',
                    valuable: 'Yes',
                }
            });
            break;
        default:
            break;
    }
    return next(action);
} 

/**
 * @param {string} eventName
 * @param {string} eventCategory
 * @param {string} contentId
 * @param {string} userType - free | premium | guest
 * @param {object} contentRankingObject 
 * @param {string} [userFrom=natural] - acquisition | natural
 * @returns {object}
 */
function getContentRanking(eventName, eventCategory, contentId, userType, contentRankingObject, userFrom='natural'){
    let contentRanking = contentRankingObject;
    let scopeType = 'social';
    let ranking = 0;

    // ranking score
    if(userType === 'premium'){
        ranking = contentRanking[eventCategory][eventName][userType][userFrom];
    } else {
        ranking = contentRanking[eventCategory][eventName][userType];
    }

    // scopeType
    if(eventCategory == 'Play'){
        scopeType = 'consumption';
    }

    return {
        contentId: contentId, 
        score: ranking, 
        scope: scopeType
    };
}