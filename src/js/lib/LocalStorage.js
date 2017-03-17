export class LocalStorage {

  constructor() {
    this.storage = {};
    this.isSupported();
  }

  setItem(key, obj) {
    if (this.supported) {
      return window.localStorage.setItem(key, obj);
    }
    return this.storage[key] = obj.toString();
  }

  getItem(key) {
    if (this.supported) {
      return window.localStorage.getItem(key);
    }
    return this.storage[key];
  }

  clear() {
    if (this.supported) {
      return window.localStorage.clear();
    }
    this.storage = {};
    return this.storage;
  }

  removeItem(key) {
    if (this.supported) {
      window.localStorage.removeItem(key);
    }
    delete this.storage[key];
  }

  isSupported() {
    const global = arguments[0] ? arguments[0] : window;  
    try {
      if (!global.localStorage) {
        this.supported = false;      
      }
      global.localStorage.setItem('__test__', 1);
      global.localStorage.getItem('__test__');
      global.localStorage.removeItem('__test__');
      this.supported = true;
    } catch (e) {
      this.supported = false;    
    }
    return this.supported;
  }
}

const localStorageInstance = new LocalStorage();
export default localStorageInstance;
