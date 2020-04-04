import React, { Component } from 'react';
import TodoEntry from './TodoEntry';

export default class TodoList extends Component {
  render() {
    const {
      props: { todoList },
    } = this;

    return (
      <ul>
        {todoList.map((todo, index) => (
          <TodoEntry key={index} todo={todo} />
        ))}
      </ul>
    );
  }
}
