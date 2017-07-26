import { dequeryfy } from 'docomo-utils';
import * as Constants from '../lib/Constants';
import Location from '../lib/Location';
import { AxiosInstance } from '../lib/AxiosService';

export function setRelated(related) {
  return {
    type: 'SET_RELATED',
    related,
  };
}

export function normalizeGameInfo(gameInfo) {
  let newGameInfo = JSON.parse(JSON.stringify(gameInfo || {}));
  if (newGameInfo.game) {
    newGameInfo = { ...newGameInfo, ...gameInfo.game };
    delete newGameInfo.game;
  }
  newGameInfo.content_id = newGameInfo.content_id || newGameInfo.contentId || newGameInfo.id;
  return newGameInfo;
}

export function getContentId() {
  const urlToMatch = Location.getCurrentHref();
  const contentIdRegex = new RegExp(Constants.CONTENT_ID_REGEX);
  const match = urlToMatch.match(contentIdRegex);

  if (match !== null && match.length > 0) {
    return match[2];
  }
  throw new Error('Cannot get content id from url');
}

export function getGameInfo() {
  return (dispatch, getState) => {
    dispatch({ type: 'GAME_INFO_LOAD_START' });
    const { vhost } = getState();
    const query = dequeryfy(vhost.MOA_API_CONTENTS);
    const toRetain = ['country', 'fw', 'lang', 'real_customer_id', 'vh', 'white_label'];
    /** ... m(_ _)m ma perchè devo fare questo ... */
    const filteredQuery = Object.keys(query)
                                .filter(key => toRetain.includes(key))
                                .reduce((obj, key) => {
                                  obj[key] = query[key];
                                  return obj;
                                }, {});
    const endPoint = vhost.MOA_API_CONTENTS.split('?')[0];
    
    return AxiosInstance.get(endPoint, { params: { content_id: getContentId(), ...filteredQuery } })
    .then((response) => {
      const gameInfo = normalizeGameInfo(response.data);
      dispatch({ type: 'GAME_INFO_LOAD_END', game_info: gameInfo });
    })
    .catch((reason) => {
      dispatch({ type: 'GAME_INFO_LOAD_FAIL', error: reason });
    });
  };
}
