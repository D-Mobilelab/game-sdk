export let initialState = {
    hybrid: false,
    initialized: false,
    initPending: false,
    session_start_after_init: false,
    connectionState: { online: true, type: 'none' },
    initConfig: {
        lite: true,
        moreGamesButtonStyle:{ top:'50%', left:'1%' }
    },
    isOnStartSessionRegistered: false,
    loadUserDataCalled: false,
    menu:{
        show: false,
        style:{ top:'50%', left:'1%' }
    }, 
    game_over:{
        show:false
    }
};