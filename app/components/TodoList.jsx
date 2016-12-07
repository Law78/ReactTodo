/*
var React = require('react');
var {connect} = require('react-redux');
var {Todo} = require('Todo');

var TodoList = (props) =>{
 
  //var todo = {}
  var renderTodos = () => {
    return props.todos.map((todo) => {
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

TodoList.defaultProps = { todos: [] };

module.exports = connect(
  (state) => {
    return {
      todos: state.todos
    };
  }
)(TodoList);


*/

var React = require('react');
var {connect} = require('react-redux');
var TodoOLD = require ('Todo').default;
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');


export var TodoList = React.createClass({
  render:function(){

    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
    //console.log('ggg',todos)  
    //console.log('aaaggg',TodoOLD)  
     if (!todos) return;
      return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
        return(
          <li key={todo.id}><TodoOLD {...todo} /></li>
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

});

export default connect(
  (state) => {
    return state;
  }
)(TodoList);