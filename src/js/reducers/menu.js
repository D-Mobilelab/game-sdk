export default function menu(state = {
  show: false,
  active: false,
  drag: false,
  position: 'BOTTOM_RIGHT',
}, action) {
  switch (action.type) {
    case 'SHOW_MENU':
      return Object.assign({}, state, { show: true, position: action.payload.position });
    case 'HIDE_MENU':
      return Object.assign({}, state, { show: false });
    default:
      return state;
  }
}
