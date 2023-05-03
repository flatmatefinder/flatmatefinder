import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SideNav from '../components/settings/SideNav';
import DeleteAccountPopup from '../components/settings/DeleteAccountPopup';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  const handleDeleteAccount = (password) => {
    console.log('Deleting account with password:', password);
  };

  const handleCloseDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(false);
  };

  const handleShowDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(true);
  };

  return (
    <Container id="settings-page">
      <h1 className="text-center mt-5">Settings</h1>
      <SideNav selectedOption={selectedOption} setSelectedOption={setSelectedOption} handleDeleteAccountPopup={handleShowDeleteAccountPopup} />
      <DeleteAccountPopup show={showDeleteAccountPopup} handleClose={handleCloseDeleteAccountPopup} handleDeleteAccount={handleDeleteAccount} />
    </Container>
  );
};

export default Settings;
