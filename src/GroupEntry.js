import React, { Component } from 'react';

export default class GroupEntry extends Component {
  render() {
    const { groupName } = this.props;
    return <li>{groupName}</li>;
  }
}
