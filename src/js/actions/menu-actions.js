import Stargate from 'stargatejs';
import Location from '../lib/Location';

export function goToHome() {
  return (dispatch, getState) => {
    const { generic } = getState();
    if (generic.hybrid) {
      if (window.webview) {
        window.webview.Close();
      } else {
        Stargate.goToLocalIndex();
      }
    } else {
      window.location.href = Location.getOrigin();
    }
    dispatch({ type: 'GO_TO_HOME' });
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

export function setDrag(isDragging) {
  return {
    type: 'SET_DRAG',
    payload: { drag: isDragging },
  };
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU',
  };
}
