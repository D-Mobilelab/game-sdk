import { combineReducers } from 'redux';

import { generic } from './generic';
import { user } from './user';
import { session } from './session';
import { game_info } from './game_info';
import { vhost } from './vhost';

export default combineReducers({
  generic,
  session,
  user,
  game_info,
  vhost
})