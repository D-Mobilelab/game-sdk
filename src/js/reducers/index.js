import { combineReducers } from 'redux';

import { generic } from './generic';
import { user } from './user';
import { session } from './session';
import { game_info } from './game_info';
import { vhost } from './vhost';
import { menu } from './menu';
import { game_over } from './game_over';

export default combineReducers({
  generic,
  session,
  user,
  game_info,
  game_over,
  menu,
  vhost
})