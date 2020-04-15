import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectGroup,
  deleteGroup,
  updateGroup,
  renameGroup,
} from '../redux/action';

class GroupEntry extends Component {
  state = {
    isEditMode: false,
    isRenameMode: false,
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

  updateGroupName = ({ target: { value: name } }) => {
    const { index, dispatchUpdateGroup } = this.props;
    dispatchUpdateGroup(index, name);
  };

  isEmptyGroup = (name) => !/\S/.test(name);

  submitGroupName = ({ key, target: { value: name } }) => {
    const { index, dispatchUpdateGroup, dispatchRenameGroup } = this.props;
    if (key === 'Enter') {
      if (this.isEmptyGroup(name)) {
        name = 'Untitled';
        dispatchUpdateGroup(index, name);
      }
      dispatchRenameGroup();
      this.inactiveRenameMode();
    }
  };

  renderGroupName = (index, groupName, isRenameMode, dispatchSelectGroup) => {
    if (!isRenameMode) {
      return (
        <li
          ref={this.groupNameArea}
          className="group-entry__entry"
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
          className="group-entry__delete-group-button"
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
          className="group-entry__rename-group-button"
          onClick={activeRenameMode}
        >
          rename
        </button>
      );
    }
  };

  renderGroupNameInput = (
    isRenameMode,
    groupListForEdit,
    updateGroupName,
    submitGroupName,
  ) => {
    if (isRenameMode) {
      let groupNameForEdit = groupListForEdit.filter(
        (_group, index) => index === this.props.index,
      )[0].name;
      return (
        <input
          autoFocus
          value={groupNameForEdit}
          onChange={updateGroupName}
          onKeyDown={submitGroupName}
        />
      );
    }
  };

  render() {
    const {
      props: { index, groupName, dispatchSelectGroup, groupListForEdit },
      state: { isEditMode, isRenameMode },
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
          groupListForEdit,
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

const mapStateToProps = ({ groupListForEdit }) => ({
  groupListForEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSelectGroup: (index) => dispatch(selectGroup(index)),
  dispatchDeleteGroup: (index) => dispatch(deleteGroup(index)),
  dispatchUpdateGroup: (index, name) => dispatch(updateGroup(index, name)),
  dispatchRenameGroup: () => dispatch(renameGroup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupEntry);
