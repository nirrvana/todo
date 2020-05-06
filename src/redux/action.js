export const GET_GROUP_LIST = 'GET_GROUP_LIST';
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

export default class Action {
  static getGroupList = () => ({
    type: GET_GROUP_LIST,
  });

  static selectGroup = (index) => ({
    type: SELECT_GROUP,
    index,
  });

  static addGroup = (name) => ({
    type: ADD_GROUP,
    name,
  });

  static deleteGroup = (index) => ({
    type: DELETE_GROUP,
    index,
  });

  static updateGroup = (index, name) => ({
    type: UPDATE_GROUP,
    index,
    name,
  });

  static renameGroup = (index, name) => ({
    type: RENAME_GROUP,
    index,
    name,
  });

  static addTodo = (content) => ({
    type: ADD_TODO,
    content,
  });

  static deleteTodo = (index) => ({
    type: DELETE_TODO,
    index,
  });

  static updateTodo = (index, content) => ({
    type: UPDATE_TODO,
    index,
    content,
  });

  static submitTodo = () => ({
    type: SUBMIT_TODO,
  });

  static completeTodo = (index) => ({
    type: COMPLETE_TODO,
    index,
  });
}
