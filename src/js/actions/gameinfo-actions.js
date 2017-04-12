import Constants from '../lib/Constants';
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
    const { generic } = getState();
      return AxiosInstance.get(Constants.GAME_INFO_API_URL, {
        params: {
          content_id: getContentId(),
          cors_compliant: 1,
        },
      }).then((response) => {
        const gameInfo = normalizeGameInfo(response.data.game_info);
        dispatch({ type: 'GAME_INFO_LOAD_END', game_info: gameInfo });        
      }).catch((reason) => {
        dispatch({ type: 'GAME_INFO_LOAD_FAIL', error: reason });
      });
  };
}
