import { queryfy } from 'docomo-utils';
import Location from '../lib/Location';

export function show() {
  return (dispatch) => {
    const params = {
      INPAGE_AD_CLIENT: 'ca-pub-8608548322608076',
      INPAGE_AD_SLOT: '9533220421',
      INPAGE_AD_FORMAT: 'rectangle',
    };

    const endpoint = `${Location.getOrigin()}/bannerads`;

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
