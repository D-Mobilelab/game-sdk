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

export function showEnterNameModal(show) {
  return {
    type: 'SHOW_ENTER_NAME',
    payload: { show },
  };
}
