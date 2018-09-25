export function showMenu(position) {
  return (dispatch, getState) => {
    const { vhost } = getState();
    if (typeof vhost.GFSDK_MENU_BUTTON !== 'undefined' && vhost.GFSDK_MENU_BUTTON === false) {
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

export function goToHome() {
  return (dispatch) => {
    // If I'm in iframe...
    if (window !== window.top) {
      window.parent.postMessage('GO_TO_HOME', '*');
    }
    setTimeout(function(){
      window.location.href = Location.getOrigin();
    },1000);
    dispatch({ type: 'GO_TO_HOME' });
  };
}
