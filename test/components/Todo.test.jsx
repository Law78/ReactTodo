var React = require('react');
// Test require
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
// Component require
var Todo = require('Todo');

describe('Todo', () =>{
  it('should exist', () => {
    var component = TestUtils.renderIntoDocument(<div><Todo /></div>);
    expect(component).toExist();
  });
});
