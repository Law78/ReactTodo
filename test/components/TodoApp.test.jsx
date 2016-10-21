const React = require('react');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    const component = TestUtils.renderIntoDocument(<TodoApp />);
    expect(component).toExist();
  });

  it('should add todo to the todos state on handleAddTodo', () => {
    var todoText = "Test Text";
    const todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({
      todos:[]
    });
    todoApp.handleAddTodo(todoText);
    expect(todoApp.state.todos.length).toBe(1);
    expect(todoApp.state.todos[0].text).toBe(todoText);
  });

  it('should toggle completed value when handleToggle called', () =>{
    var todoData = {
      id: 1,
      text: 'Test features',
      completed: false
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({
      todos: [todoData]
    });
    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(1);
    expect(todoApp.state.todos[0].completed).toBe(true);
  });

});
