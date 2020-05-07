import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../redux/action';
import TodoEntry from './TodoEntry';
import { Container, Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import '../css/TodoList.css';

class TodoList extends Component {
  state = {
    isAddMode: false,
  };

  todoListContainer = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.hideTodoInput);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideTodoInput);
  }

  isEmpty = (content) => !/\S/.test(content);

  submitTodo = ({ key, target: { value: content } }) => {
    if (key === 'Enter') {
      if (this.isEmpty(content)) {
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
    return (
      <Col>
        <Form.Control
          autoFocus
          className="todo-list-container__input"
          placeholder="todo"
          onKeyDown={this.submitTodo}
          onClick={this.hideTodoInput}
        />
      </Col>
    );
  };

  renderListOrInput = (isAddMode, todoList) => {
    if (isAddMode) {
      return this.renderTodoInput();
    } else {
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
          </ListGroup>
        </Col>
      );
    }
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
          {this.renderListOrInput(isAddMode, todoList)}
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
