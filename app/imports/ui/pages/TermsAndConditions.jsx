import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const TermsAndConditions = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>Terms and Conditions</h2>
      </Col>
    </Row>
  </Container>
);

export default TermsAndConditions;
