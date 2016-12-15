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
        _props_.actions.saveUserData(userData);
    }
    
    loadUserData(callback){
        return _props_.actions.loadUserData(callback);
    }
    
    clearUserData(){
        _props_.actions.clearUserData();
    }
    
    showMoreGamesButton(){
        _props_.actions.showMenu();
    }
    
    hideMoreGamesButton(){
        _props_.actions.hideMenu();
    }

    getAvatar(){
        
    }

    getNickName(){

    }

    goToHome(){
       _props_.actions.goToHome();
    } 
}