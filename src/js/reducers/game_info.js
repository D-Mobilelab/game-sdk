export function game_info(state = {
  title: '',
  name: '',
  images: {
    cover: {
      ratio_1: '',
      ratio_1_5: '',
      ratio_2: '',
    },
  },
  related: [],
}, action) {
  switch (action.type) {
    case 'GAME_INFO_LOAD_START':
      return state;
    case 'GAME_INFO_LOAD_END':
      return Object.assign({}, state, action.game_info);
    case 'GAME_INFO_LOAD_FAIL':
      return Object.assign({}, state, { ...state, error: action.error });
    case 'SET_RELATED':
      return Object.assign({}, state, { ...state, related: action.related });
    case 'ADD_MISSING_GAME_INFO':
      return Object.assign({}, state, action.gameInfo);
    default:
      return state;
  }
}
