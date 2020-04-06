import React, { Component } from 'react';

export default class GroupEntry extends Component {
  render() {
    const { index, groupName, selectGroup } = this.props;
    return (
      <li className="group-list__entry" onClick={() => selectGroup(index)}>
        {groupName}
      </li>
    );
  }
}
