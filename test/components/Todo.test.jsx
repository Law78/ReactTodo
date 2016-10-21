var React = require('react');
var ReactDOM = require('react-dom');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var Todo = require('Todo');
var $ = require('jquery');

describe('Todo', () =>{
  it('should exist', () => {
    //var component = TestUtils.renderIntoDocument(<div><Todo /></div>);
    expect(Todo).toExist();
  });

  it('should call onToggle prop with id on click', () => {
    var todoData = {
      id: 199,
      text: 'Write todo.test.jsx test',
      completed: true
    };

    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<div><Todo todo={todoData} onToggle={spy}/></div>);
    var $el = $(ReactDOM.findDOMNode(todo));

    //console.log($el);
    var $div = $el.find('.TodoItem');
    TestUtils.Simulate.click($div[0]);
    //var el = $(todo).find('input[type=checkbox]');
    //el[0].cheked();
    expect(spy).toHaveBeenCalledWith(199);
  });
});
