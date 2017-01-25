export function generic(state = {
  error: null,
  hybrid: false,
  connectionState: { online: true, type: 'none' },
  initialized: false,
  initPending: false,
  session_start_after_init: false,
  initConfig: {
    lite: true,
    debug: false,
  },
  isOnStartSessionRegistered: false,
  loadUserDataCalled: false,
  actions_after_init: [],
  dictionary: {
    WEBAPP_CONGRATULATIONS_SCORE: 'Your score is',
    WEBAPP_YOUR_POSITION_TITLE: 'Rank',
    WEBAPP_CANVAS_BUTTON_PLAY: 'Play',
    WEBAPP_RELATED_TITLE: 'Related',
    PLAY: 'Replay',
    WEBAPP_GAMEOVER_GUEST_FAVS: '',
    WEBAPP_GAMEOVER_GUEST_FAVS_SIGNIN: '',
    WEBAPP_HYBRIDINSTALL_TXT: 'get the native app',
    WEBAPP_HYBRIDINSTALL_APPINFO: 'Get the app to increase your Game Experience!',
    WEBAPP_HYBRIDINSTALL_APPINFOSMALL: '...and play OFFLINE',
    WEBAPP_BANNER_BUTTON: 'get the app',
  },
}, action) {
  switch (action.type) {
    case 'SET_IS_HYBRID':
      return Object.assign({}, state, { hybrid: action.hybrid });
    case 'INIT_START':
      const newInitConfig = { ...state.initConfig, ...action.initConfig };
      return Object.assign({}, state, { initConfig: newInitConfig, initPending: action.initPending });
    case 'INIT_ERROR':
      return Object.assign({}, state, { error: action.reason });
    case 'INIT_FINISHED':
      return Object.assign({}, state, { message: action.message, initialized: action.initialized, initPending: action.initPending });
    case 'ADD_TO_AFTER_INIT':
      return Object.assign({}, state, { session_start_after_init: action.session_start_after_init });
    case 'REGISTER_ON_START_SESSION_CALLBACK':
      return Object.assign({}, state, { isOnStartSessionRegistered: action.registered });
    case 'REGISTER_ON_USER_DATA_CALLBACK':
      return Object.assign({}, state, { loadUserDataCalled: action.loadUserDataCalled });
    case 'SET_CONNECTION_STATE':
      const online = action.connectionState.type === 'online';
      return Object.assign({}, state, { connectionState: { online, type: action.connectionState.networkState } });
    case 'DICTIONARY_LOAD_END':
      const dictionary = { ...state.dictionary, ...action.payload };
      return Object.assign({}, state, { dictionary });
    default:
      return state;
  }
}
