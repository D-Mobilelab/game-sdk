import * as Constants from '../lib/Constants';
import Location from '../lib/Location';

/**
 * Normalize game info object
 * @export
 * @param {bject} gameInfo - the gameInfo object
 * @returns {object} - returns the normalized gameinfo
 */
export function normalizeGameInfo(gameInfo) {
  let newGameInfo = JSON.parse(JSON.stringify(gameInfo || {}));
  if (newGameInfo.game) {
    newGameInfo = { ...newGameInfo, ...gameInfo.game };
    delete newGameInfo.game;
  }
  newGameInfo.content_id = newGameInfo.content_id || newGameInfo.contentId || newGameInfo.id;
  return newGameInfo;
}
/**
 * Gets the content id from querystring
 * 
 * @export
 * @returns {string} - returns the contentId
 * @throws - Cannot get content id from url
 */
export function getContentId() {
  const urlToMatch = Location.getCurrentHref();
  const contentIdRegex = new RegExp(Constants.CONTENT_ID_REGEX);
  const match = urlToMatch.match(contentIdRegex);

  if (match !== null && match.length > 0) {
    return match[2];
  }
  throw new Error('Cannot get content id from url');
}

/**
 * Get the user type: guest(unlogged) free(facebook) or premium(subscribed)
 * @param {Object} userInfo - user check returned object
 * @returns {String} - return the type of the user
 */
export function getUserType(userInfo) {
  if (!userInfo.user) {
    return 'guest';
  } else if (!userInfo.subscribed) {
    return 'free';
  } else if (userInfo.subscribed) {
    return 'premium';
  }
  return 'guest';
}
