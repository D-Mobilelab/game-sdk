import FacebookInterface from '../lib/FacebookInterface';
import Location from '../lib/Location';

export function initFacebook(config) {
  FacebookInterface.init(config);
  return {
    type: 'INIT_FACEBOOK',
    payload: config,
  };
}

export function share(url, service) {
  return (dispatch) => {
    if (service === 'facebook') {
      let absUrl = url;
      if (url.indexOf('http:') === -1 || url.indexOf('https:') === -1) {
        absUrl = [Location.getOrigin(), url].join('');
      }
      dispatch({ type: 'SHARE_START', payload: { service, url: absUrl } });
      return FacebookInterface.share(absUrl)
        .then(() => {
          dispatch({ type: 'SHARE_END', payload: { service, url: absUrl } });
        });
    }
  };
}
