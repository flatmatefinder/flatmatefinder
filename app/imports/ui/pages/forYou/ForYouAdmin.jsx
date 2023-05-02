import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { PublicUsers } from '../../../api/user/PublicUser';
import LoadingSpinner from '../../components/LoadingSpinner';
import AdminUserCard from '../../components/cards/AdminUserCard';

/* Renders the ForYou page for adding a document. */
const ForYouAdmin = () => {
  const { ready, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription = Meteor.subscribe(PublicUsers.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const userItems = PublicUsers.collection.find({}).fetch();
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
            <h2>All Users <p style={{ color: 'red' }}> ADMIN </p></h2>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={4} className="justify-content-center">
        {/* eslint-disable-next-line no-shadow */}
        {users.map(user => (
          <Col key={`adminCol-${user._id}`} style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <AdminUserCard username={user.owner} />
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

export default ForYouAdmin;
