import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserData } from '../../../api/data/Data';
import LoadingSpinner from '../LoadingSpinner';
import { PublicUsers } from '../../../api/user/PublicUser';
import PublicUserCardAux from './PublicUserCardAux';

const AdminUserCard = ({ username }) => {
  const { ready, user, data } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription = Meteor.subscribe(PublicUsers.userPublicationName);
    const subscriptionData = Meteor.subscribe(UserData.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription.ready();
    const rdy2 = subscriptionData.ready();
    const rdy = rdy1 && rdy2;
    const userItems = PublicUsers.collection.find({ owner: username }).fetch();
    // The following is run by Underscore package
    // eslint-disable-next-line no-undef
    const userItem = _.find(userItems, () => true);
    const userData = UserData.collection.find({ owner: username }).fetch();

    return {
      data: userData,
      user: userItem,
      ready: rdy,
    };
  }, []);

  return ready ? <PublicUserCardAux user={user} userData={data} admin /> : <LoadingSpinner />;
};

AdminUserCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default AdminUserCard;
