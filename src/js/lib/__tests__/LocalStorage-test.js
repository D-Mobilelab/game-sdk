import { localStorage } from '../LocalStorage';

describe('#LocalStorage class', () => {
  beforeEach(() => {
    localStorage.storage = {};
  });

  it('should import the class', () => {
    localStorage.setItem('key', 1);
    expect(JSON.parse(localStorage.getItem('key'))).toEqual(1);
  });

  it('If unsupported should put it on memory', () => {
    localStorage.supported = false;
    expect(localStorage.supported).toEqual(false);

    localStorage.setItem('chiave', 1);
    expect(localStorage.storage).toEqual({ chiave: '1' });
    expect(localStorage.getItem('chiave')).toEqual('1');

    localStorage.clear();
    expect(localStorage.storage).toEqual({});
    localStorage.supported = true;
  });

  it('If unsupported should return null if key does not exists', () => {
    localStorage.supported = false;
    expect(localStorage.supported).toEqual(false);

    expect(localStorage.storage).toEqual({});
    expect(localStorage.getItem('notExists')).toBeNull();

    localStorage.clear();
    expect(localStorage.storage).toEqual({});
    localStorage.supported = true;
  });

  it('removeItem if unsupported', () => {
    localStorage.supported = false;
    expect(localStorage.supported).toEqual(false);
    localStorage.setItem('ciccio', { a: 1 });
    localStorage.removeItem('ciccio');

    expect(localStorage.storage).toEqual({});
    localStorage.supported = true;
  });

  it('test isSupported method when localStorage null', () => {
    const mockWindow = { localStorage: null };
    localStorage.isSupported(mockWindow);
    expect(localStorage.supported).toEqual(false);
  });

  it('test isSupported method when setItem throws error', () => {
    const mockWindow = {
      localStorage: {
        setItem() {
          throw new Error();
        },
      },
    };
    localStorage.isSupported(mockWindow);
    expect(localStorage.supported).toEqual(false);
  });
});
