import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import localStorage from './js/lib/LocalStorage';
import SDK from './SDK';
import Location from './js/lib/Location';
import { Provider } from 'react-redux';
import store from './store';

import './css/generic.css';

/*
Lazily loaded :) ^_^ (:
import Menu from './js/components/Menu/Menu';
import Banner from './js/components/Banner/Banner';
import GameasyOver from './js/components/GameasyOver';
import GamifiveOver from './js/components/GamifiveOver';
*/
import LazilyLoad, { importLazy } from './LazilyLoad';
import Interstitial from './js/components/Interstitial/Interstitial';

if (module.hot) { module.hot.accept(); }

if (process.env.APP_ENV === 'HYBRID') {
    __webpack_public_path__ = RUNTIME_PUBLIC_PATH;
}

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Interstitial />
                <LazilyLoad modules={{
                    Gameover: () => {
                        if (this.props.label === 'gameasy') {
                            return importLazy(System.import('./js/components/GameasyOver'));
                        } else if (this.props.label === 'bandai') {
                            return function Noop() { return null; }
                        } else {
                            return importLazy(System.import('./js/components/GamifiveOver'));
                        }
                    },
                    Banner: () => {
                        if (this.props.label === 'gameasy') {
                            return importLazy(System.import('./js/components/Banner/Banner'))
                        }
                        return function Noop() { return null };
                    },
                    Menu: () => {
                        if (this.props.label === 'gameasy') {
                            return importLazy(System.import('./js/components/Menu/MenuGameasy'));
                        } else if (this.props.label === 'bandai') {
                            return importLazy(System.import('./js/components/Menu/MenuBandai'));
                        } else {
                            return importLazy(System.import('./js/components/Menu/MenuGamifive'));
                        }
                    },
                    EnterNameContainer: () => {
                        if (this.props.label === 'bandai') {
                            return importLazy(System.import('./js/components/EnterName/Container'));
                        }
                        return function Noop() { return null; }
                    }
                }}>
                    {({ Gameover, Banner, Menu, EnterNameContainer }) => {
                        return (
                            <div>
                                <EnterNameContainer />
                                <Gameover />
                                <Banner />
                                <Menu />
                            </div>)
                    }
                    }
                </LazilyLoad>
            </div>
        )
    }
}

function onDomLoaded(event) {
    let ROOT_ELEMENT = document.createElement('div');
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
        ROOT_ELEMENT
    );
}

window.document.addEventListener("DOMContentLoaded", onDomLoaded);

let aliases = ['GamefiveSDK', 'DocomoSDK', 'GamifiveSdk', 'GamefiveSdk'];
const instance = new SDK(store);
aliases.map((alias) => {
    window[alias] = instance;
});
/**
 * Needed otherwise will export GamifiveSDK.default
 * https://github.com/webpack/webpack/issues/3929
 */

export default instance;
