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

  }
};
