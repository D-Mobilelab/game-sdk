import LocalStorageClass from '../LocalStorage';

describe('#LocalStorage class', () => {
  beforeEach(() => {
    LocalStorageClass.storage = {};
  });

  it('should import the class', () => {
    LocalStorageClass.setItem('key', 1);
    expect(JSON.parse(LocalStorageClass.getItem('key'))).toEqual(1);
  });

  it('If unsupported should put it on memory', () => {
    LocalStorageClass.supported = false;
    expect(LocalStorageClass.supported).toEqual(false);

    LocalStorageClass.setItem('chiave', 1);
    expect(LocalStorageClass.storage).toEqual({ chiave: '1' });
    expect(LocalStorageClass.getItem('chiave')).toEqual('1');

    LocalStorageClass.clear();
    expect(LocalStorageClass.storage).toEqual({});
    LocalStorageClass.supported = true;
  });

  it('If unsupported should return null if key does not exists', () => {
    LocalStorageClass.supported = false;
    expect(LocalStorageClass.supported).toEqual(false);

    expect(LocalStorageClass.storage).toEqual({});
    expect(LocalStorageClass.getItem('notExists')).toBeNull();

    LocalStorageClass.clear();
    expect(LocalStorageClass.storage).toEqual({});
    LocalStorageClass.supported = true;
  });

  it('removeItem if unsupported', () => {
    LocalStorageClass.supported = false;
    expect(LocalStorageClass.supported).toEqual(false);
    LocalStorageClass.setItem('ciccio', { a: 1 });
    LocalStorageClass.removeItem('ciccio');

    expect(LocalStorageClass.storage).toEqual({});
    LocalStorageClass.supported = true;
  });

  it('test isSupported method when localStorage null', () => {
    const mockWindow = { localStorage: null };
    LocalStorageClass.isSupported(mockWindow);
    expect(LocalStorageClass.supported).toEqual(false);
  });

  it('test isSupported method when setItem throws error', () => {
    const mockWindow = {
      localStorage: {
        setItem() {
          throw new Error();
        },
      },
    };
    LocalStorageClass.isSupported(mockWindow);
    expect(LocalStorageClass.supported).toEqual(false);
  });
});
