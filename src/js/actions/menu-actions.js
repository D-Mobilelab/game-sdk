export function goToHome() {
  return {
    type: 'GO_TO_HOME',
  };
}

export function showMenu(style) {
  return {
    type: 'SHOW_MENU',
    style,
  };
}

export function setDownPosition(data) {
  return {
    type: 'SET_DOWN_POSITION',
    ...data,
  };
}

export function setUpPosition(data) {
  return {
    type: 'SET_UP_POSITION',
    ...data,
  };
}

export function setPosition(data) {
  return {
    type: 'SET_POSITION',
    ...data,
  };
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU',
  };
}
