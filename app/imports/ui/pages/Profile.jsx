import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, BoolField, ErrorsField, NumField, RadioField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Users } from '../../api/user/User';

const bridge = new SimpleSchema2Bridge(Users.schema.omit('owner'));

/* Renders the EditStuff page for editing a single document. */
const Profile = () => {
  const { username } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const submit = (data) => {
    const { pfp, name, alcohol, alcohol_preference, sleep, sleep_preference, sex, sex_preference } = data;
    Users.collection.update({ owner: username }, {
      $set: {
        pfp: pfp,
        name: name,
        owner: username,
        alcohol: alcohol,
        alcohol_preference: alcohol_preference,
        sleep: sleep,
        sleep_preference: sleep_preference,
        sex: sex,
        sex_preference: sex_preference,
      } }, (error) => (error ?
      swal('Error', `${username} ${error.message}`, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Profile Page</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="pfp" defaultValue="Hello" />
                <TextField name="name" placeholder="Xavier Burt" />
                <BoolField name="alcohol" />
                <BoolField name="alcohol_preference" />
                <RadioField name="sleep" />
                <NumField name="sleep_preference" decimal={null} />
                <NumField name="sex" />
                <NumField name="sex_preference" />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
