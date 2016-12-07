// Action Generators che ritorna una Action con il searchText specificato

/*
Un componente React deve occuparsi solo della parte View e quindi non deve sapere come l'eventuale
stato viene "salvato". Quindi si occupa solo di fare il DISPATCH.
I reducers devono essere PURE FUNCTIONS e quindi non devono fare chiamate ESTERNE.
PERTANTO questo è il posto dove interagire con API ESTERNE ASINCRONE, ed è per questo che ho bisogno di REDUX THUNK. Un MIDDLEWARE di Redux che applico allo STORE.
*/
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

// Funzioni Async
const TodoAPI = require('TodoAPI'),
      uuid = require('node-uuid'), // per firebase nn mi serve, mi serve solo per il fake server
      moment = require('moment');
import firebase, {firebaseRef} from 'app/firebase/';

/*export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo =  {
      completed: false,
      text,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);
    
    todoRef.then( () => {
      dispatch(addTodo({
        ...todo, id: todoRef.key
      }));
    });
  };
};*/

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};

export function addTodoAPI(text){
  return dispatch => {
    TodoAPI.setTodos({
      id: uuid(),
      completed: false,
      text,
      createdAt: moment().unix(),
      completedAt: undefined
    });
  }

};

export function updateTodoAPI(todo){
  return dispatch => {
    console.log('TODOAPI', todo)
    TodoAPI.updateTodo({
      id: todo.id,
      text: todo.text,
      completed: !todo.completed,
      completedAt: (!todo.completed===true) ? moment().unix() : 'undefined'
    });
  }
}