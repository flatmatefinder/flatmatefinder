import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const DeleteAccountPopup = ({ show, handleClose, handleDeleteAccount }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteClick = () => {
    handleDeleteAccount(password);
    handleClose();
  };

  // const handleLogoutClick = () => {
  //   handleLogout();
  //   handleClose();
  // };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter your password to verify the deletion of your account:</p>
        <input type="password" className="form-control mb-3" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
        <p>This action cannot be undone. Are you sure you want to delete your account?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteAccountPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
};

export default DeleteAccountPopup;
