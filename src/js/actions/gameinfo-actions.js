import { dequeryfy } from 'docomo-utils';
import { AxiosInstance } from '../lib/AxiosService';
import { normalizeGameInfo, getContentId } from './utils';

export function setRelated(related) {
  return {
    type: 'SET_RELATED',
    related,
  };
}

export function getGameInfo() {
  return (dispatch, getState) => {
    dispatch({ type: 'GAME_INFO_LOAD_START' });
    if (window.GamifiveInfo && window.GamifiveInfo.game) {
      dispatch({ type: 'GAME_INFO_LOAD_END', game_info: window.GamifiveInfo.game });
    } else {
      if (process.env.LOCAL_DEV) {
        const { vhost } = getState();
        const query = dequeryfy(vhost.MOA_API_CONTENTS_GAMEINFO);
        const toRetain = ['country', 'fw', 'lang', 'real_customer_id', 'vh', 'white_label'];
        // ... m(_ _)m ma perchè devo fare questo
        const filteredQuery = Object.keys(query)
          .filter(key => toRetain.includes(key))
          .reduce((obj, key) => {
            obj[key] = query[key]; // eslint-disable-line no-param-reassign
            return obj;
          }, {});

        const endPoint = vhost.MOA_API_CONTENTS_GAMEINFO.split('?')[0];
        return AxiosInstance.get(endPoint, { withCredentials: true, params: { content_id: getContentId(), ...filteredQuery } })
          .then((response) => {
            const gameInfo = normalizeGameInfo(response.data);
            dispatch({ type: 'GAME_INFO_LOAD_END', game_info: gameInfo });
          })
          .catch((reason) => {
            dispatch({ type: 'GAME_INFO_LOAD_FAIL', error: reason });
          });
      }
      dispatch({ type: 'GAME_INFO_LOAD_FAIL', error: 'game info not found on page' });
    }
  };
}
