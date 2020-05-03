import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/action';
import TodoEntry from './TodoEntry';
import { Container, Row, Col } from 'react-bootstrap';

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
        <input
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
          {todoList.map((todo, index) => (
            <TodoEntry key={index} index={index} todo={todo} />
          ))}
        </Col>
      );
    }
  };

  render() {
    const {
      props: { groupList, selectedIndex },
      state: { isAddMode },
    } = this;
    const selectedGroup = groupList[selectedIndex];
    const todoList = selectedGroup.todoList;

    return (
      <Container
        fluid
        className="todo-list-container"
        ref={this.todoListContainer}
      >
        <Row noGutters={true}>
          <button
            className="todo-list-container__add-button"
            onClick={() => this.setState({ isAddMode: !isAddMode })}
          >
            +
          </button>
        </Row>
        <Row noGutters={true} className="todo-list-container__list">
          {this.renderListOrInput(isAddMode, todoList)}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ groupList, selectedIndex }) => ({
  groupList,
  selectedIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: (content) => dispatch(addTodo(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
