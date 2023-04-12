import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container className="text-light">
      <Row className="text-center">
        <p>
          By signing up you agree to our <a href="/termsandconditions">Terms of Use</a> and <a href="/privacypolicy">Privacy Policy</a>.
        </p>
      </Row>
      <Row className="py-3 text-center">
        <Col />
        <Col>
          <a href="/meettheteam" id="suggestions">Meet the Team</a>
        </Col>
        <Col>
          <a href="/suggestions" id="suggestions">Suggestions</a>
        </Col>
        <Col>
          <a href="/" id="suggestions">Github</a>
        </Col>
        <Col />
      </Row>
    </Container>
  </footer>
);

export default Footer;
