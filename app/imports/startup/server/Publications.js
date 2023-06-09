import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Users } from '../../api/user/User';
import { UserData } from '../../api/data/Data';
import { Contacts } from '../../api/contact/Contacts';
import { PublicUsers } from '../../api/user/PublicUser';
import { pairTwo, reOrderUsers } from '../../utils/Utils';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(UserData.userPublicationName, function () {
  if (this.userId) {
    return UserData.collection.find();
  }
  return this.ready();
});

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});
// TODO: Figure out what to return.
// eslint-disable-next-line consistent-return
Meteor.smartPublish(PublicUsers.userPublicationName, function () {
  if (this.userId) {
    const primaryUser = Meteor.users.find({ _id: this.userId }).fetch()[0];
    const userName = primaryUser.username;
    const primaryUserData = UserData.collection.find({ owner: userName }).fetch()[0];
    let publicUserIds = [];
    PublicUsers.collection.find().fetch().forEach((publicUser) => {
      if (publicUser.owner === userName) {
        publicUserIds = [...publicUserIds, publicUser._id];
        return 1;
      }
      if (pairTwo(Users.collection.find({ owner: primaryUser.username }).fetch()[0], Users.collection.find({ owner: publicUser.owner }).fetch()[0], primaryUserData, UserData.collection.find({ owner: publicUser.owner }).fetch())) {
        publicUserIds = [...publicUserIds, publicUser._id];
        return 1;
      }
      return 0;
    });
    const orderedUsers =
        reOrderUsers(Users.collection.find({ owner: primaryUser.username }).fetch()[0], publicUserIds.map((userId) => Users.collection.find({ owner: PublicUsers.collection.find({ _id: userId }).fetch()[0].owner }).fetch()[0]));

    const orderedUserIds =
        orderedUsers.map(
          (orderedAwesomeAmazingSleepTimeAndSleepPreferenceCyclicalOrderingMethodPublicUser) => PublicUsers.collection.find({ owner: orderedAwesomeAmazingSleepTimeAndSleepPreferenceCyclicalOrderingMethodPublicUser.owner }).fetch()[0]._id,
        );

    orderedUserIds.push((PublicUsers.collection.find({ owner: userName }).fetch()[0]._id));

    return orderedUserIds.map((userId) => PublicUsers.collection.find({ _id: userId }));
  }
  // return this.ready(); "`this.ready` was explicitly removed in smartPublish callback, because it's automatically called after its end" https://github.com/yeputons/meteor-smart-publish/commit/589a4770017c2daeb9b0bbcb2b19a5cf9499ac84
});
// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Users.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Users.collection.find({});
  }
  return this.ready();
});

Meteor.publish(PublicUsers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return PublicUsers.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
