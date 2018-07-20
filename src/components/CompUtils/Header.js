import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const HeaderContainer = styled.div`
  width: 100%;
  height: 5em;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #24292e;
  color: white;
`;

const Nav = styled.div`
  margin-right: 30px;
`;

const Menu = styled.div`
  margin-left: 30px;
`;

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <Menu>
          <Icon name="ellipsis vertical" />
        </Menu>
        <Nav>{this.props.children}</Nav>
      </HeaderContainer>
    );
  }
}

export default Header;
