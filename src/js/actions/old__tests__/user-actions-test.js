import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../user-actions';
import { USER_CHECK,
  USER_SET_LIKE,
  USER_GET_LIKE,
  USER_DELETE_LIKE } from '../../lib/Constants';

require('jasmine-ajax');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should get the favourites when 200', (done) => {
    const poggioId = '903833c2c35a11e589cb005056b60712';
    const url = `${USER_GET_LIKE}?user_id=${poggioId}&size=51`;

    jasmine.Ajax.stubRequest(url).andReturn({
      status: 200,
      contentType: 'text/plain',
      responseText: '[]',
      response: [],
    });

    const store = mockStore({
      user: {
        logged: 1,
        favourites: [],
        user: poggioId,
      },
      generic: {
        hybrid: false,
        connectionState: { online: true },
      },
    });

    const expectedActions = [
      { type: 'GET_FAVOURITES_START' },
      { type: 'GET_FAVOURITES_END', favourites: [] },
    ];

    store.dispatch(userActions.getUserFavourites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('should get the favourites when 404', (done) => {
    const poggioId = '903833c2c35a11e589cb005056b60712';
    const url = `${USER_GET_LIKE}?user_id=${poggioId}&size=51`;

    jasmine.Ajax.stubRequest(url).andReturn({
      status: 404,
      contentType: 'text/plain',
      responseText: '[]',
      response: [],
    });

    const store = mockStore({
      user: {
        logged: 1,
        favourites: [],
        user: poggioId,
      },
      generic: {
        hybrid: false,
        connectionState: { online: true },
      },
    });

    const expectedActions = [
      { type: 'GET_FAVOURITES_START' },
      { type: 'GET_FAVOURITES_END', favourites: [] },
    ];

    store.dispatch(userActions.getUserFavourites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
