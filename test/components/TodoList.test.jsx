const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const $ = require('jquery');
const expect = require('expect');
const {Provider}= require('react-redux');
const configureStore = require('configureStore');
//const {TodoList} = require('TodoList');
//const ConnectedTodoList = require('TodoList');
import ConnectedTodoList, {TodoList} from 'TodoList';
//const TodoList = require('TodoList'); // Object{TodoList: function (props, context, updater) { ... }, default: function Connect(props, context) { ... }}
//const {TodoList} = require('TodoList'); /// function (props, context, updater) { ... } 
//var Todo = require('Todo');
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist and can render', () => {
    //console.log('ECCOLO', TodoList);
    
    const component = TestUtils.renderIntoDocument(<TodoList />);
    expect(component).toExist();
  });

  it('should render one Todo component for each todo item', () => {

    var todos = [{
      id: 1,
      text: 'Do Something',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }, {
      id: 2,
      text: 'Check Mail',
      completed: false,
      completedAt: undefined,
      createdAt: 500
    }];
    var store = configureStore.configure({
      todos
    });
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList />
      </Provider>
    )
    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

    expect(todosComponents.length).toBe(todos.length);
    //Note that for stateless components, ReactDOM.render and TestUtils.renderIntoDocument will return null.

    //var todoList = TestUtils.renderIntoDocument(<div><TodoList todos={todos} /></div>);
    //var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    // Verifico quanti todo component trovo in todosList
    //expect(TestUtils.isDOMComponent(todoList)).toBe(true);
    //expect(TestUtils.isCompositeComponent(todoList)).toBe(false);
    //findDOMNode() cannot be used on stateless components: ReactDOM.findDOMNode
    //var todosComponents = TestUtils.scryRenderedDOMComponentsWithTag(todoList, "<div>");
    //var array = TestUtils.scryRenderedDOMComponentsWithTag(todoList, Todo);
    //var elemsCount = $(todoList).find('.TodoItem').length;
    //expect(elemsCount).toBe(todos.length);
    //expect(todoList).toNotBe(null);
  });


});
