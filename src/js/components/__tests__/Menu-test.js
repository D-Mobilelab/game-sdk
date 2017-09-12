import React from 'react';
import { mount } from 'enzyme';
import Menu from '../Menu/MenuComponent';

describe('Menu Component tests', function () {

  it('should render in the correct way', function () {
    spyOn(Menu.prototype, 'componentDidMount');
    const wrapper = mount(
      <Menu theme={{ show: 'show', hide: 'hide', active: 'active' }} />
    );
    expect(Menu.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Menu).length).toEqual(1);
  });
});