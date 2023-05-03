import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DataVisibilityForm from './DataVisibilityForm';
import PinsForm from './PinsForm';

const SideNav = ({ selectedOption, setSelectedOption, handleDeleteAccountPopup }) => {
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container className="settings-page">
      <Row className="justify-content-center">
        <Col md={4} className="sidebar">
          <Container id="data-visibility-button" className={`option ${selectedOption === 'data-visibility' ? 'selected' : ''}`} onClick={() => handleOptionClick('data-visibility')}>
            Data Visibility
          </Container>
          <Container className={`option ${selectedOption === 'pins' ? 'selected' : ''}`} onClick={() => handleOptionClick('pins')}>
            Pins
          </Container>
          <Button variant="danger" className="delete-account-btn" onClick={handleDeleteAccountPopup}>
            Delete Account
          </Button>
        </Col>
        <Col md={7} className="main-display">
          {selectedOption === 'data-visibility' && (
            <DataVisibilityForm />
          )}
          {selectedOption === 'pins' && (
            <PinsForm />
          )}
          {!selectedOption && (
            <Container className="placeholder-text">
              Please select an option from the sidebar to get started.
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SideNav.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  handleDeleteAccountPopup: PropTypes.func.isRequired,
};

export default SideNav;
