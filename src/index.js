import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import localStorage from './js/lib/LocalStorage';
import SDK from './SDK';
import store from './store';

import './css/generic.css';

import LazilyLoad, { importLazy } from './LazilyLoad';
import Interstitial from './js/components/Interstitial/Interstitial';

if (module.hot) { module.hot.accept(); }

if (process.env.APP_ENV === 'HYBRID') {
  __webpack_public_path__ = RUNTIME_PUBLIC_PATH;
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Interstitial />
        <LazilyLoad modules={{
          Gameover: () => {
            if (this.props.label === 'gameasy') {
              return importLazy(System.import('./js/components/GameasyOver'));
            } else if (this.props.label === 'bandai') {
              return function Noop() { return null; };
            }
            return importLazy(System.import('./js/components/GamifiveOver'));
          },
          Banner: () => {
            if (this.props.label === 'gameasy') {
              return importLazy(System.import('./js/components/Banner/Banner'));
            }
            return function Noop() { return null; };
          },
          Menu: () => {
            if (this.props.label === 'gameasy') {
              return importLazy(System.import('./js/components/Menu/MenuGameasy'));
            } else if (this.props.label === 'bandai') {
              return importLazy(System.import('./js/components/Menu/MenuBandai'));
            }
            return importLazy(System.import('./js/components/Menu/MenuGamifive'));
          },
          EnterNameContainer: () => {
            if (this.props.label === 'bandai') {
              return importLazy(System.import('./js/components/EnterName/Container'));
            }
            return function Noop() { return null; };
          },
        }}>
          {({ Gameover, Banner, Menu, EnterNameContainer }) => (
            <div>
              <EnterNameContainer />
              <Gameover />
              <Banner />
              <Menu />
            </div>)
          }
        </LazilyLoad>
      </div>
    );
  }
}

function onDomLoaded() {
  const ROOT_ELEMENT = document.createElement('div');
  ROOT_ELEMENT.id = 'gfsdk_root_new';
  window.document.body.appendChild(ROOT_ELEMENT);

  /**
     * TODO:
     * check GamifiveInfo.fw_type_profile instead
     */
  let WHITE_LABEL = (window.GamifiveInfo && window.GamifiveInfo.label) ? GamifiveInfo.label : 'gamifive';
  // let WHITE_LABEL = Location.isGamifive() ? 'gamifive' : 'gameasy';
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

window.document.addEventListener('DOMContentLoaded', onDomLoaded);

const aliases = ['GamefiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
const instance = new SDK(store);
aliases.map((alias) => {
  window[alias] = instance;
  return true;
});

export default instance;
