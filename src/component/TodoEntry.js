import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../redux/action';
class TodoEntry extends Component {
  state = {
    isEditMode: false,
  };

  toggleEditMode = () => {
    this.setState(({ isEditMode }) => ({ isEditMode: !isEditMode }));
  };

  deleteTodo = () => {
    const { index, dispatchDeleteTodo } = this.props;
    dispatchDeleteTodo(index);
  };

  renderDeleteTodoButton = (isEditMode, deleteTodo) => {
    if (isEditMode) {
      return (
        <button className="todo-entry__delete-todo-button" onClick={deleteTodo}>
          X
        </button>
      );
    }
  };

  render() {
    const {
      props: { todo },
      state: { isEditMode },
      toggleEditMode,
      deleteTodo,
    } = this;

    return (
      <div onMouseEnter={toggleEditMode} onMouseLeave={toggleEditMode}>
        <li>{todo.content}</li>
        {this.renderDeleteTodoButton(isEditMode, deleteTodo)}
      </div>
    );
  }
}

const mapStateToProps = ({ groupList, selectedIndex }) => {
  return { groupList, selectedIndex };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteTodo: (content) => dispatch(deleteTodo(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoEntry);
