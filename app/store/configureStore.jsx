
const {applyMiddleware, createStore, combineReducers, compose} = require('redux');
const {searchTextReducers, showCompletedReducers, todosReducers} = require('reducers');
const createLogger = require('redux-logger');

export const configure = () => {
  const reducer = combineReducers({searchText:searchTextReducers,
    showCompleted: showCompletedReducers,
    todos: todosReducers
  });
  const logger = createLogger();
  var store = createStore(reducer,
    compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
    applyMiddleware(logger));
  return store;
};