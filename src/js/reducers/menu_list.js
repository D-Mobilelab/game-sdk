export default function menu_list(state = {
  show: false,
}, action) {
  switch (action.type) {
    case 'SHOW_MENU_LIST':
      return Object.assign({}, state, { showmenulist: true });
    case 'HIDE_MENU_LIST':
      return Object.assign({}, state, { showmenulist: false });
    default:
      return state;
  }
}
