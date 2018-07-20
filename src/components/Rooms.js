import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import CreationRoom from "./CompUtils/CreationRoom";
import DashBoardRooms from "./CompUtils/DashboardRooms";

const RoomsContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const ToolsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid 2px #24292e;
  padding-bottom: 10px;
  margin-top: 15px;
`;

const DashboardRooms = styled.div`
  margin-top: 15px;
`;

class RoomsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatingRoom: false
    };
  }

  createRoom = () => {
    this.setState(prevState => ({
      isCreatingRoom: !prevState.isCreatingRoom
    }));
  };

  render() {
    const { isCreatingRoom } = this.state;
    return (
      <RoomsContainer>
        <ToolsBar>
          <Icon
            name={isCreatingRoom ? "dashboard" : "plus"}
            link
            onClick={this.createRoom}
          />
        </ToolsBar>
        <DashboardRooms>
          {isCreatingRoom ? <CreationRoom /> : <DashBoardRooms />}
        </DashboardRooms>
      </RoomsContainer>
    );
  }
}

export default RoomsView;
