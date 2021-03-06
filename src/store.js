import createRavenMiddleware from 'raven-for-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './js/reducers/index';
import trackingMiddleware from './js/customMiddleware/trackingMiddleware';

/* eslint-disable no-unused-expressions */
window.docomo || (window.docomo = {});
/** eslint-enable */

/** disable sentry in local env or by conf */
if (process.env.LOCAL_DEV === true || !window.docomo.SENTRY_ENABLE) {
  window.docomo.SENTRY_URL = null;
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware, trackingMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}
if (window.Raven && window.Raven.isSetup()) {
  middlewares.push(createRavenMiddleware(window.Raven));
} else {
  console.warn('Raven library not found');
}
/** eslint-enable */

// CREATE THE REDUX STORE
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

export default store;
