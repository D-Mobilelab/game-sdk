import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './js/reducers/index';
import trackingMiddleware from './js/customMiddleware/trackingMiddleware';
import crashReporter from './js/customMiddleware/crashReporter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware, trackingMiddleware];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

if (process.env.NODE_ENV === 'production') {
  middlewares.unshift(crashReporter);
}

// CREATE THE REDUX STORE
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

export default store;
