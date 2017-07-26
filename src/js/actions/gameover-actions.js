export function showGameOver() {
  return {
    type: 'SHOW_GAME_OVER',
  };
}

export function hideGameOver() {
  return {
    type: 'HIDE_GAME_OVER',
  };
}

export function showEnterNameModal() {
  return {
    type: 'SHOW_ENTER_NAME',
  };
}

export function hideEnterNameModal() {
  return {
    type: 'HIDE_ENTER_NAME',
  };
}

export function showLeaderboard({ leaderboard }) {
  return {
    type: 'SHOW_LEADERBOARD',
    payload: {
      leaderboard,
    },
  };
}

export function hideLeaderboard() {
  return {
    type: 'HIDE_LEADERBOARD',
  };
}
