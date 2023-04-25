import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const MapStuff = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  // eslint-disable-next-line no-empty-pattern
  const { } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
  );

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <h1>map will go here</h1>
      </Row>
    </Container>
  );
};

export default MapStuff;
