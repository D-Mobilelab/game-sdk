class LocalStorage {

  constructor() {
    this._storage = {};
  }

  setItem(key, obj) {
    this._storage[key] = obj.toString();
  }

  getItem(key) {
    return this._storage[key];
  }

  clear() {
    this._storage = {};
  }

  removeItem(key) {
      delete this._storage[key];
  }
}

const localStorageInstance = window.localStorage || new LocalStorage();

export default localStorageInstance;
