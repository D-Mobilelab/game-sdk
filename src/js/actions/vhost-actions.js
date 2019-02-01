import { localStorage } from '../lib/LocalStorage';
import { AxiosInstance } from '../lib/AxiosService';
import { getLabel } from './utils';

export function load(VHOST_API_URL, keys) {
  return (dispatch) => {
    dispatch({ type: 'VHOST_LOAD_START' });
    const vhost = JSON.parse(localStorage.getItem('gfsdk_vhost'));
    /**
     * Avoid a call if there's the vhost in localStorage (saved by webapp)
     */
    if (vhost) {
      if (!vhost.FW_TYPE_PROFILE) {
        vhost.FW_TYPE_PROFILE = getLabel();
      }
      dispatch({ type: 'VHOST_LOAD_END', vhost });
    } else {
      return AxiosInstance.get(VHOST_API_URL, { withCredentials: true, params: { keys: keys.join(',') } })
        .then((response) => {
          if (!response.data.FW_TYPE_PROFILE) {
            response.data.FW_TYPE_PROFILE = getLabel();
          }
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
    const action = { type: 'DICTIONARY_LOAD_END', payload: {} };
    return AxiosInstance.get(DICTIONARY_API, { withCredentials: true }).then((response) => {
      action.payload = response.data;
      dispatch(action);
    }).catch((reason) => {
      dispatch({ type: 'DICTIONARY_LOAD_ERROR', payload: reason });
    });
  };
}
