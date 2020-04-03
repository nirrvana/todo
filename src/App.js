import React, { Component } from 'react';
import './App.css';
import GroupList from './GroupList';

class App extends Component {
  state = {
    todoGroupList: [{ title: 'sally' }, { title: 'sun' }],
    selectedIndex: null,
  };

  addGroup = (title) => {
    this.setState({
      todoGroupList: [...this.state.todoGroupList, { title }],
    });
  };

  render() {
    const {
      state: { todoGroupList },
      addGroup,
    } = this;
    return (
      <div className="App">
        <GroupList todoGroupList={todoGroupList} addGroup={addGroup} />
      </div>
    );
  }
}

export default App;
