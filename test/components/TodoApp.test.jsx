const React = require('react');
const TestUtils = require('react-addons-test-utils');
const {Provider} = require('react-redux');
const expect = require('expect');

const configureStore = require('configureStore');

//import TodoList from 'TodoList';
const {TodoList} = require('TodoList');
const TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    //const component = TestUtils.renderIntoDocument(<TodoApp />);
    expect(TodoApp).toExist();
  });

  it('should render TodoList', () => {
    var todos = [{
        id: 300,
        text: 'Test setTodos',
        completed: true
      }];
    localStorage.setItem('todos', JSON.stringify(todos));
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
    
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);


    expect(todoList.length).toEqual(1);
  });
});
