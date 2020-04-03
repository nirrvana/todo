import React, { Component } from 'react';
import GroupEntry from './GroupEntry';

export default class GroupList extends Component {
  state = {
    isAddMode: false,
  };

  toggleAddMode = () => {
    this.setState({
      isAddMode: !this.state.isAddMode,
    });
  };

  submitGroupName = ({ key, target: { value: title } }) => {
    if (key === 'Enter') {
      this.props.addGroup(title);
      this.toggleAddMode();
    }
  };

  renderGroupNameInput = (isAddMode, submitGroupName) => {
    if (isAddMode) {
      return <input placeholder="그룹명" onKeyDown={submitGroupName} />;
    }
  };

  render() {
    const {
      props: { todoGroupList },
      state: { isAddMode },
      toggleAddMode,
      submitGroupName,
    } = this;
    return (
      <div>
        <div onClick={toggleAddMode}>+ Add Group</div>
        {this.renderGroupNameInput(isAddMode, submitGroupName)}
        <ul>
          {todoGroupList.map((todoGroup, index) => (
            <GroupEntry key={index} title={todoGroup.title} />
          ))}
        </ul>
      </div>
    );
  }
}
