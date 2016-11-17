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

  describe('todosReducers', () => {
    it('should add new Todo', () => {
      const action = {
        type: 'ADD_TODO',
        text: 'Some Text',
      },
        res = reducers.todosReducers(freeze([]), freeze(action));
      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });
    it('should toggle todo', () => {
      const state = [
        {id:10, text: 'Todo Text', completed: true, createdAt: 123, completedAt: 125}
      ];
      const action = {
        type: 'TOGGLE_TODO',
        id: 10
      };
      const res = reducers.todosReducers(freeze(state),freeze(action));
      expect(res.length).toEqual(1);
      expect(res[0].completed).toEqual(false);
      expect(res[0].completedAt).toEqual(undefined);
    });
    it('should return the same state when id isn\'t found ', () => {
      const state = [
        {id:10, text: 'Todo Text', completed: false, createdAt: 123, completedAt: undefined}
      ];
      const action = {
        type: 'TOGGLE_TODO',
        id: 20
      };
      const res = reducers.todosReducers(freeze(state),freeze(action));
      expect(res.length).toEqual(1);
      expect(res[0].completed).toEqual(false);
    })
  });

});