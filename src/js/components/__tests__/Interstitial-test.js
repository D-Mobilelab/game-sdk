import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Interstitial } from '../Interstitial/Interstitial';

describe('Interstitial Component tests',function(){  

  it('should render in the correct way', function(done){
    const actions = { show: function(){}, hide: jasmine.createSpy('Close') }
    const wrapper = shallow(
      <Interstitial show={true}
                    dismissableAfter={1}
                    srcDoc='<!DOCTYPE html><html><head></head><body></body></html>'
                    actions={actions}
      />
    );

    wrapper.instance().onLoad();
    expect(wrapper.state('loaded')).toBe(true);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toBeDefined();
    //console.log(wrapper.debug());
    
    const fakeEvent = {
        preventDefault: function(){},
        stopPropagation: function(){}
    };

    setTimeout(() => {
        expect(wrapper.state('dismissable')).toBe(true);    
        wrapper.find('button').simulate('click', fakeEvent);
        expect(actions.hide).toHaveBeenCalledTimes(1);
        done();
    }, 1100);
  });
});