export default function generic(state = {
  label: '',
  error: null,
  hybrid: false,
  platformInfo: {
    android: false,
    ios: false,
  },
  connectionState: { online: true, type: 'none' },
  initialized: false,
  initPending: false,
  initializedNewton: false,
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
    WEBAPP_REPLAY: 'Replay',
    WEBAPP_GAMEOVER_GUEST_FAVS: '',
    WEBAPP_GAMEOVER_GUEST_FAVS_SIGNIN: '',
    WEBAPP_HYBRIDINSTALL_TXT: 'get the native app',
    WEBAPP_HYBRIDINSTALL_APPINFO: 'Get the app to increase your Game Experience!',
    WEBAPP_HYBRIDINSTALL_APPINFOSMALL: '...and play OFFLINE',
    WEBAPP_BANNER_BUTTON: 'get the app',
    WEBAPP_CHALLENGE_INVITE: '',
    WEBAPP_SHARE_FACEBOOK: 'Share',
    WEBAPP_GAME_OVER: 'Gameover',
    GFSDK_MENU_START_GAME: 'start game',
    GFSDK_MENU_HOME_PAGE: 'home page',
    GFSDK_MENU_ACCOUNT: 'account',
    GFSDK_MENU_ZOOM_PAGE: 'zoom page',
  },
  focus: true,
}, action) {
  switch (action.type) {
    case 'SET_IS_HYBRID':
      return Object.assign({}, state, { hybrid: action.hybrid });
    case 'SET_LABEL':
      return Object.assign({}, state, { label: action.label });
    case 'INIT_START':
      return Object.assign({}, state, { initConfig: action.initConfig, initPending: action.initPending });
    case 'INIT_ERROR':
      return Object.assign({}, state, { error: action.reason });
    case 'INIT_NEWTON':
      return Object.assign({}, state, { initializedNewton: action.initializedNewton });
    case 'INIT_FINISHED':
      return Object.assign({}, state, { message: action.message, initialized: action.initialized, initPending: action.initPending });
    case 'ADD_TO_AFTER_INIT':
      return Object.assign({}, state, { session_start_after_init: action.session_start_after_init });
    case 'REGISTER_ON_START_SESSION_CALLBACK':
      return Object.assign({}, state, { isOnStartSessionRegistered: action.registered });
    case 'REGISTER_ON_USER_DATA_CALLBACK':
      return Object.assign({}, state, { loadUserDataCalled: action.loadUserDataCalled });
    case 'DICTIONARY_LOAD_END':
      return Object.assign({}, state, { dictionary: action.payload });
    case 'FOCUS_CHANGE':
      return Object.assign({}, state, { focus: action.payload.focus });
    case 'PLATFORM_INFO':
      return Object.assign({}, state, { platformInfo: action.payload });
    case 'REDIRECT_SUBSCRIBE':
      return Object.assign({}, state, { creativity: action.payload.creativity });
    default:
      return state;
  }
}
