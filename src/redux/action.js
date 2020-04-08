export const SELECT_GROUP = 'SELECT_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const RENAME_GROUP = 'RENAME_GROUP';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const selectGroup = (index) => ({
  type: SELECT_GROUP,
  index,
});

export const addGroup = (name) => ({
  type: ADD_GROUP,
  name,
});

export const deleteGroup = (index) => ({
  type: DELETE_GROUP,
  index,
});

export const renameGroup = (index, name) => ({
  type: RENAME_GROUP,
  index,
  name,
});

export const addTodo = (content) => ({
  type: ADD_TODO,
  content,
});

export const deleteTodo = (index) => ({
  type: DELETE_TODO,
  index,
});
