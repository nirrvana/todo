import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../redux/action';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import '../css/TodoEntry.css';
import { isEmpty } from '../helper';

class TodoEntry extends Component {
  state = {
    isEditMode: false,
    isUpdateMode: false,
  };

  updateTodoContent = ({ target: { value: content } }) => {
    const { index, dispatchUpdateTodo } = this.props;
    dispatchUpdateTodo(index, content);
  };

  submitTodoContent = (content) => ({ key, type }) => {
    if (key === 'Enter' || type === 'click') {
      if (isEmpty(content)) {
        window.alert('Please input todo content');
      } else {
        this.props.dispatchSubmitTodo(this.props.index, content);
        this.setState({ isUpdateMode: false });
      }
    }
  };

  renderTodo = () => {
    const { index: todoIndex, todo, dispatchCompleteTodo } = this.props;

    return (
      <Row
        noGutters={true}
        className="todo-entry-container__wrapper flex-nowrap"
      >
        <Col className="todo-entry-container__check-box-area">
          <input
            className="todo-entry-container__check-box"
            type="checkbox"
            checked={todo.completed}
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
    const {
      state: { isEditMode, isUpdateMode },
      props: { index, dispatchDeleteTodo },
    } = this;

    if (isEditMode && !isUpdateMode) {
      return (
        <Button
          size="sm"
          className="todo-entry-container__delete-button"
          onClick={() => dispatchDeleteTodo(index)}
        >
          X
        </Button>
      );
    }
  };

  renderTodoInput = () => {
    const {
      index: todoIndex,
      groupListForEdit,
      selectedGroupIndex,
    } = this.props;
    const selectedGroupForEdit = groupListForEdit.filter(
      (_group, index) => index === selectedGroupIndex,
    )[0];
    const todoContentForEdit = selectedGroupForEdit.todoList[todoIndex].content;

    return (
      <Row noGutters={true} className="todo-entry-container__wrapper">
        <Col className="todo-entry-container__input-group-area">
          <InputGroup className="mb-3 todo-entry-container__input-group">
            <Form.Control
              autoFocus
              className="todo-entry-container__form-control"
              value={todoContentForEdit}
              onChange={this.updateTodoContent}
              onKeyDown={this.submitTodoContent(todoContentForEdit)}
            />
            <InputGroup.Append>
              <Button
                size="sm"
                onClick={this.submitTodoContent(todoContentForEdit)}
              >
                edit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
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
        fluid
        className="todo-entry-container"
        onMouseEnter={() => this.setState({ isEditMode: true })}
        onMouseLeave={() => this.setState({ isEditMode: false })}
      >
        {this.renderTodoOrInput()}
      </Container>
    );
  }
}

const mapStateToProps = ({
  groupList,
  groupListForEdit,
  selectedGroupIndex,
}) => ({
  groupList,
  groupListForEdit,
  selectedGroupIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteTodo: (index) => dispatch(Action.deleteTodo(index)),
  dispatchUpdateTodo: (index, content) =>
    dispatch(Action.updateTodo(index, content)),
  dispatchSubmitTodo: (index, content) =>
    dispatch(Action.submitTodo(index, content)),
  dispatchCompleteTodo: (index) => dispatch(Action.completeTodo(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoEntry);
