const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export const AddTodo = React.createClass({
  
  onSubmit: function(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var todoText = this.refs.todoText.value
    if(todoText.length > 0){
      this.refs.todoText.value = '';
      //this.props.onAddTodo(text);
      // Il dispatch nello STORE lo faccio dal DISPATCH di firebase
      //dispatch(actions.addTodo(todoText));
      dispatch(actions.startAddTodo(todoText));
      dispatch(actions.addTodoAPI(todoText));
    } else {
      this.refs.todoText.focus();
    }

  },
  render: function(){
    return(
        <div className="container__footer">
          <form onSubmit={this.onSubmit}>
            <input type="text" ref="todoText" placeholder="Inserisci Nota"/>
            <button className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Add Todo</button>
          </form>
        </div>
    );
  }
})

export default connect()(AddTodo);
