import React, { Component } from 'react';

export default class GroupEntry extends Component {
  render() {
    const { title } = this.props;
    return <li>{title}</li>;
  }
}
