var $ = require('jquery');
var axios = require('axios');
var config = require('config');

module.exports = {
  updateTodo: function(todo){
    var request = {
      method: 'PATCH',
      url: '/todos/' + todo.id,
      baseURL: 'http://0.0.0.0:4500',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      timeout: 2000,
      data: todo
    };
    var self = this;
    axios.request(request).then(function(res){
      console.log('Axios Response:');
      console.log(res.data);

    }).catch(function(error){
      console.log('Axios Error:' + error);
    });
  },
  setTodos: function(todos){
    if(config.db === 'fake'){
      var request = {
        method: 'POST',
        url: '/todos',
        baseURL: 'http://0.0.0.0:4500',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        timeout: 2000,
        data: todos
      };
      var self = this;
      axios.request(request).then(function(res){
        console.log('Axios Response:');
        console.log(res.data);

      }).catch(function(error){
        console.log('Axios Error:' + error);
      });
    } else {
      if($.isArray(todos)){
        // Devo usare JSON.stringify per memorizzare l'oggetto
        localStorage.setItem('todos', JSON.stringify(todos));
        return todos;
      }
    }

  },
  getTodos: function(){
    if(config.db === 'fake'){
      var todos = [];
      console.log('DB: ', config.db);
      var request = {
        method: 'GET',
        url: '/todos',
        baseURL: 'http://0.0.0.0:4500',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        timeout: 2000
      };
      var self = this;
      return axios.request(request).then(function(res){
        console.log('Axios Response:');
        console.log(res.data);
        todos = res.data;
        return todos;
      }).catch(function(error){
        
        console.log('Axios Error:' + error);
      });
      //return $.isArray(todos) ? todos : []; 
    } else {
      console.log('DB in USE: ', config.db);
      // localStorage ci ritorna una stringa!
      var stringTodos = localStorage.getItem('todos');
      var todos = [];
      // Devo convertire la stringa in un oggetto. Devo inserirlo in un blocco try-catch
      try{
        todos = JSON.parse(stringTodos);
      } catch (e){
        console.log('Errore nel parse di localStorate', e);
      }
      return $.isArray(todos) ? todos : [];
    }
    

  },
  filterTodos: function(todos, showCompleted, searchText){
    //console.log('FILTER', todos);
    var filteredTodos = todos;
    // Filter by showCompleted
    filteredTodos = filteredTodos.filter( (todo) => {
      // Se la return è true allora ritorna il todo nel nuovo array.
      return !todo.completed || showCompleted;
    });
    // Filter by searchText


    filteredTodos = filteredTodos.filter( (todo) => {
      //console.log(todo)
      var todoText = todo.text.toLowerCase();
      //console.log(searchText);
      return searchText.length === 0 || todoText.indexOf(searchText) >= 0;
    });
    // Sort todos with non-completed first

    filteredTodos = filteredTodos.sort( (todo1, todo2) => {
      // ritorno -1: todo1 deve essere precedente a todo2
      // ritorno 1: todo2 deve essere precedente a todo1
      // ritorno 0: nessun cambiamento
      if (!todo1.completed && todo2.completed){
        return -1;
      } else if (todo1.completed && !todo2.completed){
        return 1;
      } else {
        return 0;
      }
    });
    return filteredTodos;
  }
};
