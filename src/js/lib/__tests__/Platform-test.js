import platform from '../Platform';

describe('#Platform test', () => {
  const ios5UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
  const androidUA = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Mobile Safari/537.36';
  it('isAndroid', () => {
    expect(platform).toBeDefined();
    expect(platform.isAndroid(androidUA)).toEqual(true);
  });

  it('isAndroid should be equal false', () => {
    expect(platform).toBeDefined();
    expect(platform.isAndroid(ios5UA)).toEqual(false);
  });

  it('isIOS should be equal true', () => {
    expect(platform).toBeDefined();
    expect(platform.isIOS(ios5UA)).toEqual(true);
  });

  it('isIOS should be equal false', () => {
    expect(platform).toBeDefined();
    expect(platform.isIOS(androidUA)).toEqual(false);
  });
});
