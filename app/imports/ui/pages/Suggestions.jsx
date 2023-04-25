import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const Suggestions = () => (
  <Container id="suggestions-page" className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>Suggestions</h2>
      </Col>
    </Row>
    <Row>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdTvYuRCeATWPROCT1r4I3DlaZWd4-5DsOE4T1yLT9QGjzQWg/viewform?embedded=true"
        width="675"
        height="444"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >Loading…
      </iframe>
    </Row>
  </Container>
);

export default Suggestions;
