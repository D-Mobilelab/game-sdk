export default function gameOverBandai(state = {
  error: null,
  showLeaderboard: false,
  showEnterName: false,
  leaderboard: [],
  loading: false,
  showReplayButton: false,
}, action) {
  switch (action.type) {
    case 'SHOW_ENTER_NAME':
      return Object.assign({}, state, { showEnterName: true, showReplayButton: action.payload.showReplayButton });
    case 'HIDE_ENTER_NAME':
      return Object.assign({}, state, { showEnterName: false });
    case 'SHOW_LEADERBOARD':
      return Object.assign({}, state, {
        showLeaderboard: true,
      });
    case 'REGISTER_SCORE_START':
      return Object.assign({}, state, {
        loading: true,
      });
    case 'REGISTER_SCORE_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        leaderboard: action.payload.leaderboard,
      });
    case 'REGISTER_SCORE_FAIL':
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
      });
    case 'HIDE_LEADERBOARD':
      return Object.assign({}, state, {
        showLeaderboard: false,
      });
    default:
      return state;
  }
}
