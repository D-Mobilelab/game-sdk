import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';

import * as Actions from './js/actions/index.js';
import { Provider } from 'react-redux';
import reducer from './js/reducers/index.js';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { initialState } from './initialState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

let store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

// Dynamic Creation of the element
let ROOT_ELEMENT = document.createElement('div');
ROOT_ELEMENT.id = 'gfsdk_root';
window.document.body.appendChild(ROOT_ELEMENT);

ReactDOM.render(
    <Provider store={store}>
        <App label='gameasy' />
    </Provider>,
    ROOT_ELEMENT
);