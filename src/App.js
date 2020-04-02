import React, { Component } from 'react';
import './App.css';
import GroupList from './GroupList';

class App extends Component {
  state = {
    todoGroupList: [{ title: 'sally' }, { title: 'sun' }],
    selectedIndex: null,
  };

  render() {
    const { todoGroupList } = this.state;
    return (
      <div className="App">
        <GroupList todoGroupList={todoGroupList} />
      </div>
    );
  }
}

export default App;
