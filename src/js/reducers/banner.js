export function banner(state = { show:false }, action){
    switch(action.type){
        case 'SHOW_BANNER':
            return Object.assign({}, state, {show: true});
        case 'HIDE_BANNER':
            return Object.assign({}, state, {show: false});
        default:
            return state;
    }
}