import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Raven from 'raven-js';
import store from './store';

import App from './App';
import { localStorage } from './js/lib/LocalStorage';
import SDK from './SDK';
import { getLabel } from './js/actions/utils';

/* global __webpack_public_path__:true, RUNTIME_PUBLIC_PATH */
if (process.env.APP_ENV === 'HYBRID') {
  __webpack_public_path__ = RUNTIME_PUBLIC_PATH;
}

let ROOT_ELEMENT = null;
function onDomLoaded() {
  ROOT_ELEMENT = document.createElement('div');
  ROOT_ELEMENT.id = 'gfsdk_root_new';
  window.document.body.appendChild(ROOT_ELEMENT);
  Raven.config('https://570f6b3da0514539ad70eff24710948a@sentry.io/1232794', { 
    captureUnhandledRejections: true 
  }).install().context(function () {
    ReactDOM.render(
      <Provider store={store}>
        <App label={getLabel()} />
      </Provider>,
      ROOT_ELEMENT,
    );
  });
}

if (module.hot) {
  module.hot.accept('./App.js', () => {
    // Require the new version and render it instead    
    ReactDOM.render(<App />, ROOT_ELEMENT);
  });
}

window.document.addEventListener('DOMContentLoaded', onDomLoaded);

const aliases = ['GamefiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
const instance = Object.freeze(new SDK(store));

aliases.map((alias) => {
  window[alias] = instance;
  return true;
});

export default instance;
