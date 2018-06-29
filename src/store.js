import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import version from './version';
import reducer from './js/reducers/index';
import trackingMiddleware from './js/customMiddleware/trackingMiddleware';

/* eslint-disable no-unused-expressions */
window.docomo || (window.docomo = {});
/** eslint-enable */

/** disable sentry in local env or by conf */
// if (process.env.LOCAL_DEV === true || !window.docomo.SENTRY_ENABLE) {
//   window.docomo.SENTRY_URL = null;
// }

// const SENTRY_URL = window.docomo.SENTRY_URL;
const SENTRY_URL = 'https://570f6b3da0514539ad70eff24710948a@sentry.io/1232794';
const WHITE_LABEL = window.docomo.WHITE_LABEL;
const B_TEST_ID = window.docomo.B_TEST_ID;
const ENVIRONMENT = window.docomo.ENVIRONMENT;

Raven.config(SENTRY_URL, {
  release: version.build,
  environment: ENVIRONMENT,
  collectWindowErrors: true,
}).install();


Raven.setTagsContext({
  label: WHITE_LABEL,
  settrack: B_TEST_ID,
});
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunkMiddleware, trackingMiddleware];

// if (process.env.NODE_ENV === 'development') {
//   /* eslint-disable global-require */
//   const createLogger = require('redux-logger');
//   /** eslint-enable */
//   const logger = createLogger();
//   middlewares.push(logger);
// }
/** eslint-enable */
middlewares.push(createRavenMiddleware(Raven));

// CREATE THE REDUX STORE
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

export default store;
