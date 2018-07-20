import React, { Component } from "react";
import styled from "styled-components";
import { Form, Input, Button, Icon, Confirm } from "semantic-ui-react";
import { connect } from "react-redux";
import { multiUpdateRoom, deleteField } from "../../../utils/firebase";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { unShowTodoToShow } from "../../../states/actions";

const ContainerFeatures = styled.div`
  margin-top: 10px;
`;

class FeaturesStatus extends Component {
  state = {
    todo: this.props.todo,
    open: false,
    loader: false
  };

  handleChange = (e, { value }) => {
    this.setState({ todo: value });
  };

  open = e => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  confirm = () => {
    const { id, idRoom } = this.props.SelectedTodo;
    this.setState({ loader: true }, () => {
      this.props.dispatch(unShowTodoToShow(idRoom));
      deleteField(`todos/${idRoom}/${id}`, (err, res) => {
        if (err) {
          toast(
            <p>
              <Icon name="close" color="red" />
              {err.name}
            </p>,
            {
              className: "notif",
              progressClassName: "notif-progress",
              bodyClassName: "notif-body"
            }
          );
          this.setState({ loader: false, open: false });
        } else {
          toast(
            <p>
              <Icon name="check" color="green" />
              {`Successfully deleted ${id} todo`}
            </p>,
            {
              className: "notif",
              progressClassName: "notif-progress",
              bodyClassName: "notif-body"
            }
          );
          this.setState({
            loader: false,
            open: false
          });
        }
      });
    });
  };

  handleEdit = e => {
    if (e.key === "Enter" || e.target.getAttribute("data-click")) {
      const { id, idRoom } = this.props.SelectedTodo;
      this.setState({ loader: true }, () => {
        const updates = {};
        updates[`todos/${idRoom}/${id}/todo`] = this.state.todo;
        updates[`rooms/${idRoom}/lastUpdate`] = moment().format();
        multiUpdateRoom(updates, err => {
          if (err) {
            toast(
              <p>
                <Icon name="close" color="red" />
                {err.name}
              </p>,
              {
                className: "notif",
                progressClassName: "notif-progress",
                bodyClassName: "notif-body"
              }
            );
            this.setState({ loader: false });
          } else {
            toast(
              <p>
                <Icon name="check" color="green" />
                {`Successfully updated content for ${id} todo`}
              </p>,
              {
                className: "notif",
                progressClassName: "notif-progress",
                bodyClassName: "notif-body"
              }
            );
            this.setState({ loader: false });
          }
        });
      });
    }
  };

  render() {
    const { open } = this.state;
    return (
      <ContainerFeatures>
        <Form widths="equal">
          <label>Todo Edit:</label>
          <Input
            fluid
            size="tiny"
            value={this.state.todo}
            onChange={this.handleChange}
            onKeyDown={this.handleEdit}
            icon={<Icon name="send" link onClick={this.handleEdit} />}
          />
          <Button
            as="a"
            size="tiny"
            color="red"
            className="buttonFeaturesEditing"
            onClick={this.open}
          >
            Delete todo
          </Button>
          <Confirm open={open} onCancel={this.close} onConfirm={this.confirm} />
        </Form>
        <ToastContainer />
      </ContainerFeatures>
    );
  }
}

const mapStateToProps = state => ({
  SelectedTodo: state.TodoTools
});

export default connect(mapStateToProps)(FeaturesStatus);
