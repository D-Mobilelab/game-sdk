export function generic(state = {
    hybrid: false,
    connectionState: { online: true, type: 'none' },
    initialized: false,
    initPending: false,
    session_start_after_init: false,
    initConfig: {
        lite: true,
        debug: false
    },
    isOnStartSessionRegistered: false,
    loadUserDataCalled: false,
    actions_after_init:[]
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
        case 'SET_CONNECTION_STATE':
            let online = action.connectionState.type === 'online' ? true : false;
            return Object.assign({}, state, { connectionState: { online: online, type: action.connectionState.networkState} });
        default:
            return state;
    }
}