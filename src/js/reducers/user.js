export function user(state = {
        matchPlayed: 0,
        user: null,
        userData:{
            CreatedAt: new Date(0).toISOString(),
            UpdatedAt: new Date(0).toISOString(),
            ProductId: null,
            contentId: null,
            domain: null,
            Creator: null,
            _id: null,
            info: null
        },
        logged: false
    }, action){
    switch(action.type){
        case 'USER_CHECK_LOAD_START':
            return state;
        case 'USER_CHECK_LOAD_END':
            return Object.assign({}, state, { ...state, ...action.user });
        case 'USER_CHECK_LOAD_FAIL':
            return Object.assign({}, state, {...state, error: action.reason});
        case 'GAME_INFO_LOAD_END':
            return Object.assign({}, state, {...state, ...action.game_info.user});
        case 'GET_FAVOURITES_START':
            return state;
        case 'GET_FAVOURITES_END':
            return Object.assign({}, state, {...state, favourites: action.favourites });
        case 'GET_FAVOURITES_FAIL':
            return Object.assign({}, state, {...state, fetch_error: action.reason });
        case 'SET_CAN_PLAY':
            return Object.assign({}, state, {...state, canPlay: action.canPlay});
        case 'INCREASE_MATCH_PLAYED':
            return Object.assign({}, state, {...state, matchPlayed: state.matchPlayed += 1 });
        default:
            return state;
    }
}