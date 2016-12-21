export function generic(state = {
    hybrid: false,
    initialized: false,
    initPending: false,
    session_start_after_init: false,
    connectionState: { online: true, type: 'none' },
    initConfig: {
        lite: true,
        debug: false,
        moreGamesButtonStyle:{ top: '50%', left: '1%' }
    },
    isOnStartSessionRegistered: false,
    loadUserDataCalled: false
}, action){
    switch(action.type){
        case 'SET_IS_HYBRID':
            return Object.assign({}, state, { hybrid: action.hybrid });
        case 'INIT_START':
            let newInitConfig = {...state.initConfig, ...action.initConfig}
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
        case 'SHOW_MENU':
            let newMenuStateShow = { ...state.menu, show: true, style: action.style };
            return Object.assign({}, state, {menu: newMenuStateShow});
        case 'HIDE_MENU':
            let newMenuStateHide = {...state.menu, show: false};
            return Object.assign({}, state, {menu: newMenuStateHide});
        default:
            return state;
    }
}