import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Menu } from '../Menu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Menu Component tests',function(){
  let store;
  beforeEach(() => {
    store = mockStore({
      show: false,
      style: { bottom: '2%', right: '2%' },
      active: false,
      pointerDownPosition: { x: 0, y: 0 },
      pointerUpPosition: { x: 0, y: 0 },
    });
  });

  it('should render in the correct way', function(){
    const wrapper = mount(
      <Provider store={store}>
        <Menu />
      </Provider>);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Menu).length).toEqual(1);
  });
});