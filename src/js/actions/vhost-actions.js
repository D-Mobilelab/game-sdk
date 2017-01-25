import { AxiosInstance } from '../lib/AxiosService';

export function load(VHOST_API_URL, keys) {
  return (dispatch) => {
    dispatch({ type: 'VHOST_LOAD_START' });

    let vhost;
    if (window.localStorage) {
      vhost = JSON.parse(window.localStorage.getItem('gfsdk_vhost'));
    }

    /**
     * Avoid a call if there's the vhost in localStorage (saved by webapp) 
     */
    if (vhost) {
      dispatch({ type: 'VHOST_LOAD_END', vhost });
    } else {
      return AxiosInstance.get(VHOST_API_URL, { params: { keys: keys.join(',') } })
          .then((response) => {
            dispatch({ type: 'VHOST_LOAD_END', vhost: response.data });
          }).catch((reason) => {
            dispatch({ type: 'VHOST_LOAD_FAIL', error: reason });
          });
    }
    return Promise.resolve();
  };
}

export function dictLoad() {
  let dictionary;
  let action = { type: 'DICTIONARY_LOAD_END', payload: {} };
  if (window.localStorage) {
    dictionary = JSON.parse(window.localStorage.getItem('gfsdk_dictionary'));
    action.payload = dictionary;
  }
  return action;
}
