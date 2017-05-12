import Location from '../lib/Location';

export function goToHome() {
  return (dispatch, getState) => {
    const { generic } = getState();
    if (process.env.APP_ENV === 'HYBRID') {
      if (window.webview) {
        window.webview.Close();
      } else {
        /**
         * TODO: go to local index to be implemented
         */
        console.warn("Go to local index to be implemented");
        // Stargate.goToLocalIndex();
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
