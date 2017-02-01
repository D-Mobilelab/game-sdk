import NewtonAdapter from 'newton-adapter';
import Location from '../lib/Location';
import getContentRanking from './getContentRanking';
import { getUserType } from '../actions/user-actions';

export const newtonMiddleware = store => next => (action) => {
  const currentState = store.getState();
  const qs = Location.getQueryString();
  const userFrom = (qs.dest || qs.trackExecutionKey) ? 'acquisition' : 'natural';
  const userType = getUserType(currentState.user);
  const { CONTENT_RANKING } = currentState.vhost;

  switch (action.type) {
    case 'INIT_FINISHED':
      NewtonAdapter.trackEvent({
        name: 'GameLoad',
        properties: {
          action: 'Yes',
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      });
      break;
    case 'START_SESSION':
      NewtonAdapter.trackEvent({
        name: 'GameStart',
        rank: getContentRanking('GameStart', 'Play', currentState.game_info.content_id, userType, CONTENT_RANKING, userFrom),
        properties: {
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'Yes',
          action: 'Yes',
        },
      });
      break;
    case 'END_SESSION':

      NewtonAdapter.trackEvent({
        rank: getContentRanking('GameEnd', 'Play', currentState.game_info.content_id, userType, CONTENT_RANKING, userFrom),
        name: 'GameEnd',
        properties: {
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
          action: 'No',
        },
      });
      break;
    case 'GO_TO_HOME':

      NewtonAdapter.trackEvent({
        rank: getContentRanking('GameLoad', 'Play', currentState.game_info.content_id, 'guest', CONTENT_RANKING, userFrom),
        name: 'GoToHome',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      });
      break;
    case 'INIT_ERROR':
      NewtonAdapter.trackEvent({
        name: 'SdkInitError',
        properties: {
          action: 'No',
          category: 'SDK_ERROR',
          game_title: currentState.game_info.title || '',
          label: currentState.game_info.content_id || '',
          valuable: 'No',
          reason: currentState.generic.error,
        },
      });
      break;
    case 'REDIRECT_ON_STORE':
      NewtonAdapter.trackEvent({
        name: 'NativeAppPromoClick',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'Yes',
        },
      });
      break;
    case 'SHOW_BANNER':
      NewtonAdapter.trackEvent({
        name: 'NativeAppPromoLoad',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'Yes',
        },
      });
      break;
    case 'HIDE_BANNER':
      NewtonAdapter.trackEvent({
        name: 'NativeAppPromoClose',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          valuable: 'Yes',
        },
      });
      break;
    default:
      break;
  }
  return next(action);
};
