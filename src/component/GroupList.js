import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../redux/action';
import GroupEntry from './GroupEntry';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import '../css/GroupList.css';

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

  submitGroupName = ({ key, target: { value: name } }) => {
    if (key === 'Enter') {
      name = /\S/.test(name) ? name : 'Untitled';
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

  renderGroupNameInput = (isAddMode) => {
    if (isAddMode) {
      return (
        <Form.Control
          autoFocus
          placeholder="group name"
          className="group-list-container__input"
          onKeyDown={this.submitGroupName}
          onClick={this.hideGroupNameInput}
        />
      );
    }
  };

  render() {
    const {
      props: { groupList },
      state: { isAddMode },
    } = this;

    return (
      <Container
        fluid
        className="group-list-container"
        ref={this.groupListContainer}
      >
        <Row noGutters={true} className="group-list-container__wrapper">
          <Button
            className="group-list-container__add-button"
            onClick={this.toggleAddMode}
          >
            + Add Group
          </Button>
        </Row>
        <Row noGutters={true} className="group-list-container__wrapper">
          {this.renderGroupNameInput(isAddMode)}
        </Row>
        <Row noGutters={true} className="group-list-container__wrapper">
          <Col className="group-list-container__group-entry-area">
            <ListGroup>
              {groupList.map((group, index) => (
                <ListGroup.Item>
                  <GroupEntry
                    key={index}
                    index={index}
                    groupName={group.name}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
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
  dispatchAddGroup: (name) => dispatch(Action.addGroup(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
