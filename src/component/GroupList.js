import React, { Component } from 'react';
import { connect } from 'react-redux';
import Action from '../redux/action';
import GroupEntry from './GroupEntry';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  InputGroup,
} from 'react-bootstrap';
import { BsCheck as CheckIcon } from 'react-icons/bs';
import '../css/GroupList.css';
import { isEmpty } from '../helper';

class GroupList extends Component {
  state = {
    name: '',
    isAddMode: false,
  };

  groupListContainer = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.hideGroupNameInput);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideGroupNameInput);
  }

  submitGroupName = (groupName) => ({ key, type }) => {
    if (key === 'Enter' || type === 'click') {
      const name = isEmpty(groupName) ? 'Untitled' : groupName;
      this.props.dispatchAddGroup(name);
      this.setState({ isAddMode: false, name: '' });
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
    const { name } = this.state;

    if (isAddMode) {
      return (
        <Col className="group-list-container__input-group-area">
          <InputGroup className="mb-3">
            <Form.Control
              autoFocus
              placeholder="group name"
              className="group-list-container__form-control"
              onChange={({ target: { value: name } }) =>
                this.setState({ name })
              }
              onKeyDown={this.submitGroupName(name)}
              onClick={this.hideGroupNameInput}
            />
            <InputGroup.Append>
              <Button
                variant="outline-info"
                className="group-list-container__check-button"
                onClick={this.submitGroupName(name)}
              >
                <CheckIcon />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
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
            variant="outline-danger"
            className="group-list-container__add-button"
            onClick={() => this.setState({ isAddMode: !isAddMode })}
          >
            {isAddMode ? 'End' : '+ Add Group'}
          </Button>
        </Row>
        <Row noGutters={true} className="group-list-container__wrapper">
          {this.renderGroupNameInput(isAddMode)}
        </Row>
        <Row noGutters={true} className="group-list-container__wrapper">
          <Col className="group-list-container__group-entry-area">
            <ListGroup>
              {groupList.map((group, index) => (
                <ListGroup.Item className="group-list-container__list-group-item">
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

const mapStateToProps = ({ groupList, selectedGroupIndex }) => ({
  groupList,
  selectedGroupIndex,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddGroup: (name) => dispatch(Action.addGroup(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
