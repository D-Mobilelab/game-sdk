import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MaterialButton } from '../MaterialButton';

describe('#MaterialButton tests', function () {
    it('should render in correct way', function () {
        let i = 0;
        const theme = {
            btn: 'btn',
            loadingSpinner: 'loadingSpinner'
        }
        const wrapper = shallow(
            <MaterialButton theme={theme} onClick={() => i += 1} />
        );
        expect(wrapper.state()).toEqual({ active: false, ripplePosition: { top: '0px', left: '0px' } });
        wrapper.instance().handleMouseUp({ x: 50, y: 100 });
        expect(i).toEqual(1);
    });
});