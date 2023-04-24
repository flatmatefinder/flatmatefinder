import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const PrivacyPolicy = () => (
  <Container className="py-3 text-center">
    <Row>
      <Row className="justify-content-center">
        <Col xs={5} className="text-center">
          <h2>FlatmateFinder Privacy Policy</h2>
        </Col>
      </Row>
    </Row>
    <Row id="PP" className="justify-content-center">
      <object data="/PrivacyPolicy.pdf" type="application/pdf" width="100%" height="80%">
        <p>Alternative text - include a link <a href="/PrivacyPolicy.pdf">to the PDF!</a></p>
      </object>
    </Row>
  </Container>
);

export default PrivacyPolicy;
