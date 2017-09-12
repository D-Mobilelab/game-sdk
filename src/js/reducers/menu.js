export function menu(state = {
  show: false,
  active: false,
  drag: false,
}, action) {
  switch (action.type) {
    case 'SHOW_MENU':
      const newMenuStateShow = { ...state, show: true, style: { ...state.style, ...action.style } };
      return Object.assign({}, state, newMenuStateShow);
    case 'HIDE_MENU':
      const newMenuStateHide = { ...state, show: false, style: { ...state.style, ...action.style } };
      return Object.assign({}, state, newMenuStateHide);
    default:
      return state;
  }
}
