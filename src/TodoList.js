import React, { Component } from 'react';
import TodoEntry from './TodoEntry';

export default class TodoList extends Component {
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
    this.setState({ isAddMode: !this.state.isAddMode });
  };

  submitTodo = ({ key, target: { value: content } }) => {
    if (key === 'Enter') {
      this.props.addTodo(content);
      this.toggleAddMode();
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
      props: { todoList },
      state: { isAddMode },
      toggleAddMode,
      submitTodo,
      hideTodoInput,
    } = this;

    return (
      <div ref={this.todoListContainer} className="sss">
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
