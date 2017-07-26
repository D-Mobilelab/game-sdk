import { ponyToken as generatePony } from 'docomo-utils';

export function showBanner() {
  return {
    type: 'SHOW_BANNER',
  };
}

export function hideBanner(loading = false) {
  return {
    type: 'HIDE_BANNER',
    payload: { loading },
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
    dispatch(isLoading(true));

    const { game_info, vhost } = getState();
    generatePony(vhost, { return_url: game_info.url_zoom })
      .then((pony) => {
        // "https://app.appsflyer.com/com.docomodigital.gameasy.ww?pid=Webapp&c=<page>&af_sub1=<af_sub1>"
        const finalStoreUrl = vhost.GOOGLEPLAY_STORE_URL
          .replace('<page>', fromPage)
          .replace('<af_sub1>', encodeURIComponent(pony));

        dispatch({ type: 'REDIRECT_ON_STORE', payload: finalStoreUrl });
        setTimeout(() => dispatch(hideBanner()), 1000);
        window.location.href = finalStoreUrl;
      }).catch((reason) => {
        dispatch({ type: 'REDIRECT_ON_STORE_ERROR', payload: reason.toString() });
        dispatch(hideBanner());
      });
  };
}
