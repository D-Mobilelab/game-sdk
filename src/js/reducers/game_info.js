export function game_info(state = {
        name:'',
        related:[]
    }, action){
    switch(action.type){
        case 'GAME_INFO_LOAD_START':
            return state;
        case 'GAME_INFO_LOAD_END':            
            return Object.assign({}, state, {
                ...state.game_info, ...action.game_info,
            });
        case 'GAME_INFO_LOAD_FAIL':
            return Object.assign({}, state, {game_info: action.error});
        case 'SET_RELATED':
            return Object.assign({}, state, {game_info:{...state.game_info, related: action.related }});
        default:
            return state;
    }
}