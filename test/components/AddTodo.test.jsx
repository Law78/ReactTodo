var React = require('react');
var ReactDOM = require('react-dom');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var {AddTodo} = require('AddTodo');
var $ = require('jquery');

import * as actions from 'actions';

describe('AddTodo', () =>{
  
  it('should exist', () => {
    var spy = expect.createSpy();
    var component = TestUtils.renderIntoDocument(<AddTodo />);
    expect(component).toExist();
  });

  it('should dispatch ADD_TODO when valid todo text data', () => {
    var todoText = 'Check Mail';
    var spy = expect.createSpy();
    var action = actions.startAddTodo(todoText);
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]); // Ritorna un array per questo uso [0]

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TODO with invalid input', () => {
    var todoText = '';
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
    var $el = $(ReactDOM.findDOMNode(addTodo));
    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]); // Ritorna un array per questo uso [0]

    expect(spy).toNotHaveBeenCalled();
  });
});
