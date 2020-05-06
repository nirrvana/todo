export default class Api {
  static getGroupList = () => localStorage.getItem('groupList');

  static addGroup = (name) => {
    const newGroup = { name, todoList: [] };
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = [...oldGroupList, newGroup];

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static deleteGroup = (index) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.filter(
      (_group, _index) => _index !== index,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static renameGroup = (index, name) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((_group, _index) =>
      _index === index ? { ..._group, name } : _group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static addTodo = (selectedIndex, content) => {
    const newTodo = { content, completed: false };
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((_group, _index) => {
      return {
        ..._group,
        todoList:
          selectedIndex === _index
            ? [..._group.todoList, newTodo]
            : _group.todoList,
      };
    });

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static deleteTodo = (selectedIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((_group, _index) =>
      _index === selectedIndex
        ? {
            ..._group,
            todoList: _group.todoList.filter(
              (_todo, _index) => _index !== todoIndex,
            ),
          }
        : _group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static submitTodo = (selectedIndex, todoIndex, content) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((_group, _index) =>
      _index === selectedIndex
        ? {
            ..._group,
            todoList: _group.todoList.map((_todo, _index) =>
              _index === todoIndex ? { ..._todo, content } : _todo,
            ),
          }
        : _group,
    );

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static completeTodo = (selectedIndex, todoIndex) => {
    const oldGroupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = oldGroupList.map((group, index) =>
      index === selectedIndex
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
