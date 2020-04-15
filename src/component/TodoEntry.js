import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/action';
class TodoEntry extends Component {
  state = {
    isEditMode: false,
    isUpdateMode: false,
    todoContent: this.props.todo.content,
  };

  toggleEditMode = () => {
    this.setState(({ isEditMode }) => ({ isEditMode: !isEditMode }));
  };

  toggleUpdateMode = () => {
    this.setState(({ isUpdateMode }) => ({ isUpdateMode: !isUpdateMode }));
  };

  deleteTodo = () => {
    const { index, dispatchDeleteTodo } = this.props;
    dispatchDeleteTodo(index);
  };

  updateTodoContent = ({ target: { value: todoContent } }) => {
    this.setState({ todoContent });
  };

  isEmpty = (content) => !/\S/.test(content);

  submitTodo = ({ key, target: { value: content } }) => {
    const { index, dispatchUpdateTodo } = this.props;
    if (key === 'Enter') {
      if (this.isEmpty(content)) {
        window.alert('Please input todo content');
      } else {
        dispatchUpdateTodo(index, content);
        this.toggleUpdateMode();
      }
    }
  };

  renderTodo = (isUpdateMode, todo, toggleUpdateMode) => {
    if (!isUpdateMode) {
      return (
        <li className="todo-entry_entry" onClick={toggleUpdateMode}>
          {todo.content}
        </li>
      );
    }
  };

  renderDeleteTodoButton = (isEditMode, isUpdateMode, deleteTodo) => {
    if (isEditMode && !isUpdateMode) {
      return (
        <button className="todo-entry__delete-todo-button" onClick={deleteTodo}>
          X
        </button>
      );
    }
  };

  renderUpdateTodoInput = (
    isUpdateMode,
    todoContent,
    updateTodoContent,
    submitTodo,
  ) => {
    if (isUpdateMode) {
      return (
        <input
          autoFocus
          value={todoContent}
          onChange={updateTodoContent}
          onKeyDown={submitTodo}
        />
      );
    }
  };

  render() {
    const {
      props: { todo },
      state: { isEditMode, isUpdateMode, todoContent },
      toggleEditMode,
      toggleUpdateMode,
      deleteTodo,
      updateTodoContent,
      submitTodo,
    } = this;

    return (
      <div onMouseEnter={toggleEditMode} onMouseLeave={toggleEditMode}>
        {this.renderTodo(isUpdateMode, todo, toggleUpdateMode)}
        {this.renderDeleteTodoButton(isEditMode, isUpdateMode, deleteTodo)}
        {this.renderUpdateTodoInput(
          isUpdateMode,
          todoContent,
          updateTodoContent,
          submitTodo,
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ groupList, selectedIndex }) => {
  return { groupList, selectedIndex };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteTodo: (content) => dispatch(deleteTodo(content)),
  dispatchUpdateTodo: (index, content) => dispatch(updateTodo(index, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoEntry);
