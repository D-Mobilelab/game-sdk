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
