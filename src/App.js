import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import GroupList from './component/GroupList';
import TodoList from './component/TodoList';

class App extends Component {
  renderTodoList = () => {
    if (this.props.selectedIndex !== null) {
      return <TodoList />;
    }
  };

  render() {
    return (
      <div className="App">
        <GroupList />
        {this.renderTodoList()}
      </div>
    );
  }
}

const mapStateToProps = ({ groupList, selectedIndex }) => ({
  groupList,
  selectedIndex,
});

export default connect(mapStateToProps)(App);
