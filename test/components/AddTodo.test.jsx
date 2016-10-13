var React = require('react');
var ReactDOM = require('react-dom');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var AddTodo = require('AddTodo');
var $ = require('jquery');

describe('AddTodo', () =>{
  
  it('should exist', () => {
    var spy = expect.createSpy();
    var component = TestUtils.renderIntoDocument(<div><AddTodo onAddTodo={spy} /></div>);
    expect(component).toExist();
  });

  it('should call onAddTodo prop with valid data', () => {
    var todoText = 'Check Mail';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]); // Ritorna un array per questo uso [0]

    expect(spy).toHaveBeenCalledWith('Check Mail');
  });

  it('should not call onAddTodo prop with invalid input', () => {
    var todoText = '';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]); // Ritorna un array per questo uso [0]

    expect(spy).toNotHaveBeenCalled();
  });
});
