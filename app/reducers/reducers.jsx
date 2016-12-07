const uuid = require('node-uuid'),
      moment = require('moment');

export const searchTextReducers = (state = '', action) => {
  switch(action.type){
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export const showCompletedReducers = (state = false, action) => {
  switch(action.type){
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  };
};

export const todosReducers = (state = [], action) => {
  switch(action.type){
 
    case 'ADD_TODO':
      return [...state, 
        action.todo
      ];
    case 'ADD_TODOS':
      return [
        ...state, ...action.todos
      ];
    case 'TOGGLE_TODO':
      //state.slice()
      return state.map(function(elem){
        if(elem.id===action.id){
          return {...elem, completed:!elem.completed, 
            completedAt:(!elem.completed===true) ? moment().unix() : undefined};
        }
        return elem;
      });
    default:
      return state;
  };
};
