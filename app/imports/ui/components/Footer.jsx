import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container className="text-light">
      <Row className="text-center">
        <p>
          By signing up you agree to our <a href="https://www.google.com" target="_top">Terms of Use</a> and  <a href="https://www.google.com" target="_top">Privacy Policy</a>.
        </p>
      </Row>
      <Row className="py-3 text-center">
        <Col />
        <Col>
          <div>Meet the Team</div>
        </Col>
        <Col>
          <div>Suggestions</div>
        </Col>
        <Col>
          <div>Github</div>
        </Col>
        <Col />
      </Row>
    </Container>
  </footer>
);

export default Footer;
