import React, { Component } from "react";
import styled from "styled-components";
import { Form, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { multiUpdateRoom } from "../../../utils/firebase";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const ContainerFeatures = styled.div`
  margin-top: 10px;
`;

class FeaturesStatus extends Component {
  state = {
    value: this.props.status,
    loader: false
  };

  handleChange = (e, { value }) => {
    const { id, idRoom } = this.props.SelectedTodo;
    this.setState({ value, loader: true }, () => {
      const updates = {};
      updates[`todos/${idRoom}/${id}/status`] = this.state.value;
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
              {`Successfully updated status for ${id} todo`}
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
  };

  render() {
    const { value } = this.state;
    return (
      <ContainerFeatures>
        <Form widths="equal">
          <Form.Radio
            label="Active"
            value="active"
            checked={value === "active"}
            onChange={this.handleChange}
            className="RadioFeatures"
          />
          <Form.Radio
            label="Paused"
            value="pause"
            checked={value === "pause"}
            onChange={this.handleChange}
            className="RadioFeatures"
          />
          <Form.Radio
            label="Completed"
            value="complete"
            checked={value === "complete"}
            onChange={this.handleChange}
            className="RadioFeatures"
          />
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
