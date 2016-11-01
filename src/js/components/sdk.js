let _props_;
export class SDK{
    constructor(props){
        _props_ = props;
    }
    
    init(initConfig){
        _props_.actions.init(initConfig);
    }
    
    getConfig(){
        return _props_.user;
    }
    
    onStartSession(onStartCallback){
        _props_.actions.registerOnStartCallback(onStartCallback);
    }
    
    startSession(){
        _props_.actions.startSession();
    }
    
    endSession(scoreAndLevel){
        _props_.actions.endSession(scoreAndLevel);
    }
    
    saveUserData(userData){
        
    }
    
    loadUserData(callback){

    }
    
    clearUserData(){

    }
    
    showMoreGamesButton(){

    }
    
    hideMoreGamesButton(){

    }

    getAvatar(){

    }

    getNickName(){

    }

    goToHome(){

    } 
}