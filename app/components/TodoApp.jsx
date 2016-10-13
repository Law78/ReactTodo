var React = require('react');
var axios = require('axios');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: [],
      connection: true
    }
  },
  renderData: function(){
    var {todos} = this.state;
    if(todos.length > 0){
      return(
        <div>
          <TodoList todos={todos} />
          <AddTodo onAddTodo={this.handleAddTodo} />
        </div>

      );
    } else {
      return(
        <div>
          <p>No Data!</p>
          <AddTodo onAddTodo={this.handleAddTodo} />
        </div>

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
      self.setState({
        connection: false
      });
      console.log('Axios Error:' + error);
    });
  },
  handleAddTodo: function(text){
    alert('New todo:' + text);
  },
  render: function(){
    var {todos, connection} = this.state;
    if (!connection){
      var noConnection = <p><strong>Nessuna Connessione al Server!</strong></p>;
    }
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Todo App React</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
          </div>
        </nav>
        <div className="my-app">
             {this.renderData()}
             {noConnection}
         </div>
      </div>
    )
  }
});

module.exports = TodoApp;
