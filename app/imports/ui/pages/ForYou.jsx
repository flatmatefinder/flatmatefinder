import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import UserCard from '../components/UserCard';

/* Renders the ForYou page for adding a document. */
const ForYou = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <>
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
        <Col>
          <Container className="mt-2 d-flex justify-content-center">
            <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
              <Card.Img variant="top" src="https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480" />
              <Card.Body>
                <Card.Title>Winnie the Pooh</Card.Title>
                <Card.Text>
                  He is a bear who loves honey and can eat honey all day!
                </Card.Text>
                <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a>
              </Card.Body>
            </Card>
          </Container>
        </Col>,

      ]) : currentUser ? ([
        <Col>
          <Container className="mt-2 d-flex justify-content-center">
            <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
              <Card.Img variant="top" src="https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480" />
              <Card.Body>
                <Card.Title>Winnie the Pooh (2) </Card.Title>
                <Card.Text>
                  He is a bear who loves honey and can eat honey all day!
                </Card.Text>
                <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a>
              </Card.Body>
            </Card>
          </Container>
        </Col>,
      ]) : ''}

    </>

  );
};

export default ForYou;
