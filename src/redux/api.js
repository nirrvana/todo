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
}
