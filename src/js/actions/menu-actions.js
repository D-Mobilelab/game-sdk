import Location from '../lib/Location';

export function goToHome() {
  return (dispatch) => {
    if (process.env.APP_ENV === 'HYBRID') {
      if (window.webview) {
        window.webview.Close();
      }
    } else {
      window.location.href = Location.getOrigin();
    }
    dispatch({ type: 'GO_TO_HOME' });
  };
}

export function showMenu(position) {
  return (dispatch, getState) => {
    const { vhost } = getState();
    if (vhost.GFSDK_MENU_BUTTON && !vhost.GFSDK_MENU_BUTTON) {
      return;
    }
    let thePosition = null;
    const rightPositions = [
      'TOP_LEFT',
      'TOP_RIGHT',
      'BOTTOM_RIGHT',
      'BOTTOM_LEFT',
    ];
    if (typeof position === 'string') {
      position = position.toUpperCase();
      if (rightPositions.indexOf(position) > -1) {
        thePosition = position;
      }
    }

    dispatch({
      type: 'SHOW_MENU',
      payload: { position: thePosition },
    });
  };
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU',
  };
}
