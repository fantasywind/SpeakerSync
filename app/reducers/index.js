import {
  combineReducers,
} from 'redux';
import {
  routerReducer,
} from 'react-router-redux';

import Playlist from './Playlist.js';

export default combineReducers({
  routing: routerReducer,
  Playlist,
});
