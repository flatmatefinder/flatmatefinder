import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer id="basic-footer" className="mt-auto py-3 bg-dark">
    <Container className="text-light">
      <Row className="text-center">
        <p>
          By signing up you agree to our <a id="termsandconditions-footer" href="/termsandconditions">Terms and Conditons</a> and <a id="privacypolicy-footer" href="/privacypolicy">Privacy Policy</a>.
        </p>
      </Row>
      <Row className="py-3 text-center">
        <Col />
        <Col>
          <a href="/meettheteam" id="meettheteam-footer">Meet the Team</a>
        </Col>
        <Col>
          <a href="/suggestions" id="suggestions-footer">Suggestions</a>
        </Col>
        <Col>
          <a href="https://flatmatefinder.github.io/" id="suggestions-footer">Github</a>
        </Col>
        <Col>
          <p>
            <a href="https://docs.google.com/document/d/15glZaHxvn-8OiJt8GSdNYwgJU4knJpIULpwFodKEaSY/edit" id="suggestions-footer">Team Contract</a>
          </p>
        </Col>
        <Col />
      </Row>
    </Container>
  </footer>
);

export default Footer;
