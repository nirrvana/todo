import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupList from './component/GroupList';
import TodoList from './component/TodoList';
import './App.css';

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

const mapStateToProps = ({ selectedIndex }) => ({ selectedIndex });

export default connect(mapStateToProps)(App);
