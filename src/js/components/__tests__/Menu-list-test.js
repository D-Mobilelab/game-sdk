import React from 'react';
import { mount } from 'enzyme';

import Menulist from '../MenuList/Default';

describe('Menu List Component tests', () => {
  it('should render in the correct way', () => {
    const wrapper = mount(
      <Menulist />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Menulist).length).toEqual(1);
  });
});
