import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteTodo,
  updateTodo,
  submitTodo,
  completeTodo,
} from '../redux/action';
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

  renderTodo = (isUpdateMode, todoIndex, todo, toggleUpdateMode) => {
    if (!isUpdateMode && !todo.completed) {
      const { groupList, selectedIndex, dispatchCompleteTodo } = this.props;
      const selectedGroup = groupList.filter(
        (_group, index) => index === selectedIndex,
      )[0];
      const completionState = selectedGroup.todoList[todoIndex].completed;

      return (
        <div>
          <input
            type="checkbox"
            checked={completionState}
            onChange={() => dispatchCompleteTodo(todoIndex)}
          />
          <span className="todo-entry_entry" onClick={toggleUpdateMode}>
            {todo.content}
          </span>
        </div>
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
        {this.renderTodo(isUpdateMode, todoIndex, todo, toggleUpdateMode)}
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
  dispatchCompleteTodo: (index) => dispatch(completeTodo(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoEntry);
