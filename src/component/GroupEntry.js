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
      this.setState({ isRenameMode: false });
    }
  };

  renderGroupName = (isRenameMode) => {
    const { index, groupName, dispatchSelectGroup } = this.props;

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

  renderGroupDeleteButton = (isEditMode, isRenameMode) => {
    const { index, dispatchDeleteGroup } = this.props;

    if (isEditMode && !isRenameMode) {
      return (
        <button
          className="group-entry-wrapper__delete-button"
          onClick={() => dispatchDeleteGroup(index)}
        >
          X
        </button>
      );
    }
  };

  renderGroupRenameButton = (isEditMode, isRenameMode) => {
    if (isEditMode && !isRenameMode) {
      return (
        <button
          className="group-entry-wrapper__rename-button"
          onClick={() => this.setState({ isRenameMode: true })}
        >
          rename
        </button>
      );
    }
  };

  renderGroupNameInput = () => {
    const { groupListForEdit } = this.props;
    const groupNameForEdit = groupListForEdit.filter(
      (_group, index) => index === this.props.index,
    )[0].name;

    return (
      <input
        autoFocus
        value={groupNameForEdit}
        onChange={this.updateGroupName}
        onKeyDown={this.submitGroupName}
      />
    );
  };

  render() {
    const { isEditMode, isRenameMode } = this.state;

    if (isRenameMode) {
      return <Row>{this.renderGroupNameInput()}</Row>;
    } else {
      return (
        <Row
          noGutters={true}
          className="group-entry-wrapper"
          onMouseEnter={() => this.setState({ isEditMode: true })}
          onMouseLeave={() => this.setState({ isEditMode: false })}
        >
          <Col md={6}>{this.renderGroupName(isRenameMode)}</Col>
          <Col md={2}>
            {this.renderGroupDeleteButton(isEditMode, isRenameMode)}
          </Col>
          <Col md={4}>
            {this.renderGroupRenameButton(isEditMode, isRenameMode)}
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
