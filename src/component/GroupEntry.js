import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../redux/action';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import '../css/GroupEntry.css';
import { isEmpty } from '../helper';

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

  submitGroupName = (groupNameForEdit) => ({ key, type }) => {
    const { index, dispatchRenameGroup } = this.props;

    if (key === 'Enter' || type === 'submit') {
      const groupName = isEmpty(groupNameForEdit)
        ? 'Untitled'
        : groupNameForEdit;
      dispatchRenameGroup(index, groupName);
      this.setState({ isRenameMode: false });
    }
  };

  renderGroupName = (isRenameMode) => {
    const { index, groupName, dispatchSelectGroup } = this.props;

    if (!isRenameMode) {
      return (
        <div
          ref={this.groupNameArea}
          className="group-entry-container__name"
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
        <Button
          size="sm"
          className="group-entry-container__delete-button"
          onClick={() => dispatchDeleteGroup(index)}
        >
          X
        </Button>
      );
    }
  };

  renderGroupRenameButton = (isEditMode, isRenameMode) => {
    if (isEditMode && !isRenameMode) {
      return (
        <Button
          size="sm"
          className="group-entry-container__rename-button"
          onClick={() => this.setState({ isRenameMode: true })}
        >
          rename
        </Button>
      );
    }
  };

  renderGroupNameInput = () => {
    const { groupListForEdit } = this.props;
    const groupNameForEdit = groupListForEdit.filter(
      (_group, index) => index === this.props.index,
    )[0].name;

    return (
      <Form onSubmit={this.submitGroupName(groupNameForEdit)}>
        <InputGroup className="mb-3">
          <Form.Control
            autoFocus
            value={groupNameForEdit}
            onChange={this.updateGroupName}
            onKeyDown={this.submitGroupName(groupNameForEdit)}
          />
          <InputGroup.Append>
            <Button size="sm" type="submit">
              submit
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  };

  render() {
    const { isEditMode, isRenameMode } = this.state;

    if (isRenameMode) {
      return this.renderGroupNameInput();
    } else {
      return (
        <Container
          fluid
          className="group-entry-container"
          onMouseEnter={() => this.setState({ isEditMode: true })}
          onMouseLeave={() => this.setState({ isEditMode: false })}
        >
          <Row noGutters={true} className="group-entry-container__wrapper">
            <Col className="group-entry-container__name-area">
              {this.renderGroupName(isRenameMode)}
            </Col>
            <Col className="group-entry-container__delete-button-area">
              {this.renderGroupDeleteButton(isEditMode, isRenameMode)}
            </Col>
            <Col className="group-entry-container__rename-button-area">
              {this.renderGroupRenameButton(isEditMode, isRenameMode)}
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = ({ groupListForEdit }) => ({
  groupListForEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSelectGroup: (index) => dispatch(Action.selectGroup(index)),
  dispatchDeleteGroup: (index) => dispatch(Action.deleteGroup(index)),
  dispatchUpdateGroup: (index, name) =>
    dispatch(Action.updateGroup(index, name)),
  dispatchRenameGroup: (index, name) =>
    dispatch(Action.renameGroup(index, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupEntry);
