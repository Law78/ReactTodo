var React = require('react');
var axios = require('axios');
var uuid  = require('node-uuid');

var TodoList    = require('TodoList');
var AddTodo     = require('AddTodo');
var TodoSearch  = require('TodoSearch');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: [],
      showCompleted: false,
      searchText: '',
      connection: true
    }
  },
  handleSearchText: function(showCompleted, searchText){
    this.setState({
      showCompleted,
      searchText: searchText.toLowerCase()
    })
  },
  renderData: function(){
    var {todos} = this.state;
    if(todos.length > 0){
      return(
        <div>
          <TodoSearch onSearchText={this.handleSearchText} />
          <TodoList todos={todos} />
        </div>

      );
    } else {
      return(
        <div>
          <p>No Data!</p>
        </div>

      )
    }
  },
  componentWillMount: function(){
    var port2 = process.env.PORT + 1;
    var request = {
      method: 'GET',
      url: '/todos',
      baseURL: 'http:\\0.0.0.0' + ':' + (port2 || 4000),
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
    //alert('New todo:' + text);
    var todoId = uuid();
    this.setState({
      todos: [
        ...this.state.todos, {
          id: todoId,
          text
        }
      ]
    });
    var port2 = process.env.PORT + 1;
    var request = {
      method: 'POST',
      url: '/todos',
      baseURL: 'http:\\0.0.0.0' + ':' + (port2 || 4000),
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      timeout: 2000,
      data: {
        id: todoId,
        text
      }
    };
    var self = this;
    axios.request(request).then(function(res){
      console.log('Axios Response:');
      console.log(res.data);

    }).catch(function(error){
      console.log('Axios Error:' + error);
    });
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
          <AddTodo onAddTodo={this.handleAddTodo} />
         </div>
      </div>
    )
  }
});

module.exports = TodoApp;
