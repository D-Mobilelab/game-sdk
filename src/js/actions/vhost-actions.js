import { AxiosInstance } from '../lib/AxiosService';

export function load(VHOST_API_URL, keys){
    return (dispatch, getState) => {
        dispatch({ type: 'VHOST_LOAD_START' });
        return AxiosInstance.get(VHOST_API_URL, { params:{ keys: keys.join(',') } })
        .then((response) => {
            dispatch({type: 'VHOST_LOAD_END', vhost: response.data});
            // return dispatch(userActions.getUser());
        }).catch((reason) => {
            dispatch({type: 'VHOST_LOAD_FAIL', error: reason});
        });
    }
}