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
  }
}

export const toggleTodoReducers = (state, action) => {
  switch(action.type){
    default:
      return state;
  }
}