export function showMenu() {
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: 'SHOW_MENU_LIST',
  //     payload: {},
  //   });
  // };

  return {
    type: 'SHOW_MENU_LIST',
  };
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU_LIST',
  };
}

export function showButtons() {
  return {
    type: 'SHOW_MENU_LIST_BUTTONS',
  };
}

export function hideButtons() {
  return {
    type: 'HIDE_MENU_LIST_BUTTONS',
  };
}

export function toggleButtons() {
  return {
    type: 'TOGGLE_MENU_LIST_BUTTONS',
  };
}