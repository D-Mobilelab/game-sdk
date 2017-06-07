import { generatePony } from '../lib/PonyToken';

export function showBanner() {
  return {
    type: 'SHOW_BANNER',
  };
}

export function hideBanner() {
  return {
    type: 'HIDE_BANNER',
  };
}

export function isLoading(loading) {
  return {
    type: 'SET_IS_LOADING',
    payload: { loading },
  };
}

export function redirectOnStore(fromPage) {
  return (dispatch, getState) => {
    const { game_info, vhost } = getState();
    dispatch(isLoading(true));
    generatePony(vhost, { return_url: game_info.url_zoom })
      .then((pony) => {
        // "https://app.appsflyer.com/com.docomodigital.gameasy.ww?pid=Webapp&c=<page>&af_sub1=<af_sub1>"
        const finalStoreUrl = vhost.GOOGLEPLAY_STORE_URL
          .replace('<page>', fromPage)
          .replace('<af_sub1>', pony);
        dispatch({ type: 'REDIRECT_ON_STORE', payload: finalStoreUrl });
        dispatch(isLoading(false));
        setTimeout(() => {
          window.location.href = finalStoreUrl;
        }, 0);
      }).catch((reason) => {
        console.warn(reason);
        dispatch(isLoading(false));
      });
  };
}
