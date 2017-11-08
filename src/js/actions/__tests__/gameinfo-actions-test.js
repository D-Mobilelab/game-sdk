import configureMockStore from 'redux-mock-store';
import { dequeryfy } from 'docomo-utils';
import Moxios from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as actions from '../gameinfo-actions';
import * as utils from '../utils';
import { AxiosInstance } from '../../lib/AxiosService';

const mockios = new Moxios(AxiosInstance);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions', () => {
  afterEach(() => {
    mockios.reset();
    mockios.restore();
  });

  beforeEach(() => {

  });

  it('Test getGameInfo action', () => {
    // mock inside the module
    utils.getContentId = _ => '12312';
    const toRetain = ['country', 'fw', 'lang', 'real_customer_id', 'vh', 'white_label'];
    const params = '?content_id=:ID&formats=:FORMATS&sort=-born_date&category=:CATEGORY&publisher=:PUBLISHER&size=:SIZE&offset=:OFFSET&label=:LABEL&label_slug=:LABEL_SLUG&access_type=:ACCESS_TYPE&real_customer_id=ia_bandainamco&lang=it&use_cs_id=&white_label=it_bandai&main_domain=http://www.bandainamcoent.fun/it/&country=it&fw=gameasy&vh=it.www.bandainamcoent.fun&check_compatibility_header=:CHECK_OTA&bl=:BLACKLIST&user_type=:USER_TYPE';
    const query = dequeryfy(params);
    const filterQuery = Object.keys(query)
      .filter(key => toRetain.includes(key))
      .reduce((obj, key) => {
        obj[key] = query[key]; // eslint-disable-line no-param-reassign
        return obj;
      }, {});

    const endPoint = 'http://resources.buongiorno.com/lapis/apps/contents.getList';
    const store = mockStore({
      game_info: {
        title: '',
        name: '',
        images: {
          cover: {
            ratio_1: '',
            ratio_1_5: '',
            ratio_2: '',
          },
        },
        related: [],
      },
      vhost: { MOA_API_CONTENTS_GAMEINFO: `${endPoint}${params}` },
    });

    mockios.onGet(endPoint, { params: { content_id: utils.getContentId(), ...filterQuery } })
      .reply((config) => {
        // `config` is the axios config and contains things like the url
        // return an array in the form of [status, data, headers]
        return [200, { id: utils.getContentId(), title: 'MiniMappy' }];
      });

    const expectedActions = [
      { type: 'GAME_INFO_LOAD_START' },
      { type: 'GAME_INFO_LOAD_END', game_info: { title: 'MiniMappy', id: utils.getContentId(), content_id: utils.getContentId() } },
    ];

    return store.dispatch(actions.getGameInfo()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
