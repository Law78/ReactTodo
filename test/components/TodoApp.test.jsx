const React = require('react');
const TestUtils = require('react-addons-test-utils');

const expect = require('expect');

const TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    const component = TestUtils.renderIntoDocument(<TodoApp />);
    expect(component).toExist();
  });
});
