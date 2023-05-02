import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const AdminContact = ({ contact }) => (
  <Card className="h-1000">
    <Card.Header>
      <Image src={contact.image} width={75} />
      <Card.Title>{contact.firstName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <footer className="blockquote-footer">{contact.owner}</footer>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
AdminContact.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default AdminContact;
