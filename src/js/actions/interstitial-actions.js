import { queryfy } from 'docomo-utils';
import Location from '../lib/Location';

export function show() {
  return (dispatch, getState) => {
    const { vhost } = getState();
    const params = {
      INPAGE_AD_CLIENT: vhost.AD_CLIENT,
      INPAGE_AD_SLOT: vhost.INGAME_ADV,
      INPAGE_AD_FORMAT: 'rectangle',
    };

    const endpoint = `${Location.getOrigin()}${vhost.AD_IFRAME_URL}`;

    dispatch({
      type: 'SHOW_INTERSTITIAL',
      payload: {
        show: true,
        src: queryfy(endpoint, params),
        // srcDoc: response.data
      },
    });
  };
}

export function hide() {
/** empty source to force reload on show action */
  return {
    type: 'HIDE_INTERSTITIAL',
    payload: { show: false, srcDoc: '' },
  };
}
