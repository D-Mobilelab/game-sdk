export function banner(state = {
  show: false,
  isLoading: false,
  installBannerClicked: false,
}, action) {
  switch (action.type) {
    case 'SHOW_BANNER':
      return Object.assign({}, state, { show: true });
    case 'HIDE_BANNER':
      return Object.assign({}, state, { show: false });
    case 'REDIRECT_ON_STORE':
      return Object.assign({}, state, { installBannerClicked: true });
    case 'SET_IS_LOADING':
      return Object.assign({}, state, { isLoading: action.payload.loading });
    default:
      return state;
  }
}
