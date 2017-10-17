const sessionStorageKey = 'sessionStorage';
const localStorageKey = 'localStorage';

class Storage {
  constructor(type) {
    this.type = type;
    this.storage = {};
    this.isSupported();
  }

  setItem(key, obj) {
    if (this.supported) {
      return window[this.type].setItem(key, obj);
    }
    this.storage[key] = obj.toString();
    return this.storage[key];
  }

  getItem(key) {
    if (this.supported) {
      return window[this.type].getItem(key);
    }
    return this.storage[key] ? this.storage[key] : null;
  }

  clear() {
    if (this.supported) {
      return window[this.type].clear();
    }
    this.storage = {};
    return this.storage;
  }

  removeItem(key) {
    if (this.supported) {
      window[this.type].removeItem(key);
    }
    delete this.storage[key];
  }

  isSupported() {
    const global = arguments[0] ? arguments[0] : window;
    try {
      if (!global[this.type]) {
        this.supported = false;
      }
      global[this.type].setItem('__test__', 1);
      global[this.type].getItem('__test__');
      global[this.type].removeItem('__test__');
      this.supported = true;
    } catch (e) {
      this.supported = false;
    }
    return this.supported;
  }
}

const localStorage = new Storage(localStorageKey);
const sessionStorage = new Storage(sessionStorageKey);
export default { localStorage, sessionStorage, Storage };
