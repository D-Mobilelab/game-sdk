import Location from '../lib/Location';

export function goToHome() {
  return (dispatch, getState) => {
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

export function showMenu(style) {
  return {
    type: 'SHOW_MENU',
    style,
  };
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU',
  };
}
