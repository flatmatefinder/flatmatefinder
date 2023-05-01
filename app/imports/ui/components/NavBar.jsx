import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill, PersonAdd, GearFill } from 'react-bootstrap-icons';
import ProfilePicture from './ProfilePicture';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg" className="justify-content-center px-5">
      <>
        <Navbar.Brand href="#home"><Image src="FlatmateLogo.png" width={80} /></Navbar.Brand>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Flatmate Finder</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="list-contact-admin-nav" as={NavLink} to="/suggestions">Suggestions</Nav.Link>,
              <Nav.Link id="admin-nav" as={NavLink} to="/admin">Admin</Nav.Link>,
              <Nav.Link id="map-admin-nav" as={NavLink} to="/map">Map</Nav.Link>,
            ]) : ''}
            {currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="foryou-nav" as={NavLink} to="/foryou">For You</Nav.Link>,
              <Nav.Link id="map-nav" as={NavLink} to="/map">Map</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title={<ProfilePicture userName={currentUser} />}>
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={<ProfilePicture userName={currentUser} />}>
                <NavDropdown.Header id="navbar-header"> {`${currentUser}`} </NavDropdown.Header>
                <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
                  <PersonAdd />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-settings" as={NavLink} to="/settings">
                  <GearFill />
                  {' '}
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </>
    </Navbar>
  );
};

export default NavBar;
