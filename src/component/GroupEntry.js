import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectGroup,
  deleteGroup,
  updateGroup,
  renameGroup,
} from '../redux/action';
import { Row, Col } from 'react-bootstrap';

class GroupEntry extends Component {
  state = {
    isEditMode: false,
    isRenameMode: false,
  };

  groupNameArea = React.createRef();

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
        <div
          ref={this.groupNameArea}
          className="group-entry-wrapper__name"
          onClick={() => dispatchSelectGroup(index)}
        >
          {groupName}
        </div>
      );
    }
  };

  renderGroupDeleteButton = (isEditMode, isRenameMode, deleteGroup) => {
    if (isEditMode && !isRenameMode) {
      return (
        <button
          className="group-entry-wrapper__delete-button"
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
          className="group-entry-wrapper__rename-button"
          onClick={activeRenameMode}
        >
          rename
        </button>
      );
    }
  };

  renderGroupNameInput = (
    groupListForEdit,
    updateGroupName,
    submitGroupName,
  ) => {
    const groupNameForEdit = groupListForEdit.filter(
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
  };

  render() {
    const {
      props: { index, groupName, dispatchSelectGroup, groupListForEdit },
      state: { isEditMode, isRenameMode },
      activeRenameMode,
      updateGroupName,
      submitGroupName,
      deleteGroup,
    } = this;

    if (isRenameMode) {
      return (
        <Row>
          {this.renderGroupNameInput(
            groupListForEdit,
            updateGroupName,
            submitGroupName,
          )}
        </Row>
      );
    } else {
      return (
        <Row
          noGutters={true}
          className="group-entry-wrapper"
          onMouseEnter={() => this.setState({ isEditMode: true })}
          onMouseLeave={() => this.setState({ isEditMode: false })}
        >
          <Col md={6}>
            {this.renderGroupName(
              index,
              groupName,
              isRenameMode,
              dispatchSelectGroup,
            )}
          </Col>
          <Col md={2}>
            {this.renderGroupDeleteButton(
              isEditMode,
              isRenameMode,
              deleteGroup,
            )}
          </Col>
          <Col md={4}>
            {this.renderGroupRenameButton(
              isEditMode,
              isRenameMode,
              activeRenameMode,
            )}
          </Col>
        </Row>
      );
    }
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
