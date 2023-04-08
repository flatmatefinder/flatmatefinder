import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-bootstrap-icons';
import { UserData } from '../../api/data/Data';
import DataText from './DataText';

const UserCard = ({ user, userData }) => (
  <Card className="h-100">
    <Card.Header> <img src={user.pfp} alt="pfp" width="75" /></Card.Header>
    <Card.Body>
      <Card.Title>{user.name}</Card.Title>
      <Card.Subtitle>Sex: {user.sex}, Alcohol: {user.alcohol} Sleep: {user.sleep}</Card.Subtitle>
      <Card.Text>
        <ListGroup variant="flush">
          {userData.map((data) => {
            if (data.type !== 'contact') {
              return <DataText key={data._id} data={data} />;
            }
            return '';
          })}
          {userData.map((data) => {
            if (data.type === 'contact') {
              return <DataText key={data._id} data={data} />;
            }
            return '';
          })}
          {/* All this did was make it so that all of their information loads first, and then the contact information. */}
        </ListGroup>
      </Card.Text>
      <Card.Footer>
        <Link to={`/foryou#${user.owner}`}> <ThreeDots /> </Link>
      </Card.Footer>
    </Card.Body>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    pfp: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    alcohol: PropTypes.string,
    alcohol_preferences: PropTypes.string,
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
