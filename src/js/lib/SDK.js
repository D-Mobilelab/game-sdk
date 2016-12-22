let storeProtected;

export class SDK {
    constructor(props){
        this.props = props;
    }

    init(initConfig){
        return this.props.actions.init(initConfig);
    }

    getConfig(){

    }

    showMoreGamesButton(){
        return this.props.actions.showMenu();
    }

    hideMoreGamesButton(){
        return this.props.actions.hideMenu();
    }

    loadUserData(onLoadUserData){
        return this.props.actions.loadUserData(onLoadUserData);
    }

    saveUserData(userDataInfo){
        return this.props.action.saveUserData(userDataInfo);
    }

    clearUserData(){
        return this.props.action.clearUserData();
    }

    goToHome(){
        return this.props.action.goToHome()
    }

    getAvatar(){

    }

    getNickname(){

    }

    onStartSession(onStartSessionCallback){

    }

    startSession(){
        return this.props.actions.startSession();
    }

    endSession(scoreAndLevel){
        return this.props.actions.endSession(scoreAndLevel);
    }

}