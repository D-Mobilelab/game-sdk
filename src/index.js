import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/components/App';
import Location from './js/lib/Location';

import { initialState } from './initialState';
import reducer from './js/reducers/index.js';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

// CREATE THE REDUX STORE
let store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

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