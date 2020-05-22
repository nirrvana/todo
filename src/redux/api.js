export default class Api {
  static getGroupList = () => {
    const groupListData = JSON.parse(localStorage.getItem('groupList'));
    const groupList = JSON.stringify(
      Array.isArray(groupListData) ? groupListData : [],
    );
    return groupList;
  };

  static addGroup = (name) => {
    const newGroup = { name, todoList: [] };
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      Array.isArray(oldGroupList) ? [...oldGroupList, newGroup] : [newGroup],
    );
    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static deleteGroup = (groupIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.filter((_group, index) => index !== groupIndex),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static renameGroup = (groupIndex, name) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.map((group, index) =>
        index === groupIndex ? { ...group, name } : group,
      ),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static addTodo = (selectedGroupIndex, content) => {
    const newTodo = { content, completed: false };
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.map((group, index) =>
        index === selectedGroupIndex
          ? {
              ...group,
              todoList: [...group.todoList, newTodo],
            }
          : group,
      ),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static deleteTodo = (selectedGroupIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.map((group, index) =>
        index === selectedGroupIndex
          ? {
              ...group,
              todoList: group.todoList.filter(
                (_todo, index) => index !== todoIndex,
              ),
            }
          : group,
      ),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static submitTodo = (selectedGroupIndex, todoIndex, content) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.map((group, index) =>
        index === selectedGroupIndex
          ? {
              ...group,
              todoList: group.todoList.map((todo, index) =>
                index === todoIndex ? { ...todo, content } : todo,
              ),
            }
          : group,
      ),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static completeTodo = (selectedGroupIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.map((group, index) =>
        index === selectedGroupIndex
          ? {
              ...group,
              todoList: group.todoList.map((todo, index) =>
                index === todoIndex ? { ...todo, completed: true } : todo,
              ),
            }
          : group,
      ),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };

  static incompleteTodo = (selectedGroupIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = JSON.stringify(
      oldGroupList.map((group, index) =>
        index === selectedGroupIndex
          ? {
              ...group,
              todoList: group.todoList.map((todo, index) =>
                index === todoIndex ? { ...todo, completed: false } : todo,
              ),
            }
          : group,
      ),
    );

    localStorage.setItem('groupList', newGroupList);
    return newGroupList;
  };
}
