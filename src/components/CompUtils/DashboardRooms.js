import React, { Component } from "react";
import styled from "styled-components";
import FetcherDataRooms from "./FetcherDataRooms";
import { Icon, Loader } from "semantic-ui-react";
import _ from "lodash/collection";
import moment from "moment";
import { Tooltip } from "react-tippy";
import { Link } from "react-router-dom";
import { updateRoomData } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { Rehover } from "rehover";

const ContainerRoomsView = styled.div`
  width: 100%;
`;

const RoomView = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  border: solid 1px #d0d0d0;
  border-radius: 3px;
  padding: 0px 10px 0px 10px;
  box-shadow: 0 3px 10px 0 rgba(33, 36, 61, 0.1);
  justify-content: space-between;
  height: 5em;
  color: #24292e;
  transition-duration: 0.4s;

  &:hover {
    color: #24292e !important;
    transition-duration: 0.4s;
    transform: scale(1.03);
    box-shadow: 0 3px 10px 0 rgba(33, 36, 61, 0.3);
  }
`;

const RoomName = styled.h2`
  margin: 0;
`;

const ShortCut = styled.div`
  align-self: flex-start;
  margin-top: 3px;
`;

const ToolsShow = styled.div`
  position: absolute;
  margin-top: 5px;
  margin-left: -10px;
`;

const ShowPart = styled.div`
  display: flex;
  flex-direction: column;
`;

const LastUpdate = styled.span`
  color: #d0d0d0;
  font-size: 11px;
`;

export default class DashBoardRooms extends Component {
  handleLock = e => {
    e.preventDefault();
    updateRoomData(
      e.target.getAttribute("id"),
      "publicy",
      e.target.getAttribute("publicy") === "private" ? "public" : "private",
      (err, res) => {
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
              {res}
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
  };

  render() {
    return (
      <ContainerRoomsView>
        <FetcherDataRooms>
          {({ rooms, loader }) => {
            if (loader) {
              return <Loader active inline="centered" />;
            } else {
              return _.map(rooms, (room, key) => (
                <RoomView key={key} to={`/room/${room.id}`}>
                  <ShowPart>
                    <RoomName>{room.name}</RoomName>
                    <LastUpdate>
                      {room.lastUpdate
                        ? `Modified ${moment
                            .duration(moment().diff(moment(room.lastUpdate)))
                            .humanize()} ago`
                        : null}
                    </LastUpdate>
                  </ShowPart>
                  <ShortCut>
                    <Rehover delay={150}>
                      <Icon
                        source="true"
                        bordered
                        circular
                        link
                        name="certificate"
                        size="small"
                        className="IconOnViewRoom"
                      />
                      <ToolsShow destination="true">
                        <Icon
                          source="true"
                          bordered
                          circular
                          link
                          name="edit outline"
                          size="small"
                        />
                        <Icon
                          source="true"
                          bordered
                          circular
                          link
                          color="red"
                          name="close"
                          size="small"
                        />
                      </ToolsShow>
                    </Rehover>
                    <Tooltip
                      title={
                        room.publicy === "public"
                          ? "Lock the room"
                          : "Unlock the room"
                      }
                      position="top"
                      trigger="mouseenter"
                    >
                      <Icon
                        bordered
                        circular
                        link
                        name={room.publicy === "public" ? "lock open" : "lock"}
                        size="small"
                        className="IconOnViewRoom"
                        id={room.id}
                        publicy={room.publicy}
                        onClick={this.handleLock}
                      />
                    </Tooltip>
                    <Tooltip
                      title={`Creation: ${moment(room.timeCreation).format(
                        "DD/MM/YYYY, HH:mm:ss"
                      )}`}
                      position="top"
                      trigger="mouseenter"
                    >
                      <Icon
                        bordered
                        circular
                        link
                        name="calendar alternate"
                        size="small"
                        className="IconOnViewRoom"
                      />
                    </Tooltip>
                  </ShortCut>
                </RoomView>
              ));
            }
          }}
        </FetcherDataRooms>
        <ToastContainer />
      </ContainerRoomsView>
    );
  }
}
