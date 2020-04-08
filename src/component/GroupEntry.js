import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectGroup, deleteGroup, renameGroup } from '../redux/action';

class GroupEntry extends Component {
  state = {
    isEditMode: false,
    isRenameMode: false,
    groupNameValue: this.props.groupName,
  };

  groupNameArea = React.createRef();

  toggleEditMode = () => {
    this.setState(({ isEditMode }) => ({ isEditMode: !isEditMode }));
  };

  activeRenameMode = () => {
    this.setState({ isRenameMode: true });
  };

  inactiveRenameMode = () => {
    this.setState({ isRenameMode: false });
  };

  deleteGroup = () => {
    const { index, dispatchDeleteGroup } = this.props;
    dispatchDeleteGroup(index);
  };

  updateGroupName = ({ target: { value: groupNameValue } }) => {
    this.setState({ groupNameValue });
  };

  submitGroupName = ({ key, target: { value: name } }) => {
    const { index, dispatchRenameGroup } = this.props;
    if (key === 'Enter') {
      dispatchRenameGroup(index, name);
      this.inactiveRenameMode();
    }
  };

  renderGroupName = (index, groupName, isRenameMode, dispatchSelectGroup) => {
    if (!isRenameMode) {
      return (
        <li
          ref={this.groupNameArea}
          className="group-list__entry"
          onClick={() => dispatchSelectGroup(index)}
        >
          {groupName}
        </li>
      );
    }
  };

  renderGroupDeleteButton = (isEditMode, isRenameMode, deleteGroup) => {
    if (isEditMode && !isRenameMode) {
      return (
        <button
          className="group-list__delete-group-button"
          onClick={deleteGroup}
        >
          X
        </button>
      );
    }
  };

  renderGroupRenameButton = (isEditMode, isRenameMode, activeRenameMode) => {
    if (isEditMode && !isRenameMode) {
      return (
        <button
          className="group-list__rename-group-button"
          onClick={activeRenameMode}
        >
          rename
        </button>
      );
    }
  };

  renderGroupNameInput = (
    isRenameMode,
    groupNameValue,
    updateGroupName,
    submitGroupName,
  ) => {
    if (isRenameMode) {
      return (
        <input
          autoFocus
          value={groupNameValue}
          onChange={updateGroupName}
          onKeyDown={submitGroupName}
        />
      );
    }
  };

  render() {
    const {
      props: { index, groupName, dispatchSelectGroup },
      state: { isEditMode, isRenameMode, groupNameValue },
      toggleEditMode,
      activeRenameMode,
      updateGroupName,
      submitGroupName,
      deleteGroup,
    } = this;

    return (
      <div onMouseEnter={toggleEditMode} onMouseLeave={toggleEditMode}>
        {this.renderGroupName(
          index,
          groupName,
          isRenameMode,
          dispatchSelectGroup,
        )}
        {this.renderGroupNameInput(
          isRenameMode,
          groupNameValue,
          updateGroupName,
          submitGroupName,
        )}
        {this.renderGroupDeleteButton(isEditMode, isRenameMode, deleteGroup)}
        {this.renderGroupRenameButton(
          isEditMode,
          isRenameMode,
          activeRenameMode,
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSelectGroup: (index) => dispatch(selectGroup(index)),
  dispatchDeleteGroup: (index) => dispatch(deleteGroup(index)),
  dispatchRenameGroup: (index, name) => dispatch(renameGroup(index, name)),
});

export default connect(null, mapDispatchToProps)(GroupEntry);
