import NewtonAdapter from 'newton-adapter';
import ReactGA from 'react-ga';
import FacebookPixelAdapter from 'facebookpixeladapter';
import Location from '../lib/Location';
import getContentRanking from './getContentRanking';
import { getUserType } from '../actions/utils';

const mapNewtonEventToFacebook = {
  GameLoad: 'ViewContent',
  GameStart: 'AddToCart',
  GameEnd: 'Purchase',
};

function PixelTrack(eventObject, extraProps = {}) {
  FacebookPixelAdapter.trackCustom(eventObject.name, { ...eventObject.properties, ...extraProps });
  if (eventObject.name in mapNewtonEventToFacebook) {
    const clonedEventObject = Object.assign({}, eventObject);
    clonedEventObject.properties = {};
    clonedEventObject.properties.content_ids = [eventObject.properties.label];
    clonedEventObject.properties.content_name = eventObject.properties.game_title;
    clonedEventObject.properties.content_type = 'product';
    clonedEventObject.properties.currency = 'USD';
    clonedEventObject.properties.value = 1;
    FacebookPixelAdapter.track(mapNewtonEventToFacebook[clonedEventObject.name], clonedEventObject.properties);
  }
}

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

      NewtonAdapter.trackEvent(eventObject);
      NewtonAdapter.trackPageview({
        properties: {
          action: 'pageview',
          page_name: 'game-page',
          page_title: window.document.title,
          http_referrer: window.document.referrer,
          page_path: Location.getCurrentHref(),
          content_id: currentState.game_info.content_id,
          content_name: currentState.game_info.title,
        },
      });
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
      break;
    case 'GAMEPIX_INTERSTITIAL_CALLBACK':
      eventObject = {
        name: 'InterstitialAdShown',
        properties: {
          action: 'Yes',
          category: 'Play',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
      break;
    case 'GO_TO_HOME':
      eventObject = {
        rank: getContentRanking('GameLoad', 'Play', currentState.game_info.content_id, userType, CONTENT_RANKING, userFrom),
        name: 'GoToHome',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
      break;
    case 'TOGGLE_MENU_LIST_BUTTONS':
      eventObject = {
        properties: {
          action: 'Yes',
          category: 'Behavior',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      if (currentState.menu_list.showList) {
        eventObject.name = 'MenuClose';
      } else {
        eventObject.name = 'MenuOpen';
      }
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
      break;
    case 'GO_TO_ACCOUNT':
      eventObject = {
        name: 'GoToAccount',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
      break;
    case 'GO_TO_ZOOM':
      eventObject = {
        name: 'GoToZoom',
        properties: {
          action: 'Yes',
          category: 'Behavior',
          game_title: currentState.game_info.title,
          label: currentState.game_info.content_id,
          valuable: 'No',
        },
      };
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: eventObject.properties.label,
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: currentState.game_info.content_id || '',
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: currentState.game_info.content_id || '',
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: currentState.game_info.content_id || '',
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: currentState.game_info.content_id || '',
      });
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
      NewtonAdapter.trackEvent(eventObject);
      PixelTrack(eventObject, { user_type: userType });
      ReactGA.event({
        category: eventObject.properties.category,
        action: eventObject.name,
        label: action.payload.id || '',
      });
      break;
    case 'REGISTER_SCORE_SUCCESS':
      if (action.payload.shouldTrack) {
        eventObject = {
          name: action.payload.eventName,
          properties: {
            action: 'Yes',
            category: 'Play',
            game_title: currentState.game_info.title,
            label: currentState.game_info.content_id,
            valuable: 'No',
          },
        };
        NewtonAdapter.trackEvent(eventObject);
        PixelTrack(eventObject, { user_type: userType });
        ReactGA.event({
          category: eventObject.properties.category,
          action: eventObject.name,
          label: eventObject.properties.label,
        });
      }
      break;
    case 'HIDE_ENTER_NAME':
      if (action.payload && action.payload.userInput) {
        eventObject = {
          name: 'EnterNameClose',
          properties: {
            action: 'Yes',
            category: 'Play',
            game_title: currentState.game_info.title,
            label: currentState.game_info.content_id,
            valuable: 'No',
          },
        };
        NewtonAdapter.trackEvent(eventObject);
        PixelTrack(eventObject, { user_type: userType });
        ReactGA.event({
          category: eventObject.properties.category,
          action: eventObject.name,
          label: eventObject.properties.label,
        });
      }
      break;
    default:
      break;
  }
  return next(action);
};

export default trackingMiddleware;
