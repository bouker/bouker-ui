import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './MenuBar.css';

class MenuBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span>Bouker</span>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="pills">
          <LinkContainer to="/create">
            <NavItem >Create</NavItem>
          </LinkContainer>
          <LinkContainer to="/find">
            <NavItem >Find</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    )
  }
}

export default MenuBar;