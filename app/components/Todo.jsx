/*var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');

export var Todo = (props) => {
  console.log('Props',props);
  var {id, text, completed, createdAt, completedAt, dispatch} = props;
  var todoClassName = completed ? 'todo todo-completed' : 'todo';
  var renderDate = () => {
    if (completed) {
      return `Completed ${moment.unix(completedAt).format('DD-MM-YYYY @ h:m')}`;
    }
    return `Created ${moment.unix(createdAt).format('DD-MM-YYYY @ h:m')}`;
  }
  return(
    <div className={"TodoItem "+todoClassName} onClick={() => {
      //props.onToggle(id);
      dispatch(actions.toggleTodo(id));
    }} >
      <div className="">
        <p>
          <input type="checkbox" checked={completed}/>
          <label ><b>{text}</b></label> | <span className="todo-subtext">{renderDate()}</span>
        </p>
      </div>

    </div>

  )
}

export default (connect()(Todo));
*/

var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');
var actions = require('actions');


export var Todo = React.createClass({
  render: function(){
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    var renderDate = () => {
      if (completed) {
        return `Completed ${moment.unix(completedAt).format('DD-MM-YYYY @ h:m')}`;
      }
      return `Created ${moment.unix(createdAt).format('DD-MM-YYYY @ h:m')}`;
    };
    return(
      <div className={"TodoItem "+todoClassName} onClick={() => {
        //props.onToggle(id);

        //console.log('AGGIORRRONO', todo);
        dispatch(actions.toggleTodo(id));
        dispatch(actions.updateTodoAPI({
          id,
          text,
          completed,
          createdAt,
          completedAt
        }));
      }} >
        <div className="">
          <p>
            <input type="checkbox" checked={completed}  onChange={()=>{}}/>
            <label ><b>{text}</b></label> | <span className="todo-subtext">{renderDate()}</span>
          </p>
        </div>

      </div>

    )
  }
  
});
export default connect()(Todo);


