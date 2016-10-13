var React = require('react');
var ReactDOM = require('react-dom');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var TodoSearch = require('TodoSearch');
var $ = require('jquery');

describe('TodoSearch', () =>{

  it('should exist', () => {
    var spy = expect.createSpy();
    var component = TestUtils.renderIntoDocument(<TodoSearch onSearchText={spy} />);
    expect(component).toExist();
  });

  it('should call onSearchText with entered input text', () => {
    var spy = expect.createSpy();
    var searchText = 'Hello World'
    var component = TestUtils.renderIntoDocument(<TodoSearch onSearchText={spy} />);
    component.refs.searchText.value = searchText;
    TestUtils.Simulate.change(component.refs.searchText);
    expect(spy).toHaveBeenCalledWith(false, 'Hello World');
  });

  it('should call onSearchText will proper checked value', () => {
    var spy = expect.createSpy();
    var component = TestUtils.renderIntoDocument(<TodoSearch onSearchText={spy} />);
    component.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(component.refs.showCompleted);
    expect(spy).toHaveBeenCalledWith(true, '');
  });

});
