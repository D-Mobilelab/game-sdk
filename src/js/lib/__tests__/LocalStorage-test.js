import LocalStorageClass from '../LocalStorage';

describe('#LocalStorage class', function () {
  beforeEach(function () {
    LocalStorageClass.storage = {};
  });

  it('should import the class', function () {
    LocalStorageClass.setItem('key', 1);
    expect(JSON.parse(LocalStorageClass.getItem('key'))).toEqual(1);
  });

  it('If unsupported should put it on memory', function () {
    LocalStorageClass.supported = false;
    expect(LocalStorageClass.supported).toEqual(false);

    LocalStorageClass.setItem('chiave', 1);
    expect(LocalStorageClass.storage).toEqual({ 'chiave': '1' });
    expect(LocalStorageClass.getItem('chiave')).toEqual('1');

    LocalStorageClass.clear();
    expect(LocalStorageClass.storage).toEqual({});
    LocalStorageClass.supported = true;
  });

  it('If unsupported should return null if key does not exists', function () {
    LocalStorageClass.supported = false;
    expect(LocalStorageClass.supported).toEqual(false);

    expect(LocalStorageClass.storage).toEqual({});
    expect(LocalStorageClass.getItem('notExists')).toBeNull();

    LocalStorageClass.clear();
    expect(LocalStorageClass.storage).toEqual({});
    LocalStorageClass.supported = true;
  });

  it('removeItem if unsupported', function () {
    LocalStorageClass.supported = false;
    expect(LocalStorageClass.supported).toEqual(false);
    LocalStorageClass.setItem('ciccio', { a: 1 });
    LocalStorageClass.removeItem('ciccio');

    expect(LocalStorageClass.storage).toEqual({});
    LocalStorageClass.supported = true;
  });

  it('test isSupported method when localStorage null', function () {
    const mockWindow = { localStorage: null };
    LocalStorageClass.isSupported(mockWindow);
    expect(LocalStorageClass.supported).toEqual(false);
  });

  it('test isSupported method when setItem throws error', function () {
    const mockWindow = {
      localStorage: {
        setItem: function () {
          throw new Error();
        }
      }
    };
    LocalStorageClass.isSupported(mockWindow);
    expect(LocalStorageClass.supported).toEqual(false);
  });
});
