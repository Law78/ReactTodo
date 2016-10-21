var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

  beforeEach(() => {
      localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [{
        id: 300,
        text: 'Test setTodos',
        completed: true
      }];
      TodoAPI.setTodos(todos);
      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      // toBe verifica che siano lo stesso oggetto, meglio toEqual perchè io verifico i valori
      expect(actualTodos).toEqual(todos);
    });

    it('should not set invalid todos array', () => {
      var invalidTodos = {foo: 'bar'};

      TodoAPI.setTodos(invalidTodos);
      expect(localStorage.getItem('todos')).toBe(null);
    });
  });

  describe('getTodos', () =>{
    it('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);

    });

    it('should return todos if valid array in localStorage', () => {
      var todos = [{
        id: 300,
        text: 'Test setTodos',
        completed: true
      }];
      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });
});
