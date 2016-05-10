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

const memoryHistory = createMemoryHistory();

const store = createStore(reducer, {}, applyMiddleware(
  thunk,
  routerMiddleware(memoryHistory),
));

const history = syncHistoryWithStore(memoryHistory, store);

import Dashboard from './components/Dashboard.js';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={Dashboard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
