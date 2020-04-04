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

  selectGroup = (index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const {
      state: { groupList },
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
      </div>
    );
  }
}

export default App;
