const reducers = require('reducers');
const expect = require('expect');
const freeze = require('deep-freeze-strict');

describe('Reducers', () => {
  describe('searchTextReducers', () => {
    it('should set searchText', () => {
      const action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Some Text'
      },
        res = reducers.searchTextReducers(freeze(''), freeze(action));
      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducers', () => {
    it('should change show completed flag', () => {
      const state = false,
        action = {
          type: 'TOGGLE_SHOW_COMPLETED'
        },
        res = reducers.showCompletedReducers(freeze(state), freeze(action));
      expect(res).toBe(!state);
    });
  });

});