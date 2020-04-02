import React, { Component } from 'react';
import GroupEntry from './GroupEntry';

export default class GroupList extends Component {
  render() {
    const { todoGroupList } = this.props;
    return (
      <ul>
        {todoGroupList.map((todoGroup, index) => (
          <GroupEntry key={index} title={todoGroup.title} />
        ))}
      </ul>
    );
  }
}
