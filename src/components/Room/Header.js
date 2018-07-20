import React from "react";
import styled from "styled-components";
import { Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import Reclick from "reclick";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  min-height: 66px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid #b4c3ca;
  background: #f7f9fa;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 1em 0 1em;
  justify-content: space-between;
`;

const Useful = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h3`
  margin: 0 0 0 10px;
  border-left: solid 1px #b4c3ca;
  padding-left: 10px;
`;

const ActionsContainer = styled.div``;

const ActionsTools = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 5;
  background: #fff;
  border: 1px solid #d3dce0;
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  margin-top: 10px;

  &::before {
    content: "";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    point-events: none;
    border-bottom-color: #d3dce0;
    bottom: 100%;
    border-width: 11px 7px;
    margin-left: -7px;
    background: transparent;
  }
`;

const Tool = styled.div`
  padding: 10px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #24292e;
    color: white;
  }
`;

export const Header = props => (
  <HeaderContainer>
    <Useful>
      <Link to="/rooms">
        <Icon
          name="arrow alternate circle left"
          link
          bordered
          circular
          color="black"
        />
      </Link>
      <Title>{props.roomName}</Title>
    </Useful>
    <ActionsContainer>
      <Reclick>
        <button className="ui button" source="true">
          <Icon name="angle down" />Actions
        </button>
        <ActionsTools destination="true">
          <Tool onClick={props.handleNewEntry}>Create new Entry</Tool>
          <Tool>Other test</Tool>
          <Tool>Testing...</Tool>
        </ActionsTools>
      </Reclick>
      <Button>Info</Button>
    </ActionsContainer>
  </HeaderContainer>
);

Header.propTypes = {
  roomName: PropTypes.string,
  handleNewEntry: PropTypes.func
};
