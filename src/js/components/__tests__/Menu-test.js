import React from 'react';
import { shallow, mount, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Menu } from '../Menu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Menu Component tests',function(){
  let store;
  beforeEach(() => {
    store = mockStore({
      show: false,
      active: false,
      drag: false,
      style: { bottom: '2%', right: '2%' },
      pointerDownPosition: { x: 0, y: 0 },
      pointerUpPosition: { x: 0, y: 0 },
    });
  });

  it('should render in the correct way', function(){
    spyOn(Menu.prototype, 'componentDidMount');
    const wrapper = mount(
      <Menu />
    );
    expect(Menu.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Menu).length).toEqual(1);
  });
});