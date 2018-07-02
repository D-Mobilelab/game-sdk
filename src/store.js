import Raven from 'raven-js';
import { createStore, applyMiddleware, compose } from 'redux';
import createRavenMiddleware from 'raven-for-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './js/reducers/index';
import trackingMiddleware from './js/customMiddleware/trackingMiddleware';

/* eslint-disable no-unused-expressions */
window.docomo || (window.docomo = {});
/** eslint-enable */

/** disable sentry in local env or by conf */
// if (process.env.LOCAL_DEV === true || !window.docomo.SENTRY_ENABLE) {
//   window.docomo.SENTRY_URL = null;
// }

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [createRavenMiddleware(Raven), thunkMiddleware, trackingMiddleware];

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require */
  const createLogger = require('redux-logger');
  /** eslint-enable */
  const logger = createLogger();
  middlewares.push(logger);
}
/** eslint-enable */
middlewares.push(createRavenMiddleware(Raven, {}));

// CREATE THE REDUX STORE
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

export default store;
