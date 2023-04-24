import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
/* A simple static component to render some text for the landing page. */
const AdminLanding = () => (
  <>
    <div id="landing-page-image1">
      <Row className="d-flex justify-content-center py-5 mt-7">
        <Col xs={9} className="text-center mb-3" style={{ padding: '175px', color: 'white', fontSize: '65px' }}>
          <h1 style={{ fontSize: '67px' }}>Find your perfect roommate for a year.</h1>
          <p>Search for a roommate today!</p>
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
);

export default AdminLanding;
