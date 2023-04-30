import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const Suggestions = () => {
// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <div id="landing-page">
      {/* eslint-disable-next-line no-nested-ternary */}
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([

        <Container id="suggestions-page" className="py-3">
          <Row className="justify-content-center">
            <Col xs={4} className="text-center">
              <h2>Suggestions<p style={{ color: 'red' }}> ADMIN </p></h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={6} className="text-center">
              <iframe
                title="form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdTvYuRCeATWPROCT1r4I3DlaZWd4-5DsOE4T1yLT9QGjzQWg/viewform?embedded=true"
                width="664"
                height="644"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >Loading…
              </iframe>
            </Col>
            <Col xs={6} className="text-center">
              <iframe
                title="spreadsheet"
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTGKwoEqoTYOTuSL2DUqJ4p_jPe-572PPG0LN7p4jh4i3OQdNriA3Oetj8SU8tr3gwYwRKfOnnVfKtL/pubhtml?widget=true&amp;headers=false"
                width="664"
                height="644"
              />
            </Col>
          </Row>
          <Col />
        </Container>,

      ]) : currentUser ? ([
        <Container id="suggestions-page" className="py-3">
          <Row className="justify-content-center">
            <Col xs={4} className="text-center">
              <h2>Suggestions<p style={{ color: 'red' }} /></h2>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '30px' }}>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdTvYuRCeATWPROCT1r4I3DlaZWd4-5DsOE4T1yLT9QGjzQWg/viewform?embedded=true"
              width="575"
              height="644"
            >Loading…
            </iframe>
          </Row>
        </Container>,
      ]) : ''}
      {currentUser ? '' : ([
        <Container id="suggestions-page" className="py-3">
          <Row className="justify-content-center">
            <Col xs={4} className="text-center">
              <h2>Suggestions<p style={{ color: 'red' }} /></h2>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '30px' }}>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdTvYuRCeATWPROCT1r4I3DlaZWd4-5DsOE4T1yLT9QGjzQWg/viewform?embedded=true"
              width="400"
              height="644"
            >Loading…
            </iframe>
          </Row>
        </Container>,
      ])}
    </div>
  );
};

export default Suggestions;
