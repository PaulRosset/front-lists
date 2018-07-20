import React, { Component } from "react";
import styled from "styled-components";
import { Icon, Input } from "semantic-ui-react";
import { deleteEntry } from "./../../states/actions";
import { app } from "./../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import ContentTodos from "./ContentTodos";
import PropTypes from "prop-types";

const ContentContainer = styled.div`
  flex: 2;
  border-right: 1px solid #b4c3ca;
  padding: 10px 2rem 10px 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Descision = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Limit = styled.hr`
  width: 80%;
  height: 2px;
  color: #b4c3ca;
  margin-top: 10px;
  background-color: #b4c3ca;
  border: none;
  border-radius: 5px;
`;

class Content extends Component {
  state = {};

  handleDelete = e => {
    this.props.dispatch(deleteEntry(e.target.getAttribute("id")));
  };

  handleInput = (e, { value }) => {
    this.setState({
      [e.target.getAttribute("id")]: value
    });
  };

  handleConfirm = e => {
    if (e.key === "Enter" || e.target.getAttribute("data-click")) {
      const idTodo = e.target.getAttribute("id");
      const refRoom = app
        .database()
        .ref(`todos/${this.props.idRoom}/${idTodo}`);
      refRoom.set(
        {
          id: idTodo,
          todo: this.state[idTodo] || "",
          status: "active"
        },
        err => {
          if (err) {
            return toast(
              <p>
                <Icon name="check" color="red" />
                {err}
              </p>,
              {
                className: "notif",
                progressClassName: "notif-progress",
                bodyClassName: "notif-body"
              }
            );
          } else {
            this.props.dispatch(deleteEntry(idTodo));
            return toast(
              <p>
                <Icon name="check" color="green" />
                {`Todo ${idTodo} Succesfully created!`}
              </p>,
              {
                className: "notif",
                progressClassName: "notif-progress",
                bodyClassName: "notif-body"
              }
            );
          }
        }
      );
    }
  };

  componentDidUpdate() {
    if (this.props.creatingNewTodo.length !== 0) {
      this.inputFocus.focus();
    }
  }

  handleRefForFocus = input => {
    if (this.props.creatingNewTodo) {
      this.inputFocus = input;
    }
  };

  render() {
    const size = this.props.creatingNewTodo
      ? this.props.creatingNewTodo.length - 1
      : 0;
    return (
      <ContentContainer>
        {this.props.creatingNewTodo.map((entry, index) => (
          <InputContainer key={index}>
            <Input
              placeholder="Your todo..."
              fluid
              onChange={this.handleInput}
              onKeyDown={this.handleConfirm}
              id={entry.id}
              ref={this.handleRefForFocus}
            />
            <Descision>
              <Icon
                name="check"
                color="green"
                link
                id={entry.id}
                data-click={true}
                onClick={this.handleConfirm}
              />
              <Icon
                name="close"
                color="red"
                link
                id={entry.id}
                onClick={this.handleDelete}
              />
            </Descision>
            {size === index ? <Limit /> : null}
          </InputContainer>
        ))}
        <ContentTodos idRoom={this.props.idRoom} />
        <ToastContainer />
      </ContentContainer>
    );
  }
}

Content.propTypes = {
  dispatch: PropTypes.func,
  creatingNewTodo: PropTypes.arrayOf(PropTypes.object)
};

export default Content;
