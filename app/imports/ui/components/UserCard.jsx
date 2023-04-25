import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserData } from '../../api/data/Data';
import { Users } from '../../api/user/User';
import UserCardAux from './UserCardAux';
import LoadingSpinner from './LoadingSpinner';

const UserCard = () => {
  const { ready, user, data } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    const subscriptionData = Meteor.subscribe(UserData.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription.ready();
    const rdy2 = subscriptionData.ready();
    const rdy = rdy1 && rdy2;
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const userItem = _.find(userItems, () => true);
    console.log(userItems);
    const userData = UserData.collection.find({ owner: userItems.owner }).fetch();

    return {
      data: userData,
      user: userItem,
      ready: rdy,
    };
  }, []);

  return ready ? <UserCardAux user={user} userData={data} /> : <LoadingSpinner />;
};

export default UserCard;
