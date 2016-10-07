const React = require('react');

const AddTodo = React.createClass({
  onSubmit: function(e){
    e.preventDefault();

    var text = this.refs.todoText.value;
    this.refs.todoText.value = '';
    this.props.add(text);
  },
  render: function(){
    return(
        <div>
          <form onSubmit={this.onSubmit}>
            <input type="text" ref="todoText" placeholder="Inserisci Nota"/>
            <button>Add Todo</button>
          </form>
        </div>
    );
  }
})

module.exports = AddTodo;
