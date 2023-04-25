import React from 'react';
import { Form, Button } from 'react-bootstrap';

const RoadmapCustomizationForm = () => (
  <Form>
    <Form.Group>
      <Form.Label>Customize Roadmap Colors</Form.Label>
      <Form.Control type="color" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Save Changes
    </Button>
  </Form>
);

export default RoadmapCustomizationForm;
