var React = require('react');
var ReactDOM = require('react-dom');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var {TodoSearch} = require('TodoSearch');
//var $ = require('jquery');

describe('TodoSearch', () =>{

  it('should exist', () => {
    var spy = expect.createSpy();
    //var component = TestUtils.renderIntoDocument(<TodoSearch onSearchText={spy} />);
    expect(TodoSearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input text change', () => {
    var spy = expect.createSpy();
    var searchText = 'Hello World'
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText
    };
    var component = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);
    component.refs.searchText.value = searchText;
    TestUtils.Simulate.change(component.refs.searchText);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
    var spy = expect.createSpy();
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    }
    var component = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);
    component.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(component.refs.showCompleted);
    expect(spy).toHaveBeenCalledWith(action);
  });

});
