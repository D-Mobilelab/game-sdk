import track from './track';
import Location from '../lib/Location';
import getContentRanking from './getContentRanking';
import { getUserType } from '../actions/user-actions';

const trackingMiddleware = store => next => (action) => {
  const currentState = store.getState();
  const qs = Location.getQueryString();
  const userFrom = (qs.dest || qs.trackExecutionKey) ? 'acquisition' : 'natural';
  const userType = getUserType(currentState.user);
  const { CONTENT_RANKING } = currentState.vhost;
  let eventObject = null;

  switch (action.type) {
    case 'INIT_FINISHED':
      eventObject = {
        name: 'GameLoad',
        properties: {
          action: 'Yes',
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      track(eventObject);
      break;
    case 'START_SESSION':
      eventObject = {
        name: 'GameStart',
        rank: getContentRanking('GameStart', 'Play', currentState.game_info.content_id, userType, CONTENT_RANKING, userFrom),
        properties: {
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'Yes',
          action: 'Yes',
        },
      };
      track(eventObject);
      break;
    case 'END_SESSION':
      eventObject = {
        rank: getContentRanking('GameEnd', 'Play', currentState.game_info.content_id, userType, CONTENT_RANKING, userFrom),
        name: 'GameEnd',
        properties: {
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
          action: 'No',
        },
      };
      track(eventObject);
      break;
    case 'GO_TO_HOME':
      eventObject = {
        rank: getContentRanking('GameLoad', 'Play', currentState.game_info.content_id, 'guest', CONTENT_RANKING, userFrom),
        name: 'GoToHome',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      track(eventObject);
      break;
    case 'INIT_ERROR':
      eventObject = {
        name: 'SdkInitError',
        properties: {
          action: 'No',
          category: 'SDK_ERROR',
          game_title: currentState.game_info.title || '',
          label: currentState.game_info.content_id || '',
          valuable: 'No',
          reason: currentState.generic.error,
        },
      };
      track(eventObject);
      break;
    case 'REDIRECT_ON_STORE':
      eventObject = {
        name: 'NativeAppPromoClick',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'Yes',
        },
      };
      track(eventObject);
      break;
    case 'SHOW_BANNER':
      eventObject = {
        name: 'NativeAppPromoLoad',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'Yes',
        },
      };
      track(eventObject);
      break;
    case 'HIDE_BANNER':
      eventObject = {
        name: 'NativeAppPromoClose',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'Yes',
        },
      };
      track(eventObject);
      break;
    case 'BACK_CLICKED':
      eventObject = {
        name: (userFrom === 'acquisition') ? 'FirstBackClicked' : 'BackClicked',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'No',
        },
      };
      track(eventObject);
      break;
    case 'RELATED_CLICKED':
      eventObject = {
        name: 'GameOverRelated',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'No',
          game_title: action.payload.title,
        },
      };
      track(eventObject);
      break;
    case 'REGISTER_SCORE_SUCCESS':
      eventObject = {
        name: 'NicknameAdded',
        properties: {
          action: 'Yes',
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      track(eventObject);
      break;
    default:
      break;
  }
  return next(action);
};

export default trackingMiddleware;
