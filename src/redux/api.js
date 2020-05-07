export default class Api {
  static getGroupList = () => localStorage.getItem('groupList');

  static addGroup = (name) => {
    const newGroup = { name, todoList: [] };
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = [...oldGroupList, newGroup];

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static deleteGroup = (groupIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.filter(
      (_group, index) => index !== groupIndex,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static renameGroup = (groupIndex, name) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((group, index) =>
      index === groupIndex ? { ...group, name } : group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static addTodo = (selectedGroupIndex, content) => {
    const newTodo = { content, completed: false };
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((group, index) => {
      return {
        ...group,
        todoList:
          index === selectedGroupIndex
            ? [...group.todoList, newTodo]
            : group.todoList,
      };
    });

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static deleteTodo = (selectedGroupIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((group, index) =>
      index === selectedGroupIndex
        ? {
            ...group,
            todoList: group.todoList.filter(
              (_todo, index) => index !== todoIndex,
            ),
          }
        : group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static submitTodo = (selectedGroupIndex, todoIndex, content) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((group, index) =>
      index === selectedGroupIndex
        ? {
            ...group,
            todoList: group.todoList.map((todo, index) =>
              index === todoIndex ? { ...todo, content } : todo,
            ),
          }
        : group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static completeTodo = (selectedGroupIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((group, index) =>
      index === selectedGroupIndex
        ? {
            ...group,
            todoList: group.todoList.map((todo, index) =>
              index === todoIndex ? { ...todo, completed: true } : todo,
            ),
          }
        : group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };
}
