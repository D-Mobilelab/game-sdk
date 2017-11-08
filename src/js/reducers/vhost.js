export default function vhost(state = { loaded: false, isFetching: false, error: null }, action) {
  switch (action.type) {
    case 'VHOST_LOAD_START':
      return Object.assign({}, state, { isFetching: true });
    case 'VHOST_LOAD_END':
      return Object.assign({}, state, { ...action.vhost, loaded: true, isFetching: false });
    case 'VHOST_LOAD_FAIL':
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  }
}
