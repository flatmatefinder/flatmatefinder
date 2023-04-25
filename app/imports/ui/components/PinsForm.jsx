import React from 'react';
import { Form, Button } from 'react-bootstrap';

const PinsForm = () => (
  <Form>
    <Form.Group>
      <Form.Label>Add a Pin</Form.Label>
      <Form.Control type="text" placeholder="Enter Pin Title" />
      <Form.Control type="text" placeholder="Enter Pin Description" />
      <Form.Control type="text" placeholder="Enter Pin Location" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Add Pin
    </Button>
  </Form>
);
export default PinsForm;
