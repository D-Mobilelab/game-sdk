import React from 'react';
import LazilyLoad, { importLazy } from './LazilyLoad';
import Interstitial from './js/components/Interstitial/Interstitial';
import Leaderboard from './js/components/Leaderboard/index';
import EnterName from './js/components/EnterName/index';
import Menu from './js/components/Menu/index';
import Fullscreen from './js/components/Fullscreen/index';
import './css/generic.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Interstitial />
        <EnterName />
        <Leaderboard />
        <Menu />
        <Fullscreen />
        <LazilyLoad modules={{
          Banner: () => {
            if (this.props.label === 'gameasy') {
              return importLazy(System.import('./js/components/Banner/Container'));
            }
            return function Noop() { return null; };
          },
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
