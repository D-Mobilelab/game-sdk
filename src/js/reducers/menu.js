export function menu(state = { show: false, style:{ top:'50%', left:'1%' } }, action){
    switch(action.type){
        case 'SHOW_MENU':
            let newMenuStateShow = { ...state, show: true, style: action.style };
            return Object.assign({}, state, {...newMenuStateShow});
        case 'HIDE_MENU':
            let newMenuStateHide = {...state, show: false};
            return Object.assign({}, state, {...newMenuStateHide});
        default:
            return state;
    }
}