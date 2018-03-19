export function showMenuList() {
  return (dispatch, getState) => {
    dispatch({
      type: 'SHOW_MENU_LIST',
      payload: {},
    });
  };
}

export function hideMenuList() {
  return {
    type: 'HIDE_MENU_LIST',
  };
}

export function showMenuListOptions() {
  return {
    type: 'OPEN_MENU_LIST_OPTIONS',
  };
}

export function hideMenuListOptions() {
  return {
    type: 'HIDE_MENU_LIST_OPTIONS',
  };
}
