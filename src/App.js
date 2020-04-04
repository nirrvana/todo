import React, { Component } from 'react';
import './App.css';
import GroupList from './GroupList';

class App extends Component {
  state = {
    groupList: [{ name: 'sally' }, { name: 'sun' }],
    selectedIndex: null,
  };

  addGroup = (name) => {
    this.setState({
      groupList: [...this.state.groupList, { name }],
    });
  };

  render() {
    const {
      state: { groupList },
      addGroup,
    } = this;
    return (
      <div className="App">
        <GroupList groupList={groupList} addGroup={addGroup} />
      </div>
    );
  }
}

export default App;
