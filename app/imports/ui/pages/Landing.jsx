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
        Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
          <h1>Hello Admin</h1>,
        ]) : (
          <>
            <div id="landing-page-image2">
              <Row className="d-flex justify-content-center py-3 mt-4">
                <Col xs={9} className="text-center mb-3" style={{ padding: '100px', color: 'white', fontSize: '65px' }}>
                  <Container fluid>
                    <h1>Find the perfect roommate for a year.
                      <br />
                      <br />
                      Search for a roommate today!
                      Scroll to continue.
                    </h1>
                  </Container>
                </Col>
              </Row>
            </div>
            <Row>
              <Col className="text-center" style={{ padding: '100px', backgroundColor: '#58665D', color: 'white', fontSize: '44px' }}>
                <h1>Finding a roommate can be challenging</h1>
                <p style={{ fontSize: '35px' }}>Not having the right roommate or a roommate that has different schedules than you are at times hard to deal with.</p>
              </Col>
              <Col className="text-center" style={{ padding: '100px', backgroundColor: '#586266', color: 'white', fontSize: '44px' }}>
                <h1>Connecting makes easier living situations</h1>
                <p style={{ fontSize: '35px' }}>Reaching out to potential roommate matches decreases your chance of a not preferred roommate.</p>
              </Col>
            </Row>
            <Row style={{ background: '#3F4540', color: 'white', padding: '150px' }}>
              <h3 style={{ fontSize: '35px' }}>How do I find my roommate match?</h3>
              {/* eslint-disable-next-line max-len */}
              <p style={{ fontSize: '35px' }}>Input information about yourself and your likes/dislikes, indicate your preferred sleeping times, and optional social medias. Then you can either actively look for people to take to the UH Manoa campus or wait for someone to message you through the application to ask for a ride.</p>
            </Row>
          </>
        ),
      ]) : (
        <>
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
          </div>
          <Row>
            <Col className="text-center" style={{ padding: '100px', backgroundColor: '#58665D', color: 'white', fontSize: '44px' }}>
              <h1>Finding a roommate can be challenging</h1>
              <p style={{ fontSize: '35px' }}>Not having the right roommate or a roommate that has different schedules than you are at times hard to deal with.</p>
            </Col>
            <Col className="text-center" style={{ padding: '100px', backgroundColor: '#586266', color: 'white', fontSize: '44px' }}>
              <h1>Connecting makes easier living situations</h1>
              <p style={{ fontSize: '35px' }}>Reaching out to potential roommate matches decreases your chance of a not preferred roommate.</p>
            </Col>
          </Row>
          <Row style={{ background: '#3F4540', color: 'white', padding: '150px' }}>
            <h3 style={{ fontSize: '35px' }}>How do I find my roommate match?</h3>
            {/* eslint-disable-next-line max-len */}
            <p style={{ fontSize: '35px' }}>Input information about yourself and your likes/dislikes, indicate your preferred sleeping times, and optional social medias. Then you can either actively look for people to take to the UH Manoa campus or wait for someone to message you through the application to ask for a ride.</p>
          </Row>
        </>
      )}

    </>

  );
};

export default Landing;
