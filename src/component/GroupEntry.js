import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectGroup } from '../redux/action';

class GroupEntry extends Component {
  render() {
    const { index, groupName, DispatchSelectGroup } = this.props;
    return (
      <li
        className="group-list__entry"
        onClick={() => DispatchSelectGroup(index)}
      >
        {groupName}
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  DispatchSelectGroup: (index) => dispatch(selectGroup(index)),
});

export default connect(null, mapDispatchToProps)(GroupEntry);
