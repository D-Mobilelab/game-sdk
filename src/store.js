import { initialState } from './initialState';
import reducer from './js/reducers/index.js';

import { createStore, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { newtonMiddleware } from './js/customMiddleware/newtonMiddleware';
import { crashReporter } from './js/customMiddleware/crashReporter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware, newtonMiddleware];

if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'preprod') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

if (process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'preprod') {
  middlewares.unshift(crashReporter);
}

// CREATE THE REDUX STORE
let store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

export default store;
