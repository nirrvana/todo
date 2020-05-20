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
} from 'react-bootstrap';
import '../css/TodoList.css';
import { isEmpty } from '../helper';

class TodoList extends Component {
  state = {
    isAddMode: false,
    content: '',
  };

  todoListContainer = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.hideTodoInput);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideTodoInput);
  }

  submitTodo = (content) => ({ key, type }) => {
    if (key === 'Enter' || type === 'click') {
      if (isEmpty(content)) {
        window.alert('please input todo content');
      } else {
        this.props.dispatchAddTodo(content);
        this.setState({ isAddMode: false });
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
              onKeyDown={this.submitTodo(content)}
              onChange={(event) =>
                this.setState({ content: event.target.value })
              }
              onClick={this.hideTodoInput}
            />
            <InputGroup.Append>
              <Button size="sm" onClick={this.submitTodo(content)}>
                submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </ListGroup.Item>
      );
    }
  };

  renderListOrInput = (todoList) => {
    return (
      <Col>
        <ListGroup>
          {todoList.map((todo, index) =>
            todo.completed ? null : (
              <ListGroup.Item>
                <TodoEntry key={index} index={index} todo={todo} />
              </ListGroup.Item>
            ),
          )}
          {this.renderTodoInput()}
        </ListGroup>
      </Col>
    );
  };

  render() {
    const {
      props: { groupList, selectedGroupIndex },
      state: { isAddMode },
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
            className="todo-list-container__add-button"
            onClick={() => this.setState({ isAddMode: !isAddMode })}
          >
            +
          </Button>
        </Row>
        <Row noGutters={true} className="todo-list-container__list">
          {this.renderListOrInput(todoList)}
        </Row>
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
