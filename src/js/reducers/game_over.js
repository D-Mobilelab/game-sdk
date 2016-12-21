/*        */
export function game_over(state = { show:false }, action){
    switch(action.type){
        case 'SHOW_GAME_OVER':
            return Object.assign({}, state, {show: true}});
        case 'HIDE_GAME_OVER':
            return Object.assign({}, state, {show: false});
        default:
            return state;
    }
}