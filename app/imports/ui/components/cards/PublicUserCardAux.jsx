import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataText from '../DataText';
import { sleepIntToString } from '../../../utils/Utils';
import SuspendButton from './SuspendButton';

const fallBackSrc = 'https://wallpapers.com/images/featured/en3dnh2zi84sgt3t.jpg';
const PublicUserCardAux = ({ user, userData, admin }) => (

  <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
    <Card.Img onError={(e) => { e.target.src = fallBackSrc; }} src={user.pfp} alt="profile picture" className="mx-auto" id="card-img" />
    <Card.Body key={`Card-Body-${user._id}`}>
      <Card.Title key={`Card-Title-${user._id}`} className="text-center" style={{ color: 'white' }}>{user.name}</Card.Title>
      <Card.Subtitle />
      <ListGroup variant="flush" style={{ height: '100px', overflowY: 'scroll', maxHeight: '100px', overflowX: 'hidden' }}>
        {/* eslint-disable-next-line no-nested-ternary */}
        { (user.sex !== 3) ? <ListGroup.Item key={`Gender-${user._id}`}>Gender: {user.sex === 0 ? 'Male' : user.sex === 1 ? 'Female' : 'Other'}</ListGroup.Item> : ''}
        { (user.alcohol !== 2) ? <ListGroup.Item key={`Alcohol-${user._id}`}>Drinks Alcohol: {user.alcohol === 0 ? ' True' : 'False'}</ListGroup.Item> : ''}
        { (user.sleep !== 24) ? <ListGroup.Item key={`sleep-${user._id}`}>Sleep Time: {sleepIntToString(user.sleep)}</ListGroup.Item> : ''}
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
      </ListGroup>      <Card.Text />
      {[
        admin ? <Link key={`Link-Button-${user._id}`} to={`/profile/${user._id}`} className="btn btn-secondary" role="button" id="button">Edit Profile</Link> : '',
        admin ? <SuspendButton key={`SuspendButton-${user._id}`} publicUser={user} /> : '',
      ]}
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
  userData: PropTypes.arrayOf(() => {
    PropTypes.shape({
      data: PropTypes.string,
      owner: PropTypes.string,
      data_type: PropTypes.string,
    });
  }).isRequired,
  admin: PropTypes.bool.isRequired,
};

export default PublicUserCardAux;
