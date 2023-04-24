import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const TermsAndConditions = () => (
  <Container className="pt-3 text-center">
    <Row className="justify-content-center">
      <Col xs={5} className="text-center">
        <h2>FlatmateFinder Terms of Service</h2>
      </Col>
    </Row>
    <Row>
      <Col id="PP" className="justify-content-center">
        <object data="/ToS.pdf" type="application/pdf" width="100%" height="80%">
          <p>ToS Link <a href="/ToS.pdf">to the PDF!</a></p>
        </object>
      </Col>
    </Row>
  </Container>
);

export default TermsAndConditions;
