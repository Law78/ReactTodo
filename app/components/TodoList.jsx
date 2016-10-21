var React = require('react');
var Todo = require('Todo');

var TodoList = (props) =>{

  var todo = {}
  var renderTodos = () => {
    return props.todos.map((todo) => {
      return(
        <li key={todo.id}><Todo todo={todo} onToggle={props.onToggle}/></li>
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

TodoList.defaultProps = { todos: [] };

module.exports = TodoList;


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
