import React, { Component } from 'react';
import './App.css';
import GroupList from './GroupList';
import TodoList from './TodoList';

class App extends Component {
  state = {
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

  addGroup = (name) => {
    const { groupList } = this.state;

    this.setState({
      groupList: [...groupList, { name }],
      selectedIndex: groupList.length,
    });
  };

  selectGroup = (index) => {
    this.setState({ selectedIndex: index });
  };

  renderTodoList = (groupList, selectedIndex) => {
    if (selectedIndex !== null) {
      const selectedGroup = groupList[selectedIndex];
      const todoList = selectedGroup.todoList;

      if (todoList) {
        return <TodoList todoList={selectedGroup.todoList} />;
      }
    }
  };

  render() {
    const {
      state: { groupList, selectedIndex },
      addGroup,
      selectGroup,
    } = this;

    return (
      <div className="App">
        <GroupList
          groupList={groupList}
          addGroup={addGroup}
          selectGroup={selectGroup}
        />
        {this.renderTodoList(groupList, selectedIndex)}
      </div>
    );
  }
}

export default App;
