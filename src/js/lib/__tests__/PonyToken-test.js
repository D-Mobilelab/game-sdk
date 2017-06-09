import Cookies from 'js-cookie';

import MockAdapter from 'axios-mock-adapter';
/**
 * Use rewire to mock dependencies inside a module (exclude this babel plugin when build for production)
 * https://github.com/speedskater/babel-plugin-rewire
 * **/
import { generatePony, setFingerPrint, __RewireAPI__ as PonyTokenRewire } from '../PonyToken';
import FakeConfig from './FakeConfig';
import { AxiosInstance } from '../AxiosService';

describe('PonyToken tests', function() {

  const createponyResponse = {
    ponyUrl: '&_PONY=12-1776e43daf199f3a0f5360616b969517999999END'
  };

  let mock;

  beforeEach(function() {
    mock = new MockAdapter(AxiosInstance);
    mock.onGet(FakeConfig.MOA_API_CREATEPONY)
        .reply(200, createponyResponse);
    const cookieList = FakeConfig.MFP_COOKIE_LIST.split(',');
    cookieList.forEach((value) => {
      Cookies.set(value, `mocked-${value}`);
    });
    mock.onGet(FakeConfig.MOA_API_CREATEPONY).reply(200, createponyResponse);
  });

  afterEach(function(){
    mock.restore();
    mock.reset();
    PonyTokenRewire.__ResetDependency__('JSONPRequest');
  });

  it('generatePony test', function (done) {
    PonyTokenRewire.__Rewire__('JSONPRequest', function(url) {      
      let prom = Promise.resolve(url);
      return {
        prom,
      };
    });

    generatePony(FakeConfig, { return_url: 'http://www.gameasy.com' })
      .then((pony) => {
        expect(pony).toEqual(createponyResponse.ponyUrl.replace('&',''));
        done();
      }).catch(done.fail);
  });

  it('setFingerprint test', function (done) {
    const spyJSONPRequest = jasmine.createSpy('spy');

    PonyTokenRewire.__Rewire__('JSONPRequest', function(url){
      spyJSONPRequest(url);
      let prom = Promise.resolve(url);
      return {
        prom,
      };
    });

    setFingerPrint(FakeConfig, '_PONY_1234567890END', 'http://www.gameasy.com')
      .then((result) => {
        expect(spyJSONPRequest).toHaveBeenCalled();
        expect(spyJSONPRequest).toHaveBeenCalledTimes(1);
        expect(result).toContain(FakeConfig.MFP_API_URL);
        done();
      }).catch(done.fail);
  });
});
