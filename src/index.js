import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import EventList from './scenes/EventList/EventList';
import EventCreation from './scenes/EventCreation/EventCreation';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Bouker</span>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav bsStyle="pills">
            <LinkContainer to="/find">
              <NavItem >Find</NavItem>
            </LinkContainer>
            <LinkContainer to="/create">
             <NavItem >Create</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/find" component={EventList} />
          <Route path="/create" component={EventCreation} />
          <Redirect path="*" to="/find"></Redirect>
        </Switch>
      </div>
    </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
