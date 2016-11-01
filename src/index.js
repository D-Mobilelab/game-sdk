import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';

import * as Actions from './js/actions/index.js';
import { Provider } from 'react-redux';
import { mainReducer } from './js/reducers/index.js';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

let initialState = {
    hybrid: false,
    initialized: false,
    message: 'NO_INIT_CALLED',   
    gameInfo: {},
    user: {logged: false},
    vhost: {},
    connectionState: { online: true, type: 'none' },
    initConfig: {},
    currentSession: {opened:false},
    isOnStartSessionRegistered: false
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    mainReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

// Dynamic Creation of the element
let ROOT_ELEMENT = document.createElement('div');
ROOT_ELEMENT.id = 'gfsdk_root';
window.document.body.appendChild(ROOT_ELEMENT);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    ROOT_ELEMENT
);