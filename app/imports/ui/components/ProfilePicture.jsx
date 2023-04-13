import React from 'react';
import PropTypes from 'prop-types';
import { PersonCircle } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ProfilePicture = ({ userName }) => (
  userName === '' ? (/** If the user doesn't exist */
    <PersonCircle size={60} /> /** Then just display a PersonCircle Icon */
  ) : (
    <PersonCircle size={60} /> /** We'll have to change this to be their actual Icon. */
  )
);

// Require a document to be passed to this component.
ProfilePicture.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default ProfilePicture;
