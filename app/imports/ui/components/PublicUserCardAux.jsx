import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { UserData } from '../../api/data/Data';
import { Users } from '../../api/user/User';
import { PublicUsers } from '../../api/user/PublicUser';
import DataText from './DataText';
import { sleepIntToString } from '../../utils/Utils';

const fallBackSrc = 'https://wallpapers.com/images/featured/en3dnh2zi84sgt3t.jpg';
const PublicUserCardAux = ({ user, userData, admin }) => (

  <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
    <Card.Img onError={(e) => { e.target.src = fallBackSrc; }} src={user.pfp} alt="profile picture" className="mx-auto" id="card-img" />
    <Card.Body>
      <Card.Title className="text-center" style={{ color: 'white' }}>{user.name}</Card.Title>
      <Card.Subtitle />
      <ListGroup variant="flush" style={{ height: '100px', overflowY: 'scroll', maxHeight: '100px', overflowX: 'hidden' }}>
        {/* eslint-disable-next-line no-nested-ternary */}
        { (user.sex !== 3) ? <ListGroup.Item>Gender: {user.sex === 0 ? 'Male' : user.sex === 1 ? 'Female' : 'Other'}</ListGroup.Item> : ''}
        { (user.alcohol !== 2) ? <ListGroup.Item>Drinks Alcohol: {user.alcohol ? ' True' : ' False'}</ListGroup.Item> : ''}
        { (user.sleep !== 24) ? <ListGroup.Item>Sleep Time: {sleepIntToString(user.sleep)}</ListGroup.Item> : ''}
        { userData.map((data) => {
          if (data.data_type === 'preference' && user.share_preferences === 0) {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        { userData.map((data) => {
          if (data.data_type === 'habit' && user.share_habits === 0) {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        { userData.map((data) => {
          if (data.data_type === 'dealbreaker' && user.share_dealbreakers === 0) {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        { userData.map((data) => {
          if (data.data_type === 'contact' && user.share_contacts === 0) {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        {/* All this did was make it so that all of their information loads first, and then the contact information. */}
      </ListGroup>
      <Card.Text />
      {
        admin ? <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a> : ''
      }
      {
        // eslint-disable-next-line max-len
        user.accountsuspended ? <Button variant="success" onClick={(e) => { e.preventDefault(); PublicUsers.collection.update(user._id, { $set: { accountsuspended: false } }, (error) => (error ? console.log(error.message) : 'NO ERROR')); }}>Unsuspend</Button> : <Button variant="danger" onClick={(e) => { e.preventDefault(); PublicUsers.collection.update(user._id, { $set: { accountsuspended: true } }, (error) => (error ? console.log(error.message) : 'NO ERROR')); }}>Suspend</Button>
      }
    </Card.Body>
  </Card>
);

PublicUserCardAux.propTypes = {
  user: PropTypes.shape({
    pfp: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    alcohol: PropTypes.number,
    sleep: PropTypes.number,
    sex: PropTypes.number,
    share_preferences: PropTypes.number,
    share_habits: PropTypes.number,
    share_dealbreakers: PropTypes.number,
    share_contacts: PropTypes.number,
    accountsuspended: PropTypes.bool,
    _id: PropTypes.string,
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
  admin: PropTypes.bool.isRequired,
};

export default PublicUserCardAux;
