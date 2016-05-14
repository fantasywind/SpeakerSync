import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  Provider,
} from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  createMemoryHistory,
} from 'react-router';
import reducer from './reducers/index.js';
import {
  syncHistoryWithStore,
  routerMiddleware,
} from 'react-router-redux';
import AppBox from './components/AppBox.js';

const memoryHistory = createMemoryHistory();

const store = createStore(reducer, {}, applyMiddleware(
  thunk,
  routerMiddleware(memoryHistory),
));

const history = syncHistoryWithStore(memoryHistory, store);

import PlayerView from './components/View/PlayerView.js';
import PlaylistListView from './components/View/PlaylistListView.js';
import AddSongView from './components/View/AddSongView.js';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppBox}>
        <Route path="player" component={PlayerView} />
        <Route path="playlists" component={PlaylistListView} />
        <Route path="playlists/:playlistId/addSong" component={AddSongView} />
        <IndexRoute component={PlayerView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
