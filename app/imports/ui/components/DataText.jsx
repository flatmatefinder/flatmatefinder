import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const DataText = ({ data }) => (
  <ListGroup.Item>
    <p>{data.type}s: {data.data}</p>
  </ListGroup.Item>
);

// Require a document to be passed to this component.
DataText.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.string,
    owner: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default DataText;
