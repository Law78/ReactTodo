var React = require('react');
var ReactDOM = require('react-dom');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var {Todo} = require('Todo');
var $ = require('jquery');

describe('Todo', () =>{
  it('should exist', () => {
    //var component = TestUtils.renderIntoDocument(<div><Todo /></div>);
    expect(Todo).toExist();
  });

  it('should dispatch TOGGLE_TODO action on click', () => {
    var todoData = {
      id: 199,
      text: 'Write todo.test.jsx test',
      completed: true
    };

    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(todo));

    //console.log($el);
    //var $div = $el.find('.TodoItem');
    TestUtils.Simulate.click($el[0]);
    //var el = $(todo).find('input[type=checkbox]');
    //el[0].cheked();
    expect(spy).toHaveBeenCalledWith({
      type: 'TOGGLE_TODO',
      id: todoData.id
    });
  });
});
