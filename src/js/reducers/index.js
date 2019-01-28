import { combineReducers } from 'redux';

import generic from './generic';
import menu from './menu';
import user from './user';
import session from './session';
import game_info from './game_info';
import vhost from './vhost';
// import game_over from './game_over_old';
import game_over from './game_over';
import banner from './banner';
import interstitial from './interstitial';
import menu_list from './menu_list';
import styles from './styles';

export default combineReducers({
  banner,
  generic,
  session,
  user,
  game_info,
  game_over,
  menu_list,
  menu,
  vhost,
  interstitial,
  styles,
});
