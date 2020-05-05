export default class Api {
  static getGroupList = () => localStorage.getItem('groupList');

  static addGroup = (name) => {
    const newGroup = { name, todoList: [] };
    const groupList = JSON.parse(localStorage.getItem('groupList'));
    const newGroupList = [...groupList, newGroup];

    localStorage.setItem('groupList', JSON.stringify(newGroupList));
    return localStorage.getItem('groupList');
  };
}
