export function mainReducer(state = {}, action){
    switch(action.type){
        case 'SET_IS_HYBRID':
            return Object.assign({}, state, { hybrid: action.hybrid });
        case 'INIT_START':
            return Object.assign({}, state, { initConfig: action.initConfig, initPending: action.initPending });
        case 'INIT_ERROR':
            return Object.assign({}, state, { error: action.reason });
        case 'INIT_FINISHED':
            return Object.assign({}, state, { message: action.message, initialized: action.initialized, initPending: action.initPending });
        case 'VHOST_LOAD_START':
            return state;
        case 'VHOST_LOAD_END':
            return Object.assign({}, state, { vhost: action.vhost });
        case 'VHOST_LOAD_FAIL':
            return state;
        case 'USER_CHECK_LOAD_START':
            return state;
        case 'USER_CHECK_LOAD_END':
            return Object.assign({}, state, { user: action.user });
        case 'USER_CHECK_LOAD_FAIL':
            return Object.assign({}, state.user, { error: action.reason });
        case 'GET_FAVOURITES_START':
            return state;
        case 'GET_FAVOURITES_END':            
            return Object.assign({}, state, {user:{...state.user, favourites: action.favourites}});
        case 'GET_FAVOURITES_FAIL':
            return Object.assign({}, state, {user:{...state.user, fetch_error: action.reason }});
        case 'GAME_INFO_LOAD_START':         
        case 'GAME_INFO_LOAD_END':
            return Object.assign({}, state, {gameInfo: action.gameInfo});          
        case 'GAME_INFO_LOAD_FAIL':
            return Object.assign({}, state, {gameInfo: action.error});
        case 'SET_CAN_PLAY':
            return Object.assign({}, state, {user: {...state.user, canPlay: action.canPlay} });
        case 'ADD_TO_AFTER_INIT':
            return Object.assign({}, state, {session_start_after_init: action.session_start_after_init});
        case 'START_SESSION':
            return Object.assign({}, state, { currentSession: action.currentSession });
        case 'END_SESSION':
            let newCurrentSession = {
                startTime: state.currentSession.startTime,
                ...action.session
            }
            return Object.assign({}, state, { currentSession: newCurrentSession });            
        case 'REGISTER_ON_START_SESSION_CALLBACK':
            return Object.assign({}, state, { isOnStartSessionRegistered: action.registered });
        default:
            return state;
    }
}