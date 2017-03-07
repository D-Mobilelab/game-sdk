export function menu(state = {
  show: false,
  active: false,
  drag: false,
  style: { bottom: '2%', right: '2%' },
  pointerDownPosition: { x: 0, y: 0 },
  pointerUpPosition: { x: 0, y: 0 },
}, action) {
  switch (action.type) {
      case 'SHOW_MENU':
        const newMenuStateShow = { ...state, show: true, style: { ...state.style, ...action.style } };
        return Object.assign({}, state, newMenuStateShow);
      case 'HIDE_MENU':
        const newMenuStateHide = { ...state, show: false, style: { ...state.style, ...action.style } };
        return Object.assign({}, state, newMenuStateHide);
      case 'SET_DOWN_POSITION':
        return Object.assign({}, state, { active: action.active, pointerDownPosition: action.position });
      case 'SET_UP_POSITION':
        return Object.assign({}, state, { active: action.active, pointerUpPosition: action.position });
      case 'SET_POSITION':
        const newStyle = { style: { ...state.style, left: `${(action.position.x - 30)}px`, top: `${(action.position.y - 30)}px` } };
        return Object.assign({}, state, newStyle);
      case 'SET_DRAG':
        return Object.assign({}, state, { drag: action.payload.drag });
      default:
        return state;
  }
}
