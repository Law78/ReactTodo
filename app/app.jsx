var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

require('materializeStyles');
require('applicationStyles');

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);
