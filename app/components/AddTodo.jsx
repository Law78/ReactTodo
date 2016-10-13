const React = require('react');

const AddTodo = React.createClass({
  propTypes: {
    onAddTodo: React.PropTypes.func.isRequired

  },
  onSubmit: function(e){
    e.preventDefault();
    if(this.refs.todoText.value.length > 0){
      var text = this.refs.todoText.value;
      this.refs.todoText.value = '';
      this.props.onAddTodo(text);
    } else {
      this.refs.todoText.focus();
    }

  },
  render: function(){
    return(
        <div>
          <form onSubmit={this.onSubmit}>
            <input type="text" ref="todoText" placeholder="Inserisci Nota"/>
            <button className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Add Todo</button>
          </form>
        </div>
    );
  }
})

module.exports = AddTodo;
