import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const SuggestionsAdmin = () => (
  <Container id="suggestions-page" className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>Suggestions<p style={{ color: 'red' }}> ADMIN </p></h2>
      </Col>
    </Row>
    <Row>
      <iframe title="suggestionresponses" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS9IAhvQQSATppRYrznGg6OUTMuega7uRnRDm08QfC--ZRpEDLXaHWQzTidP3ABRnKIMQRiNuF_76QJ/pubhtml?widget=true&amp;headers=false" height="500" width="100vw" />
    </Row>
  </Container>
);

export default SuggestionsAdmin;
