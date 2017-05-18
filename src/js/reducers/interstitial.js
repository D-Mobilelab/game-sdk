export function interstitial(state = { show: false }, action) {
  switch (action.type) {
    case 'SHOW_INTERSTITIAL':
      return Object.assign({}, state, action.payload);
    case 'HIDE_INTERSTITIAL':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
