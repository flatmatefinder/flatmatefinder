import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import DataText from '../DataText';
import { sleepIntToString } from '../../../utils/Utils';

const UserCardAux = ({ user, userData }) => (
  <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
    <Card.Img src={user.pfp} alt="profile picture" className="mx-auto circular-portrait card-img" id="card-img" />
    {/* TODO Make this an AdvancedImage with Cloudinary */}
    <Card.Body>
      <Card.Title className="text-center" style={{ color: 'white' }}>{user.name}</Card.Title>
      <Card.Subtitle />
      <ListGroup variant="flush" style={{ height: '100px', overflowY: 'scroll', maxHeight: '100px', overflowX: 'hidden' }}>
        {/* eslint-disable-next-line no-nested-ternary */}
        <ListGroup.Item key={`${user.owner}.gender`}>Sex: {user.sex === 0 ? 'Male' : user.sex === 1 ? 'Female' : 'Other'}</ListGroup.Item>
        <ListGroup.Item key={`${user.owner}.alcohol`}>Alcohol: {user.alcohol ? ' True' : ' False'}</ListGroup.Item>
        <ListGroup.Item key={`${user.owner}.sleep`}> Sleep Time: {sleepIntToString(user.sleep)}</ListGroup.Item>
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
          return undefined;
        })}
        {/* All this did was make it so that all of their information loads first, and then the contact information. */}
      </ListGroup>
      <Card.Text />
      <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a>

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
  userData: PropTypes.arrayOf(() => {
    PropTypes.shape({
      data: PropTypes.string,
      owner: PropTypes.string,
      data_type: PropTypes.string,
    });
  }).isRequired,
};

export default UserCardAux;
