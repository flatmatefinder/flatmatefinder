import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { UserData } from '../../api/data/Data';
import { Users } from '../../api/user/User';
import UserCardAux from './UserCardAux';
import LoadingSpinner from './LoadingSpinner';

let user = null;
let data = null;

const UserCard = () => {
  const { ready, users, datas } = useTracker(() => {
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
    const userData = UserData.collection.find({}).fetch();

    return {
      datas: userData,
      users: userItems,
      ready: rdy,
    };
  }, []);
  if (ready) {
    user = _.find(users, () => true);
    data = _.filter(datas, (dat) => dat.owner === user.owner);
    return <UserCardAux user={user} userData={data} />;
  }
  return <LoadingSpinner />;

};

export default UserCard;
