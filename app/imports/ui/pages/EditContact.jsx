import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  LongTextField,
  SubmitField,
  TextField,
} from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Contacts } from '../../api/contacts/Contact';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Contacts.schema);

const EditContacts = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditContacts', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Contacts.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditContacts', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { firstName, lastName, address, image, description } = data;
    Contacts.collection.update(_id, { $set: { firstName, lastName, address, image, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Contact</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col> <TextField name="firstName" placeholder="Scott" /> </Col>
                  <Col> <TextField name="lastName" placeholder="Robertson" /> </Col>
                </Row>
                <Row>
                  <Col> <TextField name="address" placeholder="1680 East-West Rd." /> </Col>
                  <Col> <TextField name="image" placeholder="http://www2.hawaii.edu/~scottpr/images/RobertsonThumb.jpg" /> </Col>
                </Row>
                <LongTextField
                  name="description"
                  placeholder="I am Chair of the Information and Computer Sciences
                Department at the University of Hawaii, Manoa, where I teach human-computer interaction, programming,
                data structures, and cognitive science. I conduct research on how social media is used for civic engagement and issues related to e-democracy and social informatics."
                />
                <SubmitField value="submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditContacts;
