import React from 'react';
import LazilyLoad, { importLazy } from './LazilyLoad';
import Interstitial from './js/components/Interstitial/Interstitial';
import Leaderboard from './js/components/Leaderboard/index';
import EnterName from './js/components/EnterName/index';
import Menu from './js/components/Menu2/index';
import './css/generic.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Interstitial />
        <EnterName />
        <Leaderboard />
        <Menu />
        <LazilyLoad modules={{
          Banner: () => {
            if (this.props.label === 'gameasy') {
              return importLazy(System.import('./js/components/Banner/Container'));
            }
            return function Noop() { return null; };
          },
          // Menu: () => {
          //   switch (this.props.label) {
          //     case 'bandai':
          //       return importLazy(System.import('./js/components/Menu/MenuBandai'));
          //     case 'gamifive':
          //       return importLazy(System.import('./js/components/Menu/MenuGamifive'));
          //     case 'zain':
          //       return importLazy(System.import('./js/components/Menu/MenuZain'));
          //     case 'gamempire':
          //       return importLazy(System.import('./js/components/Menu/MenuGamempire'));
          //     case 'h3goplay':
          //       return importLazy(System.import('./js/components/Menu/MenuH3g'));
          //     default:
          //       return importLazy(System.import('./js/components/Menu/MenuGameasy'));
          //   }
          // },
          MenuList: () => {
            switch (this.props.label) {
              default:
                return importLazy(System.import('./js/components/MenuList/Gameasy'));
            }
          },
        }}>
          {({ Banner, MenuList }) => (
            <div>
              <Banner />
              <MenuList />
            </div>)
          }
        </LazilyLoad>
      </div>
    );
  }
}
