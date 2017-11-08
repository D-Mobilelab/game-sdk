import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import { localStorage } from './js/lib/LocalStorage';
import SDK from './SDK';

/* global __webpack_public_path__:true, RUNTIME_PUBLIC_PATH */
if (process.env.APP_ENV === 'HYBRID') {
  __webpack_public_path__ = RUNTIME_PUBLIC_PATH;
}

let ROOT_ELEMENT = null;
function onDomLoaded() {
  ROOT_ELEMENT = document.createElement('div');
  ROOT_ELEMENT.id = 'gfsdk_root_new';
  window.document.body.appendChild(ROOT_ELEMENT);

  /**
   * TODO:
   * check GamifiveInfo.fw_type_profile instead
   */
  let WHITE_LABEL = (window.GamifiveInfo && window.GamifiveInfo.fw_type_profile) ? window.GamifiveInfo.fw_type_profile : 'gamifive';
  if (WHITE_LABEL.indexOf('gameasy') > -1) {
    WHITE_LABEL = 'gameasy';
  } else if (WHITE_LABEL.indexOf('bandai') > -1) {
    WHITE_LABEL = 'bandai';
  }
  /** overwrite with localStorage if any */
  const label = localStorage.getItem('gfsdk-debug-label');
  if (label) { WHITE_LABEL = label; }

  ReactDOM.render(
    <Provider store={store}>
      <App label={WHITE_LABEL} />
    </Provider>,
    ROOT_ELEMENT,
  );
}

if (module.hot) {
  module.hot.accept('./App.js', () => {
    // Require the new version and render it instead    
    ReactDOM.render(<App />, ROOT_ELEMENT);
  });
}

window.document.addEventListener('DOMContentLoaded', onDomLoaded);

const aliases = ['GamefiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
const instance = new SDK(store);
aliases.map((alias) => {
  window[alias] = instance;
  return true;
});

export default instance;
