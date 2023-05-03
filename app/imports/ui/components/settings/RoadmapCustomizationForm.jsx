import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const RoadmapCustomizationForm = () => (
  <Container className="py-3">
    <Form>
      <Form.Group>
        <Form.Text><h2>Customize Roadmap Colors</h2></Form.Text>
        <Form.Control type="color" />
      </Form.Group> <br />
      <Button variant="secondary" type="submit">
        Save Changes
      </Button>
    </Form>
  </Container>
);

export default RoadmapCustomizationForm;
