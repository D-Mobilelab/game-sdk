export class SDK {
    constructor(props){
        this.props = props;
    }

    init(initConfig){
        return this.props.actions.init(initConfig).then(() => {console.log("puppa after init");})
    }

    getConfig(){

    }

    showMoreGamesButton(){

    }

    hideMoreGamesButton(){

    }

    loadUserData(onLoadUserData){

    }

    saveUserData(userDataInfo){

    }

    clearUserData(){

    }

    goToHome(){

    }

    getAvatar(){

    }

    getNickname(){

    }

    onStartSession(onStartSessionCallback){

    }

    startSession(){

    }

    endSession(scoreAndLevel){

    }

}