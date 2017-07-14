export function game_over(state = {
    enterNameShow: false,
    show: false,
}, action) {
    switch(action.type) {
        case 'SHOW_GAME_OVER':
            return Object.assign({}, state, { show: true });
        case 'HIDE_GAME_OVER':
            return Object.assign({}, state, { show: false });
        case 'SHOW_ENTER_NAME':
            return Object.assign({}, state, { enterNameShow: action.payload.show });
        default:
            return state;
    }
}
