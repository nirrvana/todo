export const SELECT_GROUP = 'SELECT_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const ADD_TODO = 'ADD_TODO';

export const selectGroup = (index) => ({
  type: SELECT_GROUP,
  index,
});

export const addGroup = (name) => ({
  type: ADD_GROUP,
  name,
});

export const addTodo = (content) => ({
  type: ADD_TODO,
  content,
});
