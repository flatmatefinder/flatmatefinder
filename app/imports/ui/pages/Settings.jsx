import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SideNav from '../components/settings/SideNav';
import DeleteAccountPopup from '../components/settings/DeleteAccountPopup';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('data-visibility');
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  const handleDeleteAccount = (password) => {
    // TODO: Implement account deletion logic
    console.log('Deleting account with password:', password);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  const handleCloseDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(false);
  };

  const handleShowDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(true);
  };

  return (
    <Container id="settings-page" className="py-3">
      <h1 className="text-center mt-5 " style={{ color: 'white' }}>Settings</h1>
      <SideNav selectedOption={selectedOption} setSelectedOption={setSelectedOption} handleDeleteAccountPopup={handleShowDeleteAccountPopup} />
      <DeleteAccountPopup show={showDeleteAccountPopup} handleClose={handleCloseDeleteAccountPopup} handleDeleteAccount={handleDeleteAccount} handleLogout={handleLogout} />
    </Container>
  );
};

export default Settings;
