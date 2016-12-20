export let initialState = {
    hybrid: false,
    initialized: false,
    initPending: false,
    session_start_after_init: false,
    message: 'NO_INIT_CALLED',   
    gameInfo: {
        name:'',
        related:[]
    },
    user: {
        user: '',
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
    },
    vhost: {},
    connectionState: { online: true, type: 'none' },
    initConfig: {
        lite: true,
        moreGamesButtonStyle:{ top:'50%', left:'1%' }
    },
    currentSession: {
        opened:false
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