import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/components/App';
import Location from './js/lib/Location';
import { Provider } from 'react-redux';
import store from './store';
// DYNAMIC CREATION OF THE ELEMENT
let ROOT_ELEMENT = document.createElement('div');
ROOT_ELEMENT.id = 'gfsdk_root';
window.document.body.appendChild(ROOT_ELEMENT);

ReactDOM.render(
    <Provider store={store}>
        <App label={Location.isGameasy() ? 'gameasy' : 'gamifive'}/>
    </Provider>,
    ROOT_ELEMENT
);