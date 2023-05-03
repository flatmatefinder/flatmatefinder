/* eslint-disable no-undef  */
import { Button } from 'react-bootstrap';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { PublicUsers } from '../../../api/user/PublicUser';
import { Users } from '../../../api/user/User';
import LoadingSpinner from '../LoadingSpinner';

const setFalse = (publicUser, users, e) => {
  e.preventDefault();
  PublicUsers.collection.update(publicUser._id, { $set: { accountsuspended: false } });
  const usr = _.findWhere(users, { owner: publicUser.owner });
  const id = usr._id;
  Users.collection.update(id, { $set: { accountsuspended: false } });
};

const setTrue = (publicUser, users, e) => {
  e.preventDefault();
  PublicUsers.collection.update(publicUser._id, { $set: { accountsuspended: true } });
  const usr = _.findWhere(users, { owner: publicUser.owner });
  const id = usr._id;
  Users.collection.update(id, { $set: { accountsuspended: true } });
};
const SuspendButton = ({ publicUser }) => {

  const { ready, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription = Meteor.subscribe(Users.adminPublicationName);
    const rdy = subscription.ready();
    const userItems = Users.collection.find({}).fetch();

    return {
      users: userItems,
      ready: rdy,
    };
  }, []);

  // eslint-disable-next-line no-nested-ternary
  return ready ? (
    publicUser.accountsuspended ?
      <Button variant="success" onClick={(e) => { setFalse(publicUser, users, e); }}>Unsuspend</Button> :
      <Button variant="danger" onClick={(e) => { setTrue(publicUser, users, e); }}>Suspend</Button>
  ) : <LoadingSpinner />;
};
SuspendButton.propTypes = {
  publicUser: PropTypes.shape({
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
};

export default SuspendButton;
