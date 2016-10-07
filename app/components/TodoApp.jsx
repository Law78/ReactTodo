var React = require('react');
var axios = require('axios');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: []
    }
  },
  renderData: function(){
    var {todos} = this.state;
    if(todos.length > 0){
      return(
        <div>
          <TodoList todos={todos} />
          <AddTodo add={this.handleAddTodo} />
        </div>

      );
    } else {
      return(
        <p>No Data!</p>
      )
    }
  },
  componentWillMount: function(){

    var request = {
      method: 'GET',
      url: '/todos',
      baseURL: 'http://localhost:4000',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      timeout: 2000
    };
    var self = this;
    axios.request(request).then(function(res){
      console.log('Axios Response:');
      console.log(res.data);
      self.setState({
        todos: res.data
      });
    }).catch(function(error){
      console.log('Axios Error:' + error);
    });
  },
  handleAddTodo: function(text){
    alert('New todo:' + text);
  },
  render: function(){
    var {todos} = this.state;
    return(
      <div>
          {this.renderData()}
      </div>


    )
  }
});

module.exports = TodoApp;
