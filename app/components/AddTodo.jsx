const React = require('react');

const AddTodo = React.createClass({
  onButtonClick: function(){
      console.log('qui')
      this.props.add
  },
  render: function(){
    return(
        <div>
          <input type="text" ref="todoText"/>
          <button onClick={this.onButtonClick}>Add Todo</button>
        </div>
    );
  }
})

module.exports = AddTodo;
