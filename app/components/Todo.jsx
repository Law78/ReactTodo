var React = require('react');

var Todo = (props) => {
  var {id, text, completed} = props.todo;
  return(
    <div className="TodoItem" onClick={() => {
      props.onToggle(id);
    }} >
      <p>
        <input type="checkbox" checked={completed}/>
        <label ><b>{text}</b></label>
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
