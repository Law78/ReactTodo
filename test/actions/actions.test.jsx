import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const expect = require('expect');
const actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    // Creo una action
    const action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    const res = actions.setSearchText(action.searchText);
    // Mi aspetto che l'action restituita sia la stessa
    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    const todo = {
      id: 1111,
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    };
    const action = {
      type: 'ADD_TODO',
      todo
    },
      res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'My todo item';

    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });

  it('should generate add todos action', () => {
    var todos = [{
      id: 1111,
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];
    const action = {
      type: 'ADD_TODOS',
      todos
    },
      res = actions.addTodos(action.todos);
    expect(res).toEqual(action);
  })

  it('should generate toggle show completed action', () => {
    const action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    },
      res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    const action = {
      type: 'TOGGLE_TODO',
      id: '100'
    },
      res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  })
});