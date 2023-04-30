import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { PublicUsers } from '../../../api/user/PublicUser';
import LoadingSpinner from '../../components/LoadingSpinner';
import PublicUserCard from '../../components/cards/PublicUserCard';

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
    return {
      users: userItems,
      ready: rdy,
    };
  }, []);

  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  // eslint-disable-next-line no-nested-ternary
  return (ready ? (
    !users.find((user) => user.owner === currentUser).accountsuspended ? (
      <Container id="foryou-page" className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Col className="text-center">
              <h2>Your Matched Users</h2>
            </Col>
          </Col>
        </Row>
        <Row xs={1} md={4} className="justify-content-center">
          {/* eslint-disable-next-line no-shadow */}
          {users.map(user => (!user.accountsuspended && currentUser !== user.owner ? (
            <Col key={`col-${user._id}`} style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <PublicUserCard username={user.owner} />
            </Col>
          ) : ''))}
        </Row>
      </Container>
    ) : <h1 className="text-center" style={{ color: 'red' }}> Your Account has been Suspended. </h1>
  ) : <LoadingSpinner />);
};

export default ForYou;
