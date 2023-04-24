import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import { UserData } from '../../api/data/Data';
import DataText from './DataText';
import { sleepIntToString } from '../../utils/Utils';

const UserCardAux = ({ user, userData }) => (
  <Card className="h-100">
    <Card.Header className="text-center"><img src={user.pfp} alt="the profile pic couldn't load" width="200" style={{ borderRadius: '50%' }} /></Card.Header>
    <Card.Body className="text-center">
      <Card.Title>{user.name}</Card.Title>
      {/* eslint-disable-next-line no-nested-ternary */}
      <Card.Subtitle>Sex: {user.sex === 0 ? 'Male' : user.sex === 1 ? 'Female' : 'Other'}, Alcohol: {user.alcohol ? 'True' : 'False'}, Sleep Time: {sleepIntToString(user.sleep)}</Card.Subtitle>
      <ListGroup variant="flush" style={{ height: '200px', overflowY: 'scroll', maxHeight: '200px', overflowX: 'hidden' }}>
        {userData.map((data) => {
          if (data.data_type !== 'contact') {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        {userData.map((data) => {
          if (data.data_type === 'contact') {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        {/* All this did was make it so that all of their information loads first, and then the contact information. */}
      </ListGroup>
      <ThreeDots />
    </Card.Body>
  </Card>
);

UserCardAux.propTypes = {
  user: PropTypes.shape({
    pfp: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    alcohol: PropTypes.bool,
    alcohol_preferences: PropTypes.bool,
    sleep: PropTypes.number,
    sleep_preferences: PropTypes.number,
    sex: PropTypes.number,
    sex_preference: PropTypes.number,
  }).isRequired,
  userData: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (!UserData.test(propValue[key])) {
      return new Error(
        `Invalid prop \`${propFullName}\` supplied to` +
                ` \`${componentName}\`. Validation failed.`,
      );
    }
    return true;
  }).isRequired,
};

export default UserCardAux;
