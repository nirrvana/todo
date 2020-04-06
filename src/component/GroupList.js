import React, { Component } from 'react';
import GroupEntry from './GroupEntry';

export default class GroupList extends Component {
  state = {
    isAddMode: false,
  };

  groupListContainer = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.hideGroupNameInput);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideGroupNameInput);
  }

  toggleAddMode = () => {
    this.setState(({ isAddMode }) => ({ isAddMode: !isAddMode }));
  };

  submitGroupName = ({ key, target: { value: name } }) => {
    if (key === 'Enter') {
      this.props.addGroup(name);
      this.setState({ isAddMode: false });
    }
  };

  hideGroupNameInput = ({ target }) => {
    if (
      this.state.isAddMode &&
      !this.groupListContainer.current.contains(target)
    ) {
      this.setState({ isAddMode: false });
    }
  };

  renderGroupNameInput = (isAddMode, submitGroupName, hideGroupNameInput) => {
    if (isAddMode) {
      return (
        <input
          placeholder="group name"
          onKeyDown={submitGroupName}
          onClick={hideGroupNameInput}
        />
      );
    }
  };

  render() {
    const {
      props: { groupList, selectGroup },
      state: { isAddMode },
      toggleAddMode,
      submitGroupName,
      hideGroupNameInput,
    } = this;

    return (
      <div ref={this.groupListContainer}>
        <div onClick={toggleAddMode}>+ Add Group</div>
        {this.renderGroupNameInput(
          isAddMode,
          submitGroupName,
          hideGroupNameInput,
        )}
        <ul className="group-list__list">
          {groupList.map((group, index) => (
            <GroupEntry
              key={index}
              index={index}
              groupName={group.name}
              selectGroup={selectGroup}
            />
          ))}
        </ul>
      </div>
    );
  }
}
