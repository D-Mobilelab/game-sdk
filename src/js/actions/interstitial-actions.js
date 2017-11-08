import { queryfy } from 'docomo-utils';
import Location from '../lib/Location';

export function show() {
  return (dispatch, getState) => {
    const { vhost } = getState();
    if (window.GamePixAdv) {
      window.GamePixAdv.show({ tid: vhost.GAMEPIX_AD_ID });
    } else {
      const params = {
        INPAGE_AD_CLIENT: vhost.AD_CLIENT,
        INPAGE_AD_SLOT: vhost.INGAME_ADV,
        WIDTH: '336',
        HEIGHT: '280',
        refresh: Date.now(),
      };

      const endpoint = `${Location.getOrigin()}${vhost.AD_IFRAME_URL}`;
      dispatch({
        type: 'SHOW_INTERSTITIAL',
        payload: {
          show: true,
          src: queryfy(endpoint, params),
        },
      });
    }
  };
}

export function hide() {
  return {
    type: 'HIDE_INTERSTITIAL',
    payload: { show: false },
  };
}
