import NewtonAdapter from 'newton-adapter';
import Location from '../lib/Location';
import { getUserType } from './utils';

const hybrid = process.env.APP_ENV === 'HYBRID';

export function init() {
  return (dispatch, getState) => {
    const currentState = getState();
    const newtonSecret = currentState.vhost.NEWTON_SECRETID;

    return NewtonAdapter.init({
      secretId: newtonSecret,
      enable: true, // enable newton
      waitLogin: true, // wait for login to have been completed (async)
      properties: {
        environment: (hybrid ? 'hybrid' : 'webapp'),
        white_label_id: currentState.vhost.WHITE_LABEL,
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
      ['white_label_id', currentState.vhost.WHITE_LABEL],
      ['http_referrer', window.document.referrer],
    ];

    const userProperties = toAdd.reduce((accumulator, keyValue) => {
      const [key, value] = keyValue;
      if (value) { accumulator[key] = value; } // eslint-disable-line no-param-reassign
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
    }).catch((reason) => {
      console.warn(reason);
      return Promise.resolve(reason);
    });
  };
}
