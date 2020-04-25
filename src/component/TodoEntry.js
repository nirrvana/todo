import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteTodo,
  updateTodo,
  submitTodo,
  completeTodo,
} from '../redux/action';
import { Row, Col } from 'react-bootstrap';

class TodoEntry extends Component {
  state = {
    isEditMode: false,
    isUpdateMode: false,
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
        this.setState({ isUpdateMode: false });
      }
    }
  };

  renderTodo = () => {
    const {
      index: todoIndex,
      todo,
      groupList,
      selectedIndex,
      dispatchCompleteTodo,
    } = this.props;
    const selectedGroup = groupList.filter(
      (_group, index) => index === selectedIndex,
    )[0];
    const completionState = selectedGroup.todoList[todoIndex].completed;

    return (
      <Row noGutters={true} className="todo-entry-wrapper__todo">
        <Col md={1}>
          <input
            className="todo-entry-wrapper__check-box"
            type="checkbox"
            checked={completionState}
            onChange={() => dispatchCompleteTodo(todoIndex)}
          />
        </Col>
        <Col md={10}>
          <div
            className="todo-entry-wrapper__content"
            onClick={() => this.setState({ isUpdateMode: true })}
          >
            {todo.content}
          </div>
        </Col>
        <Col md={1}>{this.renderDeleteTodoButton()}</Col>
      </Row>
    );
  };

  renderDeleteTodoButton = () => {
    const { isEditMode, isUpdateMode } = this.state;
    if (isEditMode && !isUpdateMode) {
      return (
        <button
          className="todo-entry__delete-todo-button"
          onClick={this.deleteTodo}
        >
          X
        </button>
      );
    }
  };

  renderTodoInput = () => {
    const { index: todoIndex, groupListForEdit, selectedIndex } = this.props;
    const selectedGroupForEdit = groupListForEdit.filter(
      (_group, index) => index === selectedIndex,
    )[0];
    const todoContentForEdit = selectedGroupForEdit.todoList[todoIndex].content;

    return (
      <Col md={10}>
        <input
          className="todo-entry-wrapper__input"
          autoFocus
          value={todoContentForEdit}
          onChange={this.updateTodoContent}
          onKeyDown={this.submitTodoContent}
        />
      </Col>
    );
  };

  renderTodoOrInput = () => {
    const { todo } = this.props;
    const { isUpdateMode } = this.state;

    if (isUpdateMode) {
      return this.renderTodoInput();
    } else if (!isUpdateMode && !todo.completed) {
      return this.renderTodo();
    }
  };

  render() {
    return (
      <Row
        noGutters={true}
        className="todo-entry-wrapper"
        onMouseEnter={() => this.setState({ isEditMode: true })}
        onMouseLeave={() => this.setState({ isEditMode: false })}
      >
        {this.renderTodoOrInput()}
      </Row>
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
