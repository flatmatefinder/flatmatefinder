import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { PublicUsers } from '../../api/user/PublicUser';
import LoadingSpinner from '../components/LoadingSpinner';
import PublicUserCard from '../components/PublicUserCard';
import UserCard from '../components/UserCard';

/* Renders the ForYou page for adding a document. */
const ForYou = () => {
  const { ready, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(PublicUsers.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription.ready();
    const rdy = rdy1;
    // Get the Stuff documents
    const userItems = PublicUsers.collection.find({}).fetch();
    console.log(userItems);
    return {
      users: userItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="foryou-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>User Cards</h2>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={4} className="justify-content-center">
        {/* eslint-disable-next-line no-shadow */}
        {users.map(user => (
          <Col key={`col-${user._id}`} style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <PublicUserCard username={user.owner} />
          </Col>
        ))}
      </Row>
    </Container>
  )
  /** users.forEach((user) => {
      console.log('hello');

    }* */

    : <LoadingSpinner />);
};

export default ForYou;
