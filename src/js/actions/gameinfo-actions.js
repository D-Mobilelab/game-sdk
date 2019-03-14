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
    if (window.GamifiveInfo.game) {
      dispatch({ type: 'GAME_INFO_LOAD_END', game_info: window.GamifiveInfo.game });
    } else {
      dispatch({ type: 'GAME_INFO_LOAD_FAIL', error: 'game info not found on page' });
    }
  };
}
