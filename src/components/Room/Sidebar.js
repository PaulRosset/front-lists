import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Icon, Loader } from "semantic-ui-react";
import FeaturesStatus from "./Features/FeaturesStatus";
import FeaturesEditing from "./Features/FeaturesEditing";
import FeaturesStepping from "./Features/FeaturesStepping";
import FetcherTodo from "./../CompUtils/FetcherTodo";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  flex: 1;
  background: #f6f6f6;
  height: 100vh;
  padding: 10px;
`;

const FeaturesTools = styled.div`
  margin: 5px 0;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const TitleFeature = styled.h3`
  margin: 0;
`;

const Part = styled.div`
  margin: 5px 0;
`;

const TodoTitle = styled.span`
  color: #fd9e0c;
`;

class Sidebar extends Component {
  state = {
    isStatusOpen: false,
    isEditingOpen: false,
    isStepsOpen: false
  };

  handleStatus = e => {
    this.setState(prevState => ({
      isStatusOpen: !prevState.isStatusOpen
    }));
  };

  handleEditing = e => {
    this.setState(prevState => ({
      isEditingOpen: !prevState.isEditingOpen
    }));
  };

  handleSteps = e => {
    this.setState(prevState => ({
      isStepsOpen: !prevState.isStepsOpen
    }));
  };

  render() {
    const { id } = this.props.todoToShow;
    const { isStatusOpen, isEditingOpen, isStepsOpen } = this.state;
    return (
      <SidebarContainer>
        {this.props.todoToShow.id && this.props.todoToShow.idRoom ? (
          <FeaturesTools>
            <FetcherTodo idRoom={this.props.idRoom} idTodo={id}>
              {({ room, loader }) => {
                if (loader) {
                  return <Loader active inline="centered" />;
                } else {
                  return (
                    <Fragment>
                      <h3>
                        Selected todo: <TodoTitle>{room.todo || ""}</TodoTitle>
                      </h3>
                      <Part>
                        <Main onClick={this.handleStatus}>
                          <TitleFeature>Status</TitleFeature>
                          <Icon
                            name={
                              isStatusOpen ? "triangle up" : "triangle down"
                            }
                            link
                          />
                        </Main>
                        {isStatusOpen && (
                          <FeaturesStatus status={room.status} />
                        )}
                      </Part>
                      <Part>
                        <Main onClick={this.handleEditing}>
                          <TitleFeature>Editing</TitleFeature>
                          <Icon
                            name={
                              isEditingOpen ? "triangle up" : "triangle down"
                            }
                            link
                          />
                        </Main>
                        {isEditingOpen && <FeaturesEditing todo={room.todo} />}
                      </Part>
                      <Part>
                        <Main onClick={this.handleSteps}>
                          <TitleFeature>Steps</TitleFeature>
                          <Icon
                            name={isStepsOpen ? "triangle up" : "triangle down"}
                            link
                          />
                        </Main>
                        {isStepsOpen && <FeaturesStepping />}
                      </Part>
                    </Fragment>
                  );
                }
              }}
            </FetcherTodo>
          </FeaturesTools>
        ) : (
          <h2>Select a todo...</h2>
        )}
      </SidebarContainer>
    );
  }
}

const mapStateToProps = state => ({
  todoToShow: state.TodoTools
});

export default connect(mapStateToProps)(Sidebar);
