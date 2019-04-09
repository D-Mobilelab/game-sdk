import React from 'react';
import LazilyLoad, { importLazy } from './LazilyLoad';
import Interstitial from './js/components/Interstitial/Interstitial';
import Leaderboard from './js/components/Leaderboard/index';
import EnterName from './js/components/EnterName/index';
import Menu from './js/components/Menu/index';
import Adv from './js/components/Adv/index';
import './css/generic.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Interstitial />
        <EnterName />
        <Leaderboard />
        <Menu />
        <Adv />
        <LazilyLoad modules={{
          MenuList: () => {
            switch (this.props.label) {
              default:
                return importLazy(System.import('./js/components/MenuList/Gameasy'));
            }
          },
        }}>
          {({ MenuList }) => (
            <div>
              <MenuList />
            </div>)
          }
        </LazilyLoad>
      </div>
    );
  }
}
