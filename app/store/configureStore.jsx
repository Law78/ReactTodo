

import * as redux from 'redux';
import thunk from 'redux-thunk';
import {searchTextReducers, showCompletedReducers, todosReducers} from 'reducers';
import createLogger from 'redux-logger';

//const {applyMiddleware, createStore, combineReducers, compose} = require('redux');
//const {searchTextReducers, showCompletedReducers, todosReducers} = require('reducers');
//const createLogger = require('redux-logger');
//const thunk = require('redux-thunk').default

export const configure = (initialState = {}) => {
  const reducer = redux.combineReducers({searchText:searchTextReducers,
    showCompleted: showCompletedReducers,
    todos: todosReducers
  });
  const logger = createLogger();
  var store = redux.createStore(reducer, initialState,
    redux.compose(
      redux.applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
};