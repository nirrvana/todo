import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteTodo,
  updateTodo,
  submitTodo,
  completeTodo,
} from '../redux/action';
import { Container, Row, Col } from 'react-bootstrap';

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
      <Row
        noGutters={true}
        className="todo-entry-container__wrapper flex-nowrap"
      >
        <Col className="todo-entry-container__check-box-area">
          <input
            className="todo-entry-container__check-box"
            type="checkbox"
            checked={completionState}
            onChange={() => dispatchCompleteTodo(todoIndex)}
          />
        </Col>
        <Col className="todo-entry-container__content-area">
          <div
            className="todo-entry-container__content"
            onClick={() => this.setState({ isUpdateMode: true })}
          >
            {todo.content}
          </div>
        </Col>
        <Col className="todo-entry-container__delete-button-area">
          {this.renderDeleteTodoButton()}
        </Col>
      </Row>
    );
  };

  renderDeleteTodoButton = () => {
    const { isEditMode, isUpdateMode } = this.state;
    if (isEditMode && !isUpdateMode) {
      return (
        <button
          className="todo-entry-container__delete-button"
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
      <Row noGutters={true} className="todo-entry-container__input-area">
        <input
          className="todo-entry-container__input"
          autoFocus
          value={todoContentForEdit}
          onChange={this.updateTodoContent}
          onKeyDown={this.submitTodoContent}
        />
      </Row>
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
      <Container
        className="todo-entry-container"
        onMouseEnter={() => this.setState({ isEditMode: true })}
        onMouseLeave={() => this.setState({ isEditMode: false })}
      >
        {this.renderTodoOrInput()}
      </Container>
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
