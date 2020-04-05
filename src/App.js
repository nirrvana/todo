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
    this.setState(({ groupList }) => ({
      groupList: [...groupList, { name, todoList: [] }],
      selectedIndex: groupList.length,
    }));
  };

  selectGroup = (index) => {
    this.setState({ selectedIndex: index });
  };

  renderTodoList = (groupList, selectedIndex, addTodo) => {
    if (selectedIndex !== null) {
      const selectedGroup = groupList[selectedIndex];
      const todoList = selectedGroup['todoList'];

      return <TodoList todoList={todoList} addTodo={addTodo} />;
    }
  };

  addTodo = (content) => {
    const newTodo = { content, completed: false };

    this.setState(({ groupList, selectedIndex }) => ({
      groupList: groupList.map((group, index) => {
        if (index === selectedIndex) {
          return {
            ...group,
            todoList: [...group.todoList, newTodo],
          };
        } else {
          return group;
        }
      }),
    }));
  };

  render() {
    const {
      state: { groupList, selectedIndex },
      addGroup,
      selectGroup,
      addTodo,
    } = this;

    return (
      <div className="App">
        <GroupList
          groupList={groupList}
          addGroup={addGroup}
          selectGroup={selectGroup}
        />
        {this.renderTodoList(groupList, selectedIndex, addTodo)}
      </div>
    );
  }
}

export default App;
