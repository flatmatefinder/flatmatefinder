import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';

const MeettheTeam = () => (
  <Container className="py-3 text-center" fluid>
    <Row className="py-3">
      <Col>
        <h1>Meet the Team</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Image src="https://avatars.githubusercontent.com/u/66411207?v=4" roundedCircle fluid />
        <h4><a href="https://beydlern.github.io/" id="meet-team-text">Nicholas Beydler</a></h4>
        <h6>beydlern@hawaii.edu</h6>
      </Col>
      <Col>
        <Image src="https://avatars.githubusercontent.com/u/97270148?v=4" roundedCircle fluid />
        <h4><a href="https://xavierburt.github.io/" id="meet-team-text">Xavier Burt</a></h4>
        <h6>rxb@hawaii.edu</h6>
      </Col>
      <Col>
        <Image src="https://avatars.githubusercontent.com/u/78561598?v=4" roundedCircle fluid />
        <h4><a href="https://kayshakk.github.io/" id="meet-team-text">Kaysha Kealalio</a></h4>
        <h6>kayshakk@hawaii.edu</h6>
      </Col>
      <Col>
        <Image src="https://avatars.githubusercontent.com/u/97265599?v=4" roundedCircle fluid />
        <h4><a href="https://bri111.github.io/" id="meet-team-text">Brianna Lee</a></h4>
        <h6>brianall@hawaii.edu</h6>
      </Col>
      <Col>
        <Image src="https://avatars.githubusercontent.com/u/122927817?v=4" roundedCircle fluid />
        <h4><a href="https://erickorozcociprian.github.io/" id="meet-team-text">Erick Orozco-Ciprian</a></h4>
        <h6>ciprian@hawaii.edu</h6>
      </Col>
    </Row>
  </Container>
);

export default MeettheTeam;
