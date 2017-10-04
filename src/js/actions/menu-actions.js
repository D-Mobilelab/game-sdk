import Location from '../lib/Location';

export function goToHome() {
  return (dispatch) => {
    if (process.env.APP_ENV === 'HYBRID') {
      if (window.webview) {
        window.webview.Close();
      } else {
        /**
         * TODO: go to local index to be implemented
         */
        console.warn('Go to local index to be implemented');
        // Stargate.goToLocalIndex();
      }
    } else {
      window.location.href = Location.getOrigin();
    }
    dispatch({ type: 'GO_TO_HOME' });
  };
}

export function showMenu(payload) {
  return {
    type: 'SHOW_MENU',
    payload,
  };
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU',
  };
}
