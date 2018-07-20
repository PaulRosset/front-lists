import React, { Component } from "react";
import styled from "styled-components";
import { Loader, Icon } from "semantic-ui-react";
import FetcherRoom from "../CompUtils/FetcherRoom";
import _ from "lodash/collection";
import { connect } from "react-redux";
import { getTodoToShow } from "./../../states/actions";

const statusColor = {
  active: {
    color: "orange",
    icon: "play"
  },
  complete: {
    color: "green",
    icon: "check"
  },
  pause: {
    color: "blue",
    icon: "pause"
  }
};

const ContainerContent = styled.div``;

const Todo = styled.div`
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${props => statusColor[props.status].color};
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.09);
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 0.4s;
  }
`;

const Title = styled.h4`
  margin: 0;
`;

const ContainerQuickTools = styled.div`
  display: flex;
  flex-direction: row;
`;

class ContentTodos extends Component {
  handleTodo = e => {
    const id = e.target.getAttribute("id");
    this.props.dispatch(getTodoToShow({ id, idRoom: this.props.idRoom }));
  };

  render() {
    return (
      <ContainerContent>
        <FetcherRoom idRoom={this.props.idRoom}>
          {({ loader, room }) => {
            if (loader) {
              return <Loader active inline="centered" />;
            } else {
              return _.map(room, (todo, index) => (
                <Todo
                  key={index}
                  onClick={this.handleTodo}
                  id={todo.id}
                  status={todo.status}
                >
                  <Title>{todo.todo}</Title>
                  <ContainerQuickTools>
                    <Icon
                      name={statusColor[todo.status].icon}
                      inverted
                      color={statusColor[todo.status].color}
                      link
                      circular
                      bordered
                    />
                  </ContainerQuickTools>
                </Todo>
              ));
            }
          }}
        </FetcherRoom>
      </ContainerContent>
    );
  }
}

export default connect()(ContentTodos);
