import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../redux/action';
import TodoEntry from './TodoEntry';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  InputGroup,
  Modal,
  Alert,
} from 'react-bootstrap';
import {
  BsFillCaretRightFill as OpenCompletedTodoIcon,
  BsFillCaretDownFill as CloseCompletedTodoIcon,
  BsInfoCircle as InfoIcon,
  BsCheck as CheckIcon,
} from 'react-icons/bs';
import '../css/TodoList.css';
import { isEmpty } from '../helper';

class TodoList extends Component {
  state = {
    content: '',
    isAddMode: false,
    isShowMode: false,
    isSpreadMode: false,
  };

  todoListContainer = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.hideTodoInput);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideTodoInput);
  }

  showAlert = () => {
    return (
      <Modal show={this.state.isShowMode}>
        <Modal.Header>
          <Modal.Title>Empty content..</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter the content.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-info"
            onClick={() => this.setState({ isShowMode: false })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  submitTodo = (content) => ({ key, type }) => {
    if (key === 'Enter' || type === 'click') {
      if (isEmpty(content)) {
        this.setState({ isShowMode: true });
      } else {
        this.props.dispatchAddTodo(content);
        this.setState({ isAddMode: false, content: '' });
      }
    }
  };

  hideTodoInput = ({ target }) => {
    if (
      this.state.isAddMode &&
      !this.todoListContainer.current.contains(target)
    ) {
      this.setState({ isAddMode: false });
    }
  };

  renderTodoInput = () => {
    const { isAddMode, content } = this.state;

    if (isAddMode) {
      return (
        <ListGroup.Item className="todo-list-container__list-group-item">
          <InputGroup className="mb-3 todo-list-container__input-group">
            <Form.Control
              autoFocus
              className="todo-list-container__form-control"
              placeholder="todo"
              onChange={({ target: { value: content } }) =>
                this.setState({ content })
              }
              onKeyDown={this.submitTodo(content)}
              onClick={this.hideTodoInput}
            />
            <InputGroup.Append>
              <Button
                size="sm"
                variant="outline-info"
                onClick={this.submitTodo(content)}
              >
                <CheckIcon />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </ListGroup.Item>
      );
    }
  };

  renderListOrInput = (todoList) => {
    if (todoList.length === 0) {
      return (
        <Alert className="todo-list-container__alert">
          <InfoIcon className="todo-list-container__info-icon" />
          List is empty.
        </Alert>
      );
    } else {
      return (
        <Col>
          <ListGroup>
            {todoList.map((todo, index) =>
              todo.completed ? null : (
                <ListGroup.Item className="todo-list-container__list-group-item">
                  <TodoEntry key={index} index={index} todo={todo} />
                </ListGroup.Item>
              ),
            )}
            {this.renderTodoInput()}
          </ListGroup>
        </Col>
      );
    }
  };

  renderCompletedTodoSpreadButton = (todoList, isSpreadMode) => {
    if (todoList.length > 0)
      return (
        <Col>
          <Button
            variant="link"
            onClick={() => this.setState({ isSpreadMode: !isSpreadMode })}
          >
            {isSpreadMode ? (
              <CloseCompletedTodoIcon />
            ) : (
              <OpenCompletedTodoIcon />
            )}
          </Button>
          <Button disabled={true} variant="link">
            Completed Todo
          </Button>
        </Col>
      );
  };

  renderCompletedTodo = (todoList, isSpreadMode) => {
    if (isSpreadMode) {
      let completedTodoCount = 0;
      for (const todo of todoList) {
        if (todo.completed) {
          completedTodoCount += 1;
        }
      }
      if (completedTodoCount === 0) {
        return (
          <Alert className="todo-list-container__alert">
            <InfoIcon className="todo-list-container__info-icon" />
            none
          </Alert>
        );
      } else {
        return (
          <Col>
            <ListGroup>
              {todoList.map((todo, index) =>
                todo.completed ? (
                  <ListGroup.Item className="todo-list-container__list-group-item todo-list-container__completed-list-group-item">
                    <TodoEntry key={index} index={index} todo={todo} />
                  </ListGroup.Item>
                ) : null,
              )}
            </ListGroup>
          </Col>
        );
      }
    }
  };

  render() {
    const {
      props: { groupList, selectedGroupIndex },
      state: { isAddMode, isSpreadMode },
    } = this;
    const selectedGroup = groupList[selectedGroupIndex];
    const todoList = selectedGroup.todoList;

    return (
      <Container
        fluid
        className="todo-list-container"
        ref={this.todoListContainer}
      >
        <Row noGutters={true}>
          <Button
            variant="outline-dark"
            className="todo-list-container__add-button"
            onClick={() => this.setState({ isAddMode: !isAddMode })}
          >
            {isAddMode ? 'End' : '+'}
          </Button>
        </Row>
        <Row noGutters={true}>{this.renderListOrInput(todoList)}</Row>
        <Row noGutters={true} className="todo-list-container__completed-list">
          {this.renderCompletedTodoSpreadButton(todoList, isSpreadMode)}
        </Row>
        <Row noGutters={true}>
          {this.renderCompletedTodo(todoList, isSpreadMode)}
        </Row>
        {this.showAlert()}
      </Container>
    );
  }
}

const mapStateToProps = ({ groupList, selectedGroupIndex }) => ({
  groupList,
  selectedGroupIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: (content) => dispatch(Action.addTodo(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
