import React from 'react';
import LazilyLoad, { importLazy } from './LazilyLoad';
import Interstitial from './js/components/Interstitial/Interstitial';
import './css/generic.css';

export default class App extends React.Component {
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
