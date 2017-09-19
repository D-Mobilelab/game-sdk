import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MaterialButton from '../MaterialButton';

describe('#MaterialButton tests', function () {
    it('should render in correct way', function () {
        let i = 0;
        const theme = {
            btn: 'btn',
            loadingSpinner: 'loadingSpinner'
        }
        const wrapper = mount(
            <MaterialButton theme={theme} onClick={() => i += 1} />
        );
        expect(wrapper.state()).toEqual({ active: false, ripplePosition: { top: '0px', left: '0px' } });
        expect(wrapper.find('button').length).toEqual(1);
        const fakeEvent = { clientX: 10, clientY: 10, preventDefault: () => { }, currentTarget: { clientWidth: 100, clientHeight: 100 } };

        const rawButton = wrapper.find('button');

        rawButton.simulate('mousedown', fakeEvent);
        expect(wrapper.state().active).toEqual(true);
        rawButton.simulate('mouseup', fakeEvent);
        expect(wrapper.state().active).toEqual(false);
        expect(i).toEqual(1);
    });
});