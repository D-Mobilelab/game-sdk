import { showMenuList, hideMenuList } from './menulist-actions';

export function showMenu(position) {
  return (dispatch, getState) => {
    const { GFSDK_MENU_BUTTON, GFSDK_MENU_TYPE = 'standard' } = getState().vhost;
    if (typeof GFSDK_MENU_BUTTON !== 'undefined' && GFSDK_MENU_BUTTON === false) {
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
    if (GFSDK_MENU_TYPE === 'standard') {
      dispatch({
        type: 'SHOW_MENU',
        payload: { position: thePosition },
      });
    } else if (GFSDK_MENU_TYPE === 'extended') {
      dispatch(showMenuList());
    }
  };
}

export function hideMenu() {
  return (dispatch, getState) => {
    const { GFSDK_MENU_TYPE = 'standard' } = getState().vhost;
    if (GFSDK_MENU_TYPE === 'standard') {
      dispatch({
        type: 'HIDE_MENU',
      });
    } else if (GFSDK_MENU_TYPE === 'extended') {
      dispatch(hideMenuList());
    }
  };
}
