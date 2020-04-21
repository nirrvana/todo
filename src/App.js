import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupList from './component/GroupList';
import TodoList from './component/TodoList';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

class App extends Component {
  renderTodoList = () => {
    if (this.props.selectedIndex !== null) {
      return <TodoList />;
    }
  };

  render() {
    return (
      <Container className="app-container">
        <Row noGutters={true}>
          <Col md={3}>
            <GroupList />
          </Col>
          <Col md={9}>{this.renderTodoList()}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ selectedIndex }) => ({ selectedIndex });

export default connect(mapStateToProps)(App);
