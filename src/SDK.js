import { Actions } from './js/actions/index';

const privates = new WeakMap();
export class SDK {
    constructor(store){
        privates.set(this, {store: store});
    }

    init(initConfig){
        const {store} = privates.get(this);
        store.dispatch(Actions.init(initConfig));
    }

    getConfig(){

    }

    showMoreGamesButton(){
        const {store} = privates.get(this);
        store.dispatch(Actions.showMenu());
    }

    hideMoreGamesButton(){
        const {store} = privates.get(this);
        store.dispatch(Actions.hideMenu());
    }

    loadUserData(onLoadUserData){
        const {store} = privates.get(this);
        store.dispatch(Actions.loadUserData(onLoadUserData));
    }

    saveUserData(userDataInfo){
        const {store} = privates.get(this);
        store.dispatch(Actions.saveUserData(userDataInfo));
    }

    clearUserData(){
        const {store} = privates.get(this);
        store.dispatch(Actions.clearUserData());
    }

    goToHome(){
        const {store} = privates.get(this);
        store.dispatch(Actions.goToHome());
    }

    getAvatar(){

    }

    getNickname(){

    }

    onStartSession(onStartSessionCallback){
        const {store} = privates.get(this);
        store.dispatch(Actions.registerOnStartCallback(onStartSessionCallback));
    }

    startSession(){
        const {store} = privates.get(this);
        store.dispatch(Actions.startSession());
    }

    endSession(scoreAndLevel){
        const {store} = privates.get(this);
        store.dispatch(Actions.endSession(scoreAndLevel));
    }

}
