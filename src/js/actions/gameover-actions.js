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

export function showEnterNameModal(options) {
  return {
    type: 'SHOW_ENTER_NAME',
    payload: { showReplayButton: options ? options.showReplayButton : false },
  };
}

export function hideEnterNameModal(userInput = false) {
  return {
    type: 'HIDE_ENTER_NAME',
    payload: { userInput },
  };
}

export function showLeaderboard() {
  return {
    type: 'SHOW_LEADERBOARD',
  };
}

export function hideLeaderboard(userInput = false) {
  return {
    type: 'HIDE_LEADERBOARD',
    payload: { userInput },
  };
}

export function redirectLanding(creativity = '') {
  return {
    type: 'REDIRECT_SUBSCRIBE',
    payload: creativity,
  };
}
