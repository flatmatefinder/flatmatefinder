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
        <div id="landing-page-image2">
          <Row className="d-flex justify-content-center py-5">
            <Col xs={9}>
              <Container fluid>
                <h1 style={{ fontSize: '85px' }}>Welcome Users!</h1>
              </Container>
            </Col>
          </Row>
        </div>,
        <Row style={{ background: '#3F4540', color: 'white', padding: '100px' }}>
          <h3 style={{ fontSize: '35px' }}>You are a User.</h3>
          <p style={{ fontSize: '30px' }}>At FlatemateFinder, we are the bridge your you meeting your new roommate.
            You have the ability to create a profile, photo, and start connecting.
          </p>
        </Row>,
        <Row className="text-center" style={{ background: '#586266', color: 'white', padding: '10px' }}>
          <h3 style={{ fontSize: '35px' }}>Where Do I Start?</h3>
        </Row>,
        <Col>
          <h3 style={{ fontSize: '35px' }}>Step 1</h3>
          <p style={{ fontSize: '30px' }}> Start with creating your profile. Add a profile picture. Finish off with descriptions
            about yourself and socials!
          </p>
          <a href="/profile" className="btn btn-secondary" role="button" id="button">Create Your Profile</a>
        </Col>,
        <Col xs={3}>
          {/* <Container className="mt-2 d-flex justify-content-center">
            <Card style={{width: '18rem', background: '#586266'}} className="landing-card">
              <Card.Img variant="top"
                        src="https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480"/>
              <Card.Body>
                <Card.Title>Winnie the Pooh</Card.Title>
                <Card.Text>
                  He is a bear who loves honey and can eat honey all day!
                </Card.Text>
                <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a>
              </Card.Body>
            </Card>
          </Container> */}
        </Col>,
        <Row className="justify-content-center">
          <Col xs={3}>
            <UserCard />
          </Col>
        </Row>,
        <Row style={{ background: '#586266', color: 'white', padding: '100px' }}>
          <h3 style={{ fontSize: '35px' }}>Step 2</h3>
          <p style={{ fontSize: '35px' }}>Find your perfect flatmate based on your interests and theirs.</p>
        </Row>,
        <Row style={{ background: '#606566', color: 'white', padding: '100px' }}>
          <h3 style={{ fontSize: '35px' }}>Step 3</h3>
          <p style={{ fontSize: '35px' }}>Connect with your potential flatmate using their email or socials.</p>
        </Row>,
      ]) : ''}
      {currentUser ? '' : ([
        <div id="landing-page-image1">
          <Row className="d-flex justify-content-center py-5 mt-7">
            <Col xs={9} className="text-center mb-3" style={{ padding: '175px', color: 'white', fontSize: '65px' }}>
              <Container fluid>
                <h1>Find the perfect roommate for a year.
                  <br />
                  <br />
                  Search for a roommate today!
                </h1>
              </Container>
            </Col>
          </Row>
        </div>,
        <Row>
          <Col className="text-center" style={{ padding: '100px', backgroundColor: '#58665D', color: 'white', fontSize: '44px' }}>
            <h1>Finding a roommate can be challenging</h1>
            <p style={{ fontSize: '35px' }}>Not having the right roommate or a roommate that has different schedules than you are at times hard to deal with.</p>
          </Col>
          <Col className="text-center" style={{ padding: '100px', backgroundColor: '#586266', color: 'white', fontSize: '44px' }}>
            <h1>Connecting makes easier living situations</h1>
            <p style={{ fontSize: '35px' }}>Reaching out to potential roommate matches decreases your chance of a not preferred roommate.</p>
          </Col>
        </Row>,
        <Row style={{ background: '#3F4540', color: 'white', padding: '150px' }}>
          <h3 style={{ fontSize: '35px' }}>How do I find my roommate match?</h3>
          <p style={{ fontSize: '35px' }}>Input information about yourself and your likes/dislikes,
            indicate your preferred sleeping times, and optional social medias. Then you can either
            actively look for people to take to the UH Mānoa campus or wait for someone to message you
            through the application to ask for a ride.
          </p>
        </Row>,
      ])}

    </>

  );
};

export default ForYou;
