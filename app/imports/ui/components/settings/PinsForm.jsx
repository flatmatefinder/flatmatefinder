import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const PinsForm = () => (
  <Container className="py-3">
    <Form>
      <Form.Group>
        <Form.Text><h2>Add a Pin</h2></Form.Text>
        <Form.Control type="text" placeholder="Enter Pin Title" /> <br />
        <Form.Control type="text" placeholder="Enter Pin Description" /> <br />
        <Form.Control type="text" placeholder="Enter Pin Location" />
      </Form.Group>
      <div style={{ paddingTop: '10px' }}>
        <Button variant="secondary" type="submit">
          Add Pin
        </Button>
      </div>
    </Form>
  </Container>
);
export default PinsForm;
