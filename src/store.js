import { initialState } from './initialState';
import reducer from './js/reducers/index.js';

import { createStore, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { newtonMiddleware } from './js/customMiddleware/newtonMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware, newtonMiddleware];

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

export default store;
