import NewtonAdapter from 'newton-adapter';
import Location from '../lib/Location';
import { getUserType } from './user-actions';
import { NEWTON_DEBUG_SECRET } from '../lib/Constants';

const hybrid = process.env.APP_ENV === 'HYBRID';

export function init() {
  return (dispatch, getState) => {
    const currentState = getState();

    let newtonSecret = currentState.vhost.NEWTON_SECRETID;
    if (process.env.NODE_ENV === 'development') {
      newtonSecret = NEWTON_DEBUG_SECRET;
    }

    return NewtonAdapter.init({
      secretId: newtonSecret,
      enable: true, // enable newton
      waitLogin: true, // wait for login to have been completed (async)
      properties: {
        environment: (hybrid ? 'hybrid' : 'webapp'),
        white_label_id: currentState.game_info.label || 'it-gameasy',
      },
    });
  };
}

export function login() {
  return (dispatch, getState) => {
    const currentState = getState();

    const queryString = Location.getQueryString();
    if (typeof queryString.dest === 'undefined') {
      queryString.dest = 'N/A';
    }

    const toAdd = [
      ['country', currentState.vhost.TLD],
      ['real_country', currentState.vhost.NT_REAL_COUNTRY],
      ['white_label_id', currentState.game_info.label],
      ['http_referrer', window.document.referrer],
    ];

    const userProperties = toAdd.reduce((accumulator, keyValue) => {
      const [key, value] = keyValue;
      if (value) { accumulator[key] = value; }
      return accumulator;
    }, queryString);

    let logged = true;
    if (getUserType(currentState.user) === 'guest') {
      logged = false;
    }

    return NewtonAdapter.login({
      type: 'external',
      userId: currentState.user.user || '',
      userProperties,
      logged,
    }).catch(reason => Promise.resolve(reason));
  };
}
