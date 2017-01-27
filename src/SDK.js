import { Actions } from './js/actions/index';

const privates = new WeakMap();
export class SDK {
  constructor(store) {
    privates.set(this, { store });
  }

  init(initConfig) {
    const { store } = privates.get(this);
    store.dispatch(Actions.init(initConfig));
  }

  getConfig() {
    const { store } = privates.get(this);
    return store.getState();
  }

  getLevel() {

  }

  showMoreGamesButton() {
    const { store } = privates.get(this);
    store.dispatch(Actions.showMenu());
  }

  hideMoreGamesButton() {
    const { store } = privates.get(this);
    store.dispatch(Actions.hideMenu());
  }

  loadUserData(onLoadUserData) {
    const { store } = privates.get(this);
    store.dispatch(Actions.loadUserData(onLoadUserData));
  }

  saveUserData(userDataInfo) {
    console.log(Actions);
    const { store } = privates.get(this);
    store.dispatch(Actions.saveUserData(userDataInfo));
  }

  clearUserData() {
      const { store } = privates.get(this);
      store.dispatch(Actions.clearUserData());
    }

  goToHome() {
      const { store } = privates.get(this);
      store.dispatch(Actions.goToHome());
    }

  getAvatar() {
      const { store } = privates.get(this);
      const { user } = store.getState();
      return {
        src: user.avatar || '',
        name: user.nickname || '',
      };
  }

  getNickname() {
      const { store } = privates.get(this);
      const { user } = store.getState();
      return user.nickname;
  }

  onStartSession(onStartSessionCallback) {
    const { store } = privates.get(this);
    store.dispatch(Actions.registerOnStartCallback(onStartSessionCallback));
  }

  startSession() {
    const { store } = privates.get(this);
    store.dispatch(Actions.startSession());
  }

  endSession(scoreAndLevel) {
    const { store } = privates.get(this);
    store.dispatch(Actions.endSession(scoreAndLevel));
  }
}
