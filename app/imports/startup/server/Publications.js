import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Users } from '../../api/user/User';
import { UserData } from '../../api/data/Data';
import { Contacts } from '../../api/contact/Contacts';
import { PublicUsers } from '../../api/user/PublicUser';
import { pairTwo } from '../../utils/Utils';

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
Meteor.smartPublish(PublicUsers.userPublicationName, function () {
  if (this.userId) {
    const primaryUser = Meteor.users.find({ _id: this.userId }).fetch()[0];
    const userName = primaryUser.username;
    let publicUserIds = [];
    PublicUsers.collection.find().fetch().forEach((publicUser) => {
      if (publicUser.owner === userName) {
        publicUserIds = [...publicUserIds, publicUser._id];
        return 1;
      }
      if (pairTwo(Users.collection.find({ owner: primaryUser.username }).fetch()[0], Users.collection.find({ owner: publicUser.owner }).fetch()[0])) {
        publicUserIds = [...publicUserIds, publicUser._id];
        return 1;
      }
      return 0;
    });
    return publicUserIds.map((userId) => PublicUsers.collection.find({ _id: userId }));
  }
  return this.ready();
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
