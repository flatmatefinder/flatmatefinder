import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

/** Renders the text for the data to be displayed on the UserCard.jsx */
const DataText = ({ data }) => (
  <ListGroup.Item>
    {/* eslint-disable-next-line no-nested-ternary */}
    <p>{data.data_type === 'preference' ? 'I want someone who is: ' : data.data_type === 'habit' ? 'I am: ' : data.data_type === 'contact' ? 'Contact me at: ' : 'You can\'t be:'} {data.data}</p>
  </ListGroup.Item>
);

// Require a document to be passed to this component.
DataText.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.string,
    owner: PropTypes.string,
    data_type: PropTypes.string,
  }).isRequired,
};

export default DataText;
