import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGroup } from '../redux/action';
import GroupEntry from './GroupEntry';

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
      <div className="group-list-container" ref={this.groupListContainer}>
        <div onClick={toggleAddMode}>+ Add Group</div>
        {this.renderGroupNameInput(
          isAddMode,
          submitGroupName,
          hideGroupNameInput,
        )}
        <ul className="group-list__list">
          {groupList.map((group, index) => (
            <GroupEntry key={index} index={index} groupName={group.name} />
          ))}
        </ul>
      </div>
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
