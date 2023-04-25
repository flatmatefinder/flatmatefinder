import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Card from 'react-bootstrap/Card';
import UserCard from '../components/UserCard';

/* A simple static component to render some text for the landing page. */

const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <div id="landing-page">
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
        <div id="landing-page-image2">
          <Row className="d-flex justify-content-center py-5">
            <Col xs={9}>
              <Container fluid>
                <h1 style={{ fontSize: '85px' }}>Welcome Admins!</h1>
              </Container>
            </Col>
          </Row>
        </div>,
        <Row style={{ background: '#3F4540', color: 'white', padding: '100px' }}>
          <h3 style={{ fontSize: '35px' }}>You are an Admin.</h3>
          <p style={{ fontSize: '30px' }}>You are at the peak, the highest level of authority to this website.
            You have the ability to add content on pages, access all items in the Admin Toolbar, and add/remove users.
            You are without any restrictions so use this power wisely.
          </p>
        </Row>,
        <Row className="text-center" style={{ background: '#323933', color: 'white', padding: '10px' }}>
          <h3 style={{ fontSize: '35px' }}>Where Do I Start?</h3>
        </Row>,

        <Row style={{ background: '#434F54', color: 'white', padding: '100px' }}>
          <Col>
            <h3 style={{ fontSize: '35px' }}>Edit the Content Pages</h3>
            <p style={{ fontSize: '30px' }}> Look over the For You and Map pages to ensure everything is in good standing and users have appropriate profiles.
            </p>
            <a href="/profile" className="btn btn-secondary" role="button" id="button">Create Your Profile</a>
          </Col>
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
          </Col>
        </Row>,
        <Row style={{ background: '#586266', color: 'white', padding: '100px' }}>
          <h3 style={{ fontSize: '35px' }}>Overlook the Statistics of the Website</h3>
          <p style={{ fontSize: '35px' }}>Here you can view all the users on the platform with the option of adding or removing users.</p>
        </Row>,
        <Row style={{ background: '#606566', color: 'white', padding: '100px' }}>
          <h3 style={{ fontSize: '35px' }}>Review the Suggestion Feedback Form</h3>
          <p style={{ fontSize: '35px' }}>There is always room for improvement. Read over the Suggestions Feedback Form to see if there is anything that needs to be fixed or improved.</p>
          <a href="/suggestions" className="btn btn-secondary btn-lg" role="button" id="button">Suggestions Page</a>
        </Row>,

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

        <Row style={{ background: '#434F54', color: 'white', padding: '100px' }}>
          <Col>
            <h3 style={{ fontSize: '35px' }}>Step 1</h3>
            <p style={{ fontSize: '30px' }}> Start with creating your profile. Add a profile picture. Finish off with descriptions
              about yourself and socials!
            </p>
            <a href="/profile" className="btn btn-secondary" role="button" id="button">Create Your Profile</a>
          </Col>
          <Col>
            {/*
          <Container className="mt-2 d-flex justify-content-center">
             <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
              <Card.Img
                variant="top"
                src="https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600&width=480"
              />
              <Card.Body>
                <Card.Title>Winnie the Pooh</Card.Title>
                <Card.Text>
                  He is a bear who loves honey and can eat honey all day!
                </Card.Text>
                <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a>
              </Card.Body>
            </Card>

          </Container> */}
            <Container className="mt-2 d-flex justify-content-center">
              <UserCard />
            </Container>
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

    </div>

  );
};

export default Landing;
