export default function menu(state = {
  show: false,
  active: false,
  drag: false,
  position: 'BOTTOM_RIGHT',
}, action) {
  switch (action.type) {
    case 'INIT_START':
      return Object.assign({}, state, { position: action.initConfig.menuPosition || state.position });
    case 'SHOW_MENU':
      return Object.assign({}, state, {
        show: true,
        position: action.payload.position || state.position,
      });
    case 'HIDE_MENU':
      return Object.assign({}, state, { show: false });
    default:
      return state;
  }
}
