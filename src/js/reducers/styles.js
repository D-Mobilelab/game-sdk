export default function styles(state = {
  styles: {},
}, action) {
  switch (action.type) {
    case 'SET_STYLES':
      return Object.assign({}, state, { styles: action.payload });
    default:
      return state;
  }
}
