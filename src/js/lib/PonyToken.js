import { JSONPRequest, checkObject, queryfy } from 'docomo-utils';
import { AxiosInstance } from './AxiosService';

import readCookies from './readCookies';

/**
 * setFingerPrint
 * @export
 * @param {object} Config
 * @param {string} pony - the token of the logged user
 * @param {string} returnUrl - the url where to return once relogged
 * @returns {Promise}
 */
export function setFingerPrint(Config, pony, returnUrl) {
  let { MFP_API_URL } = Config;
  MFP_API_URL = `${MFP_API_URL}put`;

  const mfpParams = {
    apikey: Config.MOTIME_API_KEY ? Config.MOTIME_API_KEY : Config.MOA_API_KEY,
    contents_inapp: {
      api_country: Config.MFP_CONTENT_INAPP_API_COUNTRY ? Config.MFP_CONTENT_INAPP_API_COUNTRY : Config.API_COUNTRY,
      country: Config.MFP_CONTENT_INAPP_TLD ? Config.MFP_CONTENT_INAPP_TLD : Config.TLD,
      fpnamespace: Config.MFP_NAMESPACE ? Config.MFP_NAMESPACE : Config.SITE_PROFILE,
      extData: {
        domain: Config.DEST_DOMAIN,
        return_url: returnUrl,
        ponyUrl: pony,
      },
    },
    country: Config.MFP_TLD ? Config.MFP_TLD : Config.TLD,
    expire: Config.MFP_EXPIRE || 300,
  };

  /** God forgive them because they don't know what they do */
  mfpParams.contents_inapp = JSON.stringify(mfpParams.contents_inapp);

  const url = queryfy(MFP_API_URL, mfpParams);
  const request = new JSONPRequest(url);
  return request.prom.then((response) => {
    console.log('setFingerPrint:OK', response);
    return response;
  });
}

/**
 * generatePony
 * @export
 * @param {object} Config - the vhost config
 * @param {object} options -
 * @param {object} options.return_url -
 * @returns {Promise<String>} the pony string
 */
export function generatePony(Config, options = { return_url: '' }) {
  const { MOA_API_CREATEPONY, MFP_COOKIE_LIST } = Config;
  const ponyParams = {
    data: {
      return_url: options.return_url,
      cookieData: {
        cookie: {},
      },
    },
  };

  /**
   * Add cookie key-value pairs
   */
  const cookiesAsObject = readCookies(document.cookie);
  MFP_COOKIE_LIST.split(',').map((key) => {
    ponyParams.data.cookieData[key] = cookiesAsObject[key];
    return ponyParams;
  });

  const encodedParams = encodeURIComponent(JSON.stringify(ponyParams));
  const configRequest = { params: { data: encodedParams }, withCredentials: true };

  return AxiosInstance.get(MOA_API_CREATEPONY, configRequest)
        .then((response) => {
          console.log('Pony created:OK', MOA_API_CREATEPONY, encodedParams, response);
          let pony = checkObject(response, 'data.data.ponyUrl');
          if (pony) { pony = pony.replace('&', ''); }
          return Promise.all([pony, setFingerPrint(Config, pony, options.return_url)]);
        })
        .then(results => results[0]);
}
