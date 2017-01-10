import NewtonAdapter from 'newton-adapter';

export function init(){
    return (dispatch, getState) => {
        const currentState = getState();
        return NewtonAdapter.init({
            secretId: currentState.vhost.NEWTON_SECRETID,
            enable: true, // enable newton
            waitLogin: false,     // wait for login to have been completed (async)
            properties: {
                environment: (currentState.generic.hybrid ? 'hybrid' : 'webapp'),
                white_label_id: currentState.game_info.label || 'it-gameasy'
            }
        });
    }
}

export function login(){
    return (dispatch, getState) => {
        const currentState = getState();
        
        return NewtonAdapter.login({
            type: 'external',
            userId: currentState.user.user,
            userProperties: {},
            logged: "" // TODO: getUserType
        }).catch((reason) => Promise.resolve());
    }
}