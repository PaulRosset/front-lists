import React, { Component, Fragment } from "react";
import styled from "styled-components";
//import FetcherRoom from "../CompUtils/FetcherRoom";
import { Header } from "./Header";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { newEntry } from "../../states/actions";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

// this.props.match.params.id ID Room

class Room extends Component {
  state = {};

  handleNewEntry = () => {
    this.props.dispatch(newEntry());
  };

  render() {
    return (
      <Fragment>
        <Header roomName="Hello" handleNewEntry={this.handleNewEntry} />
        <Container>
          <Content
            creatingNewTodo={this.props.creationTodo}
            dispatch={this.props.dispatch}
            idRoom={this.props.match.params.id}
          />
          <Sidebar idRoom={this.props.match.params.id} />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  creationTodo: state.NewTodo
});

export default connect(mapStateToProps)(Room);
