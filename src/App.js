import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupList from './component/GroupList';
import TodoList from './component/TodoList';
import { Container, Row, Col } from 'react-bootstrap';
import './css/App.css';

class App extends Component {
  renderTodoList = () => {
    if (this.props.selectedIndex !== null) {
      return <TodoList />;
    }
  };

  render() {
    return (
      <Container fluid className="app-container">
        <Row noGutters={true} className="app-container__wrapper flex-nowrap">
          <Col xl={4}>
            <GroupList />
          </Col>
          <Col xl={8}>{this.renderTodoList()}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ selectedIndex }) => ({ selectedIndex });

export default connect(mapStateToProps)(App);
