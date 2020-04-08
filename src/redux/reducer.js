import {
  SELECT_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  RENAME_GROUP,
  ADD_TODO,
  DELETE_TODO,
} from './action';

const initialState = {
  groupList: [
    {
      name: 'coding',
      todoList: [
        { content: 'todo app', completed: false },
        { content: 'next.js', completed: false },
      ],
    },
  ],
  selectedIndex: null,
};

const reducer = (state = initialState, action) => {
  let { groupList, selectedIndex } = state;
  switch (action.type) {
    case SELECT_GROUP:
      return {
        ...state,
        selectedIndex: action.index,
      };
    case ADD_GROUP:
      return {
        groupList: [...groupList, { name: action.name, todoList: [] }],
        selectedIndex: groupList.length,
      };
    case DELETE_GROUP:
      return {
        groupList: groupList.filter((_group, index) => index !== action.index),
        selectedIndex: null,
      };
    case RENAME_GROUP:
      return {
        ...state,
        groupList: groupList.map((group, index) =>
          index === action.index ? { ...group, name: action.name } : group,
        ),
      };
    case ADD_TODO:
      return {
        ...state,
        groupList: groupList.map((group, index) => {
          return {
            ...group,
            todoList:
              index === selectedIndex
                ? [
                    ...group.todoList,
                    { content: action.content, completed: false },
                  ]
                : group.todoList,
          };
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        groupList: groupList.map((group, index) =>
          index === selectedIndex
            ? {
                ...group,
                todoList: group.todoList.filter(
                  (_todo, index) => index !== action.index,
                ),
              }
            : group,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
