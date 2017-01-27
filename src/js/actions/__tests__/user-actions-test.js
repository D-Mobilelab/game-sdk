import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as userActions from '../user-actions';
import { USER_CHECK,
         USER_SET_LIKE,
         USER_GET_LIKE, 
         USER_DELETE_LIKE } from '../../lib/Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// This sets the mock adapter on the default instance
describe('async actions', () => { 
  beforeEach(() => {
    moxios.install();
  });  

  afterEach(() => {
    moxios.uninstall();
  });

  it('user.check action', () => {
    moxios.stubRequest(USER_CHECK, {
      status: 200,
      response: {
        user: "903833c2c35a11e589cb005056b60712",
        msisdn: "+12345678",
        logged: 1
      }
    });

    const store = mockStore({ 
      user: {},
      generic: {
        hybrid: false,
        connectionState: { online: true }
      }
    });

    const expectedActions = [
      { type: 'USER_CHECK_LOAD_START' },
      { type: 'USER_CHECK_LOAD_END' },
    ];      
    
    return store.dispatch(userActions.getUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });

  it('user favourites action', () => {
    moxios.stubRequest(USER_GET_LIKE, {
      status: 200,
      response: []
    });

    const store = mockStore({
      user: {
        logged: 0,
        favourites: [],
        user: '903833c2c35a11e589cb005056b60712',
      },
      generic: {
        hybrid: false,
        connectionState: { online: true }
      }
    });

    const expectedActions = [
      { type: 'GET_FAVOURITES_START' },
      { type: 'GET_FAVOURITES_END', favourites: [] }
    ];      

    return store.dispatch(userActions.getUserFavourites())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});
