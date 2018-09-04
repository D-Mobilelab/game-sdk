import Location from '../lib/Location';

export function menuGoToHome() {
  return (dispatch) => {
    // If I'm in iframe...
    if (window !== window.top) {
      window.parent.postMessage('GO_TO_HOME', '*');
    }
    setTimeout(function(){
      window.location.href = Location.getOrigin();
    },1500);
    dispatch({ type: 'MENU_GO_TO_HOME' });
  };
}

export function replay() {
  return (dispatch) => {
    dispatch({ type: 'MENU_REPLAY' });
  };
}

export function goToAccount() {
  return (dispatch, getState) => {
    const { vhost } = getState();
    // If I'm in iframe...
    if (window !== window.top) {
      window.parent.postMessage('GO_TO_ACCOUNT', '*');
    }
    dispatch({ type: 'GO_TO_ACCOUNT' });
    setTimeout(() => {
      window.location.href = vhost['URLMGR_SETTINGS-LINK'];
    }, 1500);
  };
}

export function goToZoom() {
  return (dispatch, getState) => {
    const { game_info } = getState();
    // If I'm in iframe...
    if (window !== window.top) {
      window.parent.postMessage('GO_TO_ZOOM', '*');
    }
    dispatch({ type: 'GO_TO_ZOOM' });
    setTimeout(() => {
      window.location.href = game_info.url_zoom;
    }, 1500);
  };
}


export function showMenuList() {
  return {
    type: 'SHOW_MENU_LIST',
  };
}

export function hideMenuList() {
  return {
    type: 'HIDE_MENU_LIST',
  };
}

export function showButtons() {
  return {
    type: 'SHOW_MENU_LIST_BUTTONS',
  };
}

export function hideButtons() {
  return {
    type: 'HIDE_MENU_LIST_BUTTONS',
  };
}

export function toggleButtons() {
  return {
    type: 'TOGGLE_MENU_LIST_BUTTONS',
  };
}
