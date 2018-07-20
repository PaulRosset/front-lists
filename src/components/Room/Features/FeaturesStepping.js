import React, { Component } from "react";
import styled from "styled-components";
import { Input, Button, Icon, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { multiUpdateRoom, deleteField } from "../../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import shortid from "shortid";
import FetcherStepTodo from "../../CompUtils/FetcherStepTodo";
import _ from "lodash/collection";

const ContainerFeatures = styled.div`
  margin-top: 10px;
`;

const Step = styled.div`
    display: flex;
    flex-direction: row;
    align-items; center;
    justify-content: space-between;
    border: 1px solid #b4c3ca;
    border-radius: 3px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.09);
    padding: 5px;
    width: 100%;
    margin: 5px 0;
`;

const Title = styled.h4`
  margin: 0;
`;

class FeaturesStepping extends Component {
  state = {
    isStepping: false,
    step: "",
    loader: true
  };

  handleStep = () => {
    this.setState({
      isStepping: true
    });
  };

  handleChange = (e, { value }) => {
    this.setState({
      step: value
    });
  };

  handleStepManager = e => {
    const { id, idRoom } = this.props.SelectedTodo;
    const idStep = e.target.getAttribute("data-id");
    deleteField(`todos/${idRoom}/${id}/step/${idStep}`, err => {
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
      } else {
        toast(
          <p>
            <Icon name="check" color="green" />
            {`Successfully deleted a step for ${id} todo`}
          </p>,
          {
            className: "notif",
            progressClassName: "notif-progress",
            bodyClassName: "notif-body"
          }
        );
      }
    });
  };

  handleSubmit = () => {
    const { id, idRoom } = this.props.SelectedTodo;
    const idStep = shortid.generate();
    this.setState({ loader: true }, () => {
      const updates = {};
      updates[`todos/${idRoom}/${id}/step/${idStep}`] = {
        id: idStep,
        step: this.state.step
      };
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
          this.setState({ loader: false, isStepping: false });
        } else {
          toast(
            <p>
              <Icon name="check" color="green" />
              {`Successfully added a step for ${id} todo`}
            </p>,
            {
              className: "notif",
              progressClassName: "notif-progress",
              bodyClassName: "notif-body"
            }
          );
          this.setState({ loader: false, isStepping: false });
        }
      });
    });
  };

  render() {
    const { isStepping, step } = this.state;
    const { id, idRoom } = this.props.SelectedTodo;
    return (
      <ContainerFeatures>
        {isStepping ? (
          <Input
            fluid
            size="tiny"
            value={step}
            onChange={this.handleChange}
            icon={<Icon name="send" link onClick={this.handleSubmit} />}
          />
        ) : (
          <Button size="tiny" onClick={this.handleStep}>
            Add a step...
          </Button>
        )}
        <FetcherStepTodo idRoom={idRoom} idTodo={id}>
          {({ loader, room }) => {
            if (loader) {
              return <Loader active inline="centered" />;
            } else {
              return _.map(room, (step, index) => (
                <Step key={index}>
                  <Title>{step.step}</Title>
                  <Icon
                    name="close"
                    link
                    color="red"
                    data-id={step.id}
                    onClick={this.handleStepManager}
                  />
                </Step>
              ));
            }
          }}
        </FetcherStepTodo>
        <ToastContainer />
      </ContainerFeatures>
    );
  }
}

const mapStateToProps = state => ({
  SelectedTodo: state.TodoTools
});

export default connect(mapStateToProps)(FeaturesStepping);
