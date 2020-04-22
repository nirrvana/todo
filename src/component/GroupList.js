import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGroup } from '../redux/action';
import GroupEntry from './GroupEntry';
import { Container, Row } from 'react-bootstrap';

class GroupList extends Component {
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

  fixEmptyGroup = (name) => {
    return /\S/.test(name) ? name : 'Untitled';
  };

  submitGroupName = ({ key, target: { value: name } }) => {
    if (key === 'Enter') {
      name = this.fixEmptyGroup(name);
      this.setState({ isAddMode: false });
      this.props.dispatchAddGroup(name);
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
          autoFocus
          placeholder="group name"
          className="group-list-container__group-name-input"
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
      <Container className="group-list-container" ref={this.groupListContainer}>
        <Row className="group-list-container__wrapper">
          <div
            className="group-list-container__add-button"
            onClick={toggleAddMode}
          >
            + Add Group
          </div>
        </Row>
        <Row className="group-list-container__wrapper">
          {this.renderGroupNameInput(
            isAddMode,
            submitGroupName,
            hideGroupNameInput,
          )}
        </Row>
        <Row className="group-list-container__wrapper">
          <div className="group-list-container__list">
            {groupList.map((group, index) => (
              <GroupEntry key={index} index={index} groupName={group.name} />
            ))}
          </div>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ groupList, selectedIndex }) => ({
  groupList,
  selectedIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddGroup: (name) => dispatch(addGroup(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
