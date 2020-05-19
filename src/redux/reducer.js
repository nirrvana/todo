import {
  GET_GROUP_LIST,
  SELECT_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
  RENAME_GROUP,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SUBMIT_TODO,
  COMPLETE_TODO,
} from './action';

import Api from './api';

const initialState = {
  groupList: [],
  groupListForEdit: [],
  selectedGroupIndex: null,
};

const reducer = (state = initialState, action) => {
  let { groupListForEdit, selectedGroupIndex } = state;
  let groupListData = [];

  switch (action.type) {
    case GET_GROUP_LIST:
      groupListData = JSON.parse(Api.getGroupList());
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    case SELECT_GROUP:
      return {
        ...state,
        selectedGroupIndex: action.index,
      };
    case ADD_GROUP:
      groupListData = JSON.parse(Api.addGroup(action.name));
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    case DELETE_GROUP:
      groupListData = JSON.parse(Api.deleteGroup(action.index));
      return {
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
        selectedGroupIndex:
          selectedGroupIndex === action.index
            ? null
            : selectedGroupIndex > action.index
            ? selectedGroupIndex - 1
            : selectedGroupIndex,
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groupListForEdit: groupListForEdit.map((group, index) =>
          index === action.index ? { ...group, name: action.name } : group,
        ),
      };
    case RENAME_GROUP:
      groupListData = JSON.parse(Api.renameGroup(action.index, action.name));
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    case ADD_TODO:
      groupListData = JSON.parse(
        Api.addTodo(selectedGroupIndex, action.content),
      );
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    case DELETE_TODO:
      groupListData = JSON.parse(
        Api.deleteTodo(selectedGroupIndex, action.index),
      );
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    case UPDATE_TODO:
      return {
        ...state,
        groupListForEdit: groupListForEdit.map((group, index) =>
          index === selectedGroupIndex
            ? {
                ...group,
                todoList: group.todoList.map((todo, index) =>
                  index === action.index
                    ? { ...todo, content: action.content }
                    : todo,
                ),
              }
            : group,
        ),
      };
    case SUBMIT_TODO:
      groupListData = JSON.parse(
        Api.submitTodo(selectedGroupIndex, action.index, action.content),
      );
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    case COMPLETE_TODO:
      groupListData = JSON.parse(
        Api.completeTodo(selectedGroupIndex, action.index),
      );
      return {
        ...state,
        groupList: [...groupListData],
        groupListForEdit: [...groupListData],
      };
    default:
      return state;
  }
};

export default reducer;
