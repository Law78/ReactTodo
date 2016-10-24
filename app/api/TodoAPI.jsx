var $ = require('jquery');

module.exports = {
  setTodos: function(todos){
    if($.isArray(todos)){
      // Devo usare JSON.stringify per memorizzare l'oggetto
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function(){
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

  },
  filterTodos: function(todos, showCompleted, searchText){
    var filteredTodos = todos;
    // Filter by showCompleted
    filteredTodos = filteredTodos.filter( (todo) => {
      // Se la return è true allora ritorna il todo nel nuovo array.
      return !todo.completed || showCompleted;
    });
    // Filter by searchText


    filteredTodos = filteredTodos.filter( (todo) => {
      var todoText = todo.text.toLowerCase();
      console.log(searchText);
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
