import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The PublicUsersCollection. It encapsulates state and variable values for users.
 */
class PublicUsersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PublicUsersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      pfp: {
        type: String,
        defaultValue: '',
      }, // Profile pic
      name: {
        type: String,
        defaultValue: '',
      }, // Don't know why I had this as a number before... Maybe I was insane?
      owner: String, // This is the link between the UserData, Account, and User collections. the field is necessary.
      alcohol: {
        type: Number,
        allowedValues: [0, 1, 2], /* 0: Yes, 1: No, 2: Not Shared */
        defaultValue: 2,
      }, // whether they drink alcohol
      sleep: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        defaultValue: 24,
      },
      sex: {
        type: Number,
        allowedValues: [0, 1, 2, 3], // 0: Male, 1: Female, 2: Other, 3: choose not to share
        defaultValue: 3,
      },
      share_preferences: {
        type: Number,
        allowedValues: [0, 1], // 0: share, 1: don't share
        defaultValue: 1,
      },
      share_habits: {
        type: Number,
        allowedValues: [0, 1], // 0: share, 1: don't share
        defaultValue: 1,
      },
      share_dealbreakers: {
        type: Number,
        allowedValues: [0, 1], // 0: share, 1: don't share
        defaultValue: 1,
      },
      share_contacts: {
        type: Number,
        allowedValues: [0, 1], // 0: share, 1: don't share
        defaultValue: 1,
      },
      accountsuspended: {
        type: Boolean,
        defaultValue: false,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the UsersCollection.
 * @type {PublicUsersCollection}
 */
export const PublicUsers = new PublicUsersCollection();
