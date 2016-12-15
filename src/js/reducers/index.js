export function mainReducer(state = {}, action){
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
            return Object.assign({}, state, {user:{...state.user, error: action.reason} });
        case 'GET_FAVOURITES_START':
            return state;
        case 'GET_FAVOURITES_END':            
            return Object.assign({}, state, {user:{...state.user, favourites: action.favourites}});
        case 'GET_FAVOURITES_FAIL':
            return Object.assign({}, state, {user:{...state.user, fetch_error: action.reason }});
        case 'GAME_INFO_LOAD_START':
        case 'GAME_INFO_LOAD_END':            
            return Object.assign({}, state, {
                gameInfo: {...state.gameInfo, ...action.gameInfo},
                user: {...state.user, ...state.gameInfo.user}
            });
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
            };
            return Object.assign({}, state, { currentSession: newCurrentSession });
        case 'SHOW_GAME_OVER':
            return Object.assign({}, state, {game_over:{show: true}});
        case 'HIDE_GAME_OVER':
            return Object.assign({}, state, {game_over:{show: false}});
        case 'REGISTER_ON_START_SESSION_CALLBACK':
            return Object.assign({}, state, { isOnStartSessionRegistered: action.registered });
        case 'REGISTER_ON_USER_DATA_CALLBACK':
            return Object.assign({}, state, { loadUserDataCalled: action.loadUserDataCalled });         
        case 'MENU_SHOW':
            var newMenuState = {...state.menu, shown: true, style: action.style || state.menu.style};
            return Object.assign({}, state, {menu: newMenuState});
        case 'MENU_HIDE':
            var newMenuState = {...state.menu, shown: false};
            return Object.assign({}, state, {menu: newMenuState});
        case 'MENU_PRESSED':
            var newMenuState = {...state.menu, pressed: true};
            return Object.assign({}, state, {menu: newMenuState});
        case 'MENU_RELEASED':
            var newMenuState = {...state.menu, pressed: false};
            return Object.assign({}, state, {menu: newMenuState});
        case 'SET_RELATED':
            return Object.assign({}, state, {gameInfo:{...state.gameInfo, related: action.related }});
        default:
            return state;
    }
}