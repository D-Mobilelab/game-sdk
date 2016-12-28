export function menu(state = { 
    show: false, 
    style:{ top:'50%', left:'1%' },
    active: false,
    pointerDownPosition: {x: 0, y: 0},
    pointerUpPosition: {x: 0, y: 0}
}, action){
    switch(action.type){
        case 'SHOW_MENU':
            let newMenuStateShow = { ...state, show: true};
            action.style ? newMenuStateShow['style'] = action.style : null;
            return Object.assign({}, state, {...newMenuStateShow});
        case 'HIDE_MENU':
            let newMenuStateHide = {...state, show: false};
            return Object.assign({}, state, {...newMenuStateHide});
        case 'SET_DOWN_POSITION':
            return Object.assign({}, state, { active: action.active, pointerDownPosition: action.position });
        case 'SET_UP_POSITION':
            return Object.assign({}, state, { active: action.active, pointerUpPosition: action.position });
        case 'SET_POSITION':
            let newStyle = {style:{left:`${(action.position.x - 30)}px`, top: `${(action.position.y - 15)}px`}};
            return Object.assign({}, state, newStyle);
        default:
            return state;
    }
}