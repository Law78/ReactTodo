const React = require('react');
const TestUtils = require('react-addons-test-utils');
const $ = require('jquery');
const expect = require('expect');

const TodoList = require('TodoList');
//const Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
    const component = TestUtils.renderIntoDocument(<div><TodoList /></div>);
    expect(component).toExist();
  });

  it('should render one Todo component for each todo item', () => {
    var todos = [{
      id: 1,
      text: 'Do Something'
    }, {
      id: 2,
      text: 'Check Mail'
    }];

    //Note that for stateless components, ReactDOM.render and TestUtils.renderIntoDocument will return null.

    var todoList = TestUtils.renderIntoDocument(<div><TodoList todos={todos} /></div>);
    // Verifico quanti todo component trovo in todoList
    expect(TestUtils.isDOMComponent(todoList)).toBe(true);
    expect(TestUtils.isCompositeComponent(todoList)).toBe(false);
    //findDOMNode() cannot be used on stateless components: ReactDOM.findDOMNode
    //var todosComponents = TestUtils.scryRenderedDOMComponentsWithTag(todoList, "<div>");

  });
});
