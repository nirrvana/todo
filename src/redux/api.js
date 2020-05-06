export default class Api {
  static getGroupList = () => localStorage.getItem('groupList');

  static addGroup = (name) => {
    const newGroup = { name, todoList: [] };
    const groupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = [...groupList, newGroup];

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };

  static deleteGroup = (index) => {
    const groupList = JSON.parse(localStorage.getItem('groupList'));
    const filteredGroupList = groupList.filter(
      (_group, _index) => _index !== index,
    );

    localStorage.setItem('groupList', JSON.stringify(filteredGroupList));
    return localStorage.getItem('groupList');
  };
}
