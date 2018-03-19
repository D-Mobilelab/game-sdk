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
            switch (this.props.label) {
              case 'bandai':
                return function Noop() { return null; };
              case 'gamifive':
                return importLazy(System.import('./js/components/GamifiveOver'));
              case 'zain':
                return importLazy(System.import('./js/components/Gameover/Zain'));
              default:
                return importLazy(System.import('./js/components/Gameover/Gameasy'));
            }
          },
          Banner: () => {
            if (this.props.label === 'gameasy') {
              return importLazy(System.import('./js/components/Banner/Container'));
            }
            return function Noop() { return null; };
          },
          Menu: () => {
            switch (this.props.label) {
              case 'bandai':
                return importLazy(System.import('./js/components/Menu/MenuBandai'));
              case 'gamifive':
                return importLazy(System.import('./js/components/Menu/MenuGamifive'));
              case 'zain':
                return importLazy(System.import('./js/components/Menu/MenuZain'));
              default:
                return importLazy(System.import('./js/components/Menu/MenuGameasy'));
            }
          },
          MenuList: () => {
            switch (this.props.label) {
              default:
                return importLazy(System.import('./js/components/MenuList/index'));
            }
          },
          EnterNameContainer: () => {
            if (this.props.label === 'bandai') {
              return importLazy(System.import('./js/components/EnterName/Container'));
            }
            return function Noop() { return null; };
          },
        }}>
          {({ Gameover, Banner, Menu, MenuList, EnterNameContainer }) => (
            <div>
              <EnterNameContainer />
              <Gameover />
              <Banner />
              <Menu />
              <MenuList />
            </div>)
          }
        </LazilyLoad>
      </div>
    );
  }
}
