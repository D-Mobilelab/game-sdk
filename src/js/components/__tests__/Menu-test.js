import React from 'react';
import { mount } from 'enzyme';
import Menu from '../Menu/Menu.jsx';

describe('Menu Component tests', () => {
  it('should render in the correct way', () => {
    spyOn(Menu.prototype, 'componentDidMount');
    const wrapper = mount(
      <Menu menu={{position:"BOTTOM_RIGHT"}} styles={{}} />,
    );
    expect(Menu.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Menu).length).toEqual(1);
  });
});
