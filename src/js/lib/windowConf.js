/**
 * This module is intended for dev and testing purpose
 * 
 * @export
 * @param {any} { 
 *   HOST = 'appsworld.gamifive-app.com', 
 *   GAME_ID = 'c2701133414427fee732e051abdfe3e8',
 *   COUNTRY_CODE = 'ww-it',
 *   HASH = window.location.hash,
 *   SEARCH = window.location.search,
 *   PORT = window.location.port,
 * } 
 * @returns 
 */
export default function location({ 
  HOST = window.location.hostname.replace('local.', ''),
  GAME_ID = 'c2701133414427fee732e051abdfe3e8',
  COUNTRY_CODE = 'ww-it',
  HASH = window.location.hash,
  SEARCH = window.location.search,
  PORT = window.location.port,
}) {
  return {
    hash: HASH,
    search: SEARCH,
    pathname: `/${COUNTRY_CODE}/html5gameplay/${GAME_ID}/game/sample${SEARCH}${HASH}`,
    port: PORT,
    hostname: `${HOST}`,
    host: `${HOST}`,
    protocol: 'http:',
    origin: `http://${HOST}`,
    href: `http://${HOST}/${COUNTRY_CODE}/html5gameplay/${GAME_ID}/game/sample${SEARCH}${HASH}`,
  };
}
