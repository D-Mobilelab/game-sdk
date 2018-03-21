export default function menu_list(state = {
  show: false,
  showList: false,
}, action) {
  switch (action.type) {
    case 'SHOW_MENU_LIST':
      return Object.assign({}, state, { show: true });
    case 'HIDE_MENU_LIST':
      return Object.assign({}, state, { show: false });
    case 'SHOW_MENU_LIST_BUTTONS':
      return Object.assign({}, state, { showList: true });
    case 'HIDE_MENU_LIST_BUTTONS':
      return Object.assign({}, state, { showList: false });
    case 'TOGGLE_MENU_LIST_BUTTONS':
      return Object.assign({}, state, { showList: !state.showList });
    default:
      return state;
  }
}
