import {
  combineReducers,
} from 'redux';
import {
  routerReducer,
} from 'react-router-redux';

import Playlist from './Playlist.js';
import Player from './Player.js';

export default combineReducers({
  routing: routerReducer,
  Playlist,
  Player,
});
