export default function banner(state = {
  show: false,
  isLoading: false,
  installBannerClicked: false,
  version: 0,
}, action) {
  switch (action.type) {
    case 'SHOW_BANNER':
      return Object.assign({}, state, { show: true, version: action.version });
    case 'HIDE_BANNER':
      return Object.assign({}, state, { show: false, isLoading: action.payload.loading });
    case 'REDIRECT_ON_STORE':
      return Object.assign({}, state, { installBannerClicked: true });
    case 'SET_IS_LOADING':
      return Object.assign({}, state, { isLoading: action.payload.loading });
    default:
      return state;
  }
}
