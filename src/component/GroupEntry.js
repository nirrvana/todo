import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectGroup, deleteGroup } from '../redux/action';

class GroupEntry extends Component {
  state = {
    isEditMode: false,
  };

  toggleEditMode = () => {
    this.setState(({ isEditMode }) => ({ isEditMode: !isEditMode }));
  };

  deleteGroup = () => {
    const { index, dispatchDeleteGroup } = this.props;
    dispatchDeleteGroup(index);
  };

  renderDeleteGroupButton = (isEditMode, deleteGroup) => {
    if (isEditMode) {
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

  render() {
    const {
      props: { index, groupName, dispatchSelectGroup },
      state: { isEditMode },
      toggleEditMode,
      deleteGroup,
    } = this;

    return (
      <div onMouseEnter={toggleEditMode} onMouseLeave={toggleEditMode}>
        <li
          className="group-list__entry"
          onClick={() => dispatchSelectGroup(index)}
        >
          {groupName}
        </li>
        {this.renderDeleteGroupButton(isEditMode, deleteGroup)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSelectGroup: (index) => dispatch(selectGroup(index)),
  dispatchDeleteGroup: (index) => dispatch(deleteGroup(index)),
});

export default connect(null, mapDispatchToProps)(GroupEntry);
