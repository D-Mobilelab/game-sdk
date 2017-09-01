import localStorage from '../lib/LocalStorage';
import { AxiosInstance } from '../lib/AxiosService';

export function load(VHOST_API_URL, keys) {
  return (dispatch) => {
    dispatch({ type: 'VHOST_LOAD_START' });
    const vhostLocal = JSON.parse(localStorage.getItem('gfsdk_vhost'));
    let vhost = false;

    if (vhostLocal) {
      vhost = JSON.parse(vhostLocal);
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

export function dictLoad(DICTIONARY_API) {
  return (dispatch) => {
    const dictionaryLocal = localStorage.getItem('gfsdk_dictionary');
    let dictionary = false;

    if (dictionaryLocal) {
      dictionary = JSON.parse(dictionaryLocal);
    }

    const action = { type: 'DICTIONARY_LOAD_END', payload: {} };
    if (dictionary) {
      action.payload = dictionary;
      dispatch(action);
      return Promise.resolve();
    } else {
      return AxiosInstance.get(DICTIONARY_API).then((response) => {
        action.payload = response.data;
        dispatch(action);
      }).catch((reason) => {
        dispatch({ type: 'DICTIONARY_LOAD_ERROR', payload: reason });
      });
    }
  };
}
