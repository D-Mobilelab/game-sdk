export const FB_SDK_VERSION = 'v2.10';
export const FB_SDK_URL = 'connect.facebook.net/en_US/sdk.js';
export const CONTENT_ID_REGEX = '(html5gameplay)\/([a-zA-Z0-9]+)';

export const VHOST_API_URL = '/v01/config.getvars';
export const DICTIONARY_API_URL = '/dictionary'; // dictionary keys
export const GAME_INFO_API_URL = '/v01/gameplay'; // ?content_id=
export const GAME_INFO_PROXY_API_URL = '/v01/gameplay_proxy'; // ?content_id=&_PONY=
export const GAMEOVER_API_URL = '/v01/gameover/:CONTENT_ID'; // ?start&duration&score&level
export const LEADERBOARD_API_URL = '/v01/leaderboard';
export const CAN_DOWNLOAD_API_URL = '/v01/user.candownload/:ID';
export const USER_CHECK = '/v01/user.check';
export const USER_SET_LIKE = '/v01/favorites.set';
export const USER_GET_LIKE = '/v01/favorites.get';
export const USER_DELETE_LIKE = '/v01/favorites.delete';
export const GAME_OVER_JSON_API_URL = '/v01/json/gameover/:CONTENT_ID'; // ?score=&duration=

export const GAMEINFO_JSON_FILENAME = 'offlineData.json';
export const USER_JSON_FILENAME = 'user.json';
export const USER_DATA_JSON_FILENAME = 'userData.json';
export const VHOST_JSON_FILENAME = 'config.json';
export const NEWTON_DEBUG_SECRET = '_BdH,S;lTr%Fd+#fka-]';
