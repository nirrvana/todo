import React, { Component } from 'react';

export default class TodoEntry extends Component {
  render() {
    const { todo } = this.props;

    return <li>{todo.content}</li>;
  }
}
