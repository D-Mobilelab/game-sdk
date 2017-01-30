import { FacebookSharer } from '../lib/Sharer';

export function initFacebook(config) {
  FacebookSharer.init(config);
  return {
    type: 'INIT_FACEBOOK',
    payload: config,
  };
}

export function share(url, service) {
  return (dispatch) => {
    if (service === 'facebook') {
      dispatch({ type: 'SHARE_START', payload: { service, url } });
      return FacebookSharer.share(url)
        .then(() => {
          dispatch({ type: 'SHARE_END', payload: { service, url } });
        });
    }
  };
}
