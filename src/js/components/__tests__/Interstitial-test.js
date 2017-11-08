import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Interstitial } from '../Interstitial/Interstitial';

describe('Interstitial Component tests', () => {
  it('should render in the correct way', (done) => {
    const actions = { show() {}, hide: jasmine.createSpy('Close') };
    const wrapper = shallow(
      <Interstitial show={true}
        dismissableAfter={1}
        src='http://www.google.com'
        actions={actions}
      />,
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
    expect(wrapper.instance().timerID).toBeNull();
    // call the onload manually
    wrapper.instance().handleOnLoad();

    expect(wrapper.instance().timerID).not.toBeNull();
    // console.log(wrapper.debug());

    const fakeEvent = {
      preventDefault() {},
      stopPropagation() {},
    };

    setTimeout(() => {
      expect(wrapper.state('loaded')).toBe(true);
      expect(wrapper.state('dismissable')).toBe(true);
      wrapper.find('button').simulate('click', fakeEvent);
      expect(actions.hide).toHaveBeenCalledTimes(1);
      done();
    }, 1100);
  });
});
