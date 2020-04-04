import React, { Component } from 'react';
import GroupEntry from './GroupEntry';

export default class GroupList extends Component {
  state = {
    isAddMode: false,
  };

  groupNameInputContainer = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.hideGroupNameInput);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideGroupNameInput);
  }

  toggleAddMode = () => {
    this.setState({
      isAddMode: !this.state.isAddMode,
    });
  };

  submitGroupName = ({ key, target: { value: name } }) => {
    if (key === 'Enter') {
      this.props.addGroup(name);
      this.toggleAddMode();
    }
  };

  hideGroupNameInput = ({ target }) => {
    if (
      this.state.isAddMode &&
      !this.groupNameInputContainer.current.contains(target)
    ) {
      this.setState({ isAddMode: false });
    }
  };

  renderGroupNameInput = (isAddMode, submitGroupName, hideGroupNameInput) => {
    if (isAddMode) {
      return (
        <input
          placeholder="그룹명"
          onKeyDown={submitGroupName}
          onClick={hideGroupNameInput}
        />
      );
    }
  };

  render() {
    const {
      props: { groupList },
      state: { isAddMode },
      toggleAddMode,
      submitGroupName,
      hideGroupNameInput,
    } = this;

    return (
      <div ref={this.groupNameInputContainer}>
        <div onClick={toggleAddMode}>+ Add Group</div>
        {this.renderGroupNameInput(
          isAddMode,
          submitGroupName,
          hideGroupNameInput,
        )}
        <ul>
          {groupList.map((group, index) => (
            <GroupEntry key={index} groupName={group.name} />
          ))}
        </ul>
      </div>
    );
  }
}
