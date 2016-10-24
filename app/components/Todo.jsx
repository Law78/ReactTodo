var React = require('react');
var moment = require('moment');

var Todo = (props) => {
  var {id, text, completed, createdAt, completedAt} = props.todo;
  var renderDate = () => {
    if (completed) {
      return `Completed ${moment.unix(completedAt).format('DD-MM-YYYY @ h:m')}`;
    }
    return `Created ${moment.unix(createdAt).format('DD-MM-YYYY @ h:m')}`;
  }
  return(
    <div className="TodoItem" onClick={() => {
      props.onToggle(id);
    }} >
      <p>
        <input type="checkbox" checked={completed}/>
        <label ><b>{text}</b></label> | {renderDate()}
      </p>
    </div>

  )
}

module.exports = Todo;

/*
var React = require('react');


var Todo = React.createClass({
  render: function(){
    var {id, text} = this.props;
    return(
      <div>
        {id}) {text}
      </div>
    )
  }
});

module.exports = Todo;

*/
