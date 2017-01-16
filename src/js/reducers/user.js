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
        logged: false,
        favourites:[]
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
        case 'ADD_GAME_LIKE_START':
            return state;
        case 'ADD_GAME_LIKE_END':
            let newFavourites = [...state.favourites, action.payload];
            return Object.assign({}, state, {favourites: newFavourites});
        case 'ADD_GAME_LIKE_ERROR':
            return state;
        case 'REMOVE_GAME_LIKE_START':
            return state;
        case 'REMOVE_GAME_LIKE_END':
            let { id } = action.payload;
            let newFilteredFavourites = state.favourites.filter((favourite) => {
                if(favourite){
                    return favourite.id !== id;
                }
            });
            console.log(newFilteredFavourites);
            return Object.assign({}, state, {favourites: newFilteredFavourites});
        case 'REMOVE_GAME_LIKE_ERROR':
            return state;
        default:
            return state;
    }
}