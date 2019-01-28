export default function styles(state = {
}, action) {
  switch (action.type) {
    case 'SET_STYLES':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
