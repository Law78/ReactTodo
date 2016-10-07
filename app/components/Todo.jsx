var React = require('react');

var Todo = (todo) => {
  var {id, text} = todo;
  return(
    <div>
      <p> <b>{text}</b> (id:{id})</p>
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
