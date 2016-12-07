var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var TodoAPI = require('TodoAPI');
var TodoApp = require('TodoApp');
var config = require('config');
var actions = require('actions');
var store = require('configureStore').configure();

//import './../playground/firebase/index';

store.subscribe(() => {
  var state = store.getState();
  //console.log('New State', state);
  if (config.db!=='fake') TodoAPI.setTodos(state.todos);
});

if (config.db!=='fake'){
  var initialTodos = TodoAPI.getTodos()
  store.dispatch(actions.addTodos(initialTodos));
} else {
  TodoAPI.getTodos().then((data) => {
    store.dispatch(actions.addTodos(data));
  });
}


require('materializeStyles');
require('applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);