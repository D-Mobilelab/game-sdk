export function game_over(state = {
  showLeaderboard: false,
  showEnterName: false,
  show: false,
  leaderboard: [],
}, action) {
  switch (action.type) {
    case 'SHOW_GAME_OVER':
      return Object.assign({}, state, { show: true });
    case 'HIDE_GAME_OVER':
      return Object.assign({}, state, { show: false });
    case 'SHOW_ENTER_NAME':
      return Object.assign({}, state, { showEnterName: true });
    case 'HIDE_ENTER_NAME':
      return Object.assign({}, state, { showEnterName: false });
    case 'SHOW_LEADERBOARD':
      return Object.assign({}, state, {
        showLeaderboard: true,
        showEnterName: false,
        leaderboard: action.payload.leaderboard,
      });
    case 'HIDE_LEADERBOARD':
      return Object.assign({}, state, {
        showLeaderboard: false,
      });
    default:
      return state;
  }
}
