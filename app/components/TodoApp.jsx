var React = require('react');
var axios = require('axios');
var uuid  = require('node-uuid');
var moment = require('moment');
var config = require('config');

var TodoList    = require('TodoList');
var AddTodo     = require('AddTodo');
var TodoSearch  = require('TodoSearch');
var TodoAPI     = require('TodoAPI');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: config.db!== 'fake' ? TodoAPI.getTodos() : [],
      showCompleted: false,
      searchText: '',
      connection: true
    }
  },
  componentDidUpdate: function(){
    TodoAPI.setTodos(this.state.todos);
  },
  handleSearchText: function(showCompleted, searchText){
    this.setState({
      showCompleted,
      searchText: searchText.toLowerCase()
    })
  },
  renderData: function(){
    var {todos, showCompleted, searchText} = this.state;
    var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    if(todos.length > 0){
      return(
        <div className="row">
          <div className="col s10 offset-s1">
            <div className="container-todo">
              <TodoSearch onSearchText={this.handleSearchText} />
              <TodoList todos={filterTodos} onToggle={this.handleToggle}/>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <p className="container__message">No Data!</p>
        </div>

      )
    }
  },
  componentWillMount: function(){
    if(config.db === 'fake'){
      console.log('DB: ', config.db);
      var request = {
        method: 'GET',
        url: '/todos',
        baseURL: 'http://0.0.0.0:4000',
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
    } else {
      console.log('DB in USE: ', config.db);
    }


  },
  handleAddTodo: function(text){
    //alert('New todo:' + text);
    var todoId = uuid();
    this.setState({
      todos: [
        ...this.state.todos, {
          id: todoId,
          text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    });
    if(config.db === 'fake'){
      var request = {
        method: 'POST',
        url: '/todos',
        baseURL: 'http://0.0.0.0:4000',
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
    }


  },
  handleToggle: function(id){
    var updatedTodos = this.state.todos.map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }
      return todo;
    });
    this.setState({todos: updatedTodos});
  },
  render: function(){
    var {connection} = this.state;
    if (!connection){
      var noConnection = <p><strong>Nessuna Connessione al Server!</strong></p>;
    }
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Todo App React</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#">Menu 1</a></li>
              <li><a href="#">Menu 2</a></li>
              <li><a href="#">Menu 3</a></li>
            </ul>
          </div>
        </nav>
        <div className="page-title">
          <h1>Todo App</h1>
        </div>
        <div className="my-app">
          <div className="row">
            <div className="col s10 offset-s1 ">
              {this.renderData()}
              {noConnection}
              <AddTodo onAddTodo={this.handleAddTodo} />
            </div>
          </div>
         </div>
      </div>
    )
  }
});

module.exports = TodoApp;
