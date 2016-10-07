var React = require('react');

var Todo = require('Todo');
/*
var TodoList = React.createClass({
  render:function(){
    var {todos} = this.props;
    var renderTodos = () => {
      return todos.map((todo) => {
        return(
          <li key={todo.id}><Todo {...todo} /></li>
        )
      });
    };
    return(
      <div>
        <ul>
          {renderTodos()}
        </ul>
      </div>
    );
  }

});
*/


var TodoList = ({todos}) =>{
  var todo = {}
  var renderTodos = () => {
    return todos.map((todo) => {
      return(
        <li key={todo.id}><Todo {...todo} /></li>
      )
    });
  }
  return(
    <div>
      <ul>
        {renderTodos()}
      </ul>
    </div>
  );
}


module.exports = TodoList;
