import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Users } from '../../api/user/User';
import { PublicUsers } from '../../api/user/PublicUser';

/* eslint-disable no-console */

const createUser = (email, username, password, role) => {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: username,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, username, password, role }) => createUser(email, username, password, role));

  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
  if (Meteor.settings.defaultUsers) {
    Meteor.settings.defaultUsers.forEach(
      ({ owner, pfp, name, alcohol, alcohol_preference, sleep, sleep_preference, sex, sex_preference, accountsuspended }) => Users.collection.insert({
        owner: owner,
        pfp: pfp,
        name: name,
        alcohol: alcohol,
        alcohol_preference: alcohol_preference,
        sleep: sleep,
        sleep_preference: sleep_preference,
        sex: sex,
        sex_preference: sex_preference,
        accountsuspended: accountsuspended,
      }),
    );
    Meteor.settings.defaultUsers.forEach(({ owner, pfp, name, alcohol, sleep, sex }) => PublicUsers.collection.insert({
      owner: owner,
      pfp: pfp,
      name: name,
      alcohol: alcohol ? 0 : 1,
      sleep: sleep,
      sex: sex,
      share_preferences: 0, // Feeling quirky, so 0 = true, and 1 = false.
      share_contacts: 0,
      share_habits: 0,
      share_dealbreakers: 0,
    }));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
