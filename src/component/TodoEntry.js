import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, updateTodo, submitTodo } from '../redux/action';
class TodoEntry extends Component {
  state = {
    isEditMode: false,
    isUpdateMode: false,
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

  updateTodoContent = ({ target: { value: content } }) => {
    const { index, dispatchUpdateTodo } = this.props;
    dispatchUpdateTodo(index, content);
  };

  isEmptyTodo = (content) => !/\S/.test(content);

  submitTodoContent = ({ key, target: { value: content } }) => {
    if (key === 'Enter') {
      if (this.isEmptyTodo(content)) {
        window.alert('Please input todo content');
      } else {
        this.props.dispatchSubmitTodo();
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
    todoIndex,
    updateTodoContent,
    submitTodoContent,
  ) => {
    if (isUpdateMode) {
      const { groupListForEdit, selectedIndex } = this.props;
      const selectedGroupForEdit = groupListForEdit.filter(
        (_group, index) => index === selectedIndex,
      )[0];
      const todoContentForEdit =
        selectedGroupForEdit.todoList[todoIndex].content;

      return (
        <input
          autoFocus
          value={todoContentForEdit}
          onChange={updateTodoContent}
          onKeyDown={submitTodoContent}
        />
      );
    }
  };

  render() {
    const {
      props: { todo, index: todoIndex },
      state: { isEditMode, isUpdateMode },
      toggleEditMode,
      toggleUpdateMode,
      deleteTodo,
      updateTodoContent,
      submitTodoContent,
    } = this;

    return (
      <div onMouseEnter={toggleEditMode} onMouseLeave={toggleEditMode}>
        {this.renderTodo(isUpdateMode, todo, toggleUpdateMode)}
        {this.renderDeleteTodoButton(isEditMode, isUpdateMode, deleteTodo)}
        {this.renderUpdateTodoInput(
          isUpdateMode,
          todoIndex,
          updateTodoContent,
          submitTodoContent,
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ groupList, groupListForEdit, selectedIndex }) => ({
  groupList,
  groupListForEdit,
  selectedIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteTodo: (content) => dispatch(deleteTodo(content)),
  dispatchUpdateTodo: (index, content) => dispatch(updateTodo(index, content)),
  dispatchSubmitTodo: () => dispatch(submitTodo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoEntry);
