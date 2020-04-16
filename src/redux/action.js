export const SELECT_GROUP = 'SELECT_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const RENAME_GROUP = 'RENAME_GROUP';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SUBMIT_TODO = 'SUBMIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

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

export const updateGroup = (index, name) => ({
  type: UPDATE_GROUP,
  index,
  name,
});

export const renameGroup = () => ({
  type: RENAME_GROUP,
});

export const addTodo = (content) => ({
  type: ADD_TODO,
  content,
});

export const deleteTodo = (index) => ({
  type: DELETE_TODO,
  index,
});

export const updateTodo = (index, content) => ({
  type: UPDATE_TODO,
  index,
  content,
});

export const submitTodo = () => ({
  type: SUBMIT_TODO,
});

export const completeTodo = (index) => ({
  type: COMPLETE_TODO,
  index,
});
