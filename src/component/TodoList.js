import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/action';
import TodoEntry from './TodoEntry';

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

  toggleAddMode = () => {
    this.setState(({ isAddMode }) => ({ isAddMode: !isAddMode }));
  };

  submitTodo = ({ key, target: { value: content }}) => {
    if (key === 'Enter') {
      this.props.dispatchAddTodo(content);
      this.setState({ isAddMode: false });
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

  renderTodoInput = (isAddMode, submitTodo, hideTodoInput) => {
    if (isAddMode) {
      return (
        <input
          placeholder="todo"
          onKeyDown={submitTodo}
          onClick={hideTodoInput}
        />
      );
    }
  };

  render() {
    const {
      props: { groupList, selectedIndex },
      state: { isAddMode },
      toggleAddMode,
      submitTodo,
      hideTodoInput,
    } = this;
    const selectedGroup = groupList[selectedIndex];
    const todoList = selectedGroup.todoList;

    return (
      <div ref={this.todoListContainer}>
        <ul>
          {todoList.map((todo, index) => (
            <TodoEntry key={index} todo={todo} />
          ))}
        </ul>
        <div onClick={toggleAddMode}>+</div>
        {this.renderTodoInput(isAddMode, submitTodo, hideTodoInput)}
      </div>
    );
  }
}

const mapStateToProps = ({ groupList, selectedIndex }) => {
  return { groupList, selectedIndex };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchAddTodo: (content) => dispatch(addTodo(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
