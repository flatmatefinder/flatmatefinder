import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Col, Row, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (// eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser ? ([
        <h1>hello</h1>,
      ]) : ([<h1>bye</h1>])}
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
        <h1>Hello Admin</h1>,
      ]) : ''}

    </>

  );
};

export default Landing;
