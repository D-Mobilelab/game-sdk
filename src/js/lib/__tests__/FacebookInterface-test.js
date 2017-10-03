import { FacebookInterface } from '../FacebookInterface';
/* eslint-env jest */
describe('#FacebookInterface test', () => {
  let instance;
  beforeAll(() => {
    const script = document.createElement('script');
    script.id = 'fake';
    document.head.appendChild(script);
  });

  beforeEach(() => {
    instance = new FacebookInterface();
  });

  it('#FacebookInterface.init', () => {
    expect(instance).toBeDefined();
    const spy = jest.spyOn(instance, 'downloadSDK');
    instance.init({ fbAppId: '123456778', enableTracking: true });
    expect(spy).toHaveBeenCalled();
  });
});
