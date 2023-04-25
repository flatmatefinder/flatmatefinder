import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The UsersCollection. It encapsulates state and variable values for users.
 */
class UsersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UsersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      pfp: {
        type: String,
        // eslint-disable-next-line max-len
        defaultValue: 'data:image/png;base64,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',
      }, // Profile pic
      name: {
        type: String,
        defaultValue: 'DEFAULT',
      }, // Don't know why I had this as a number before... Maybe I was insane?
      owner: String, // This is the link between the UserData, Account, and User collections. the field is necessary.
      alcohol: {
        type: Boolean,
        defaultValue: true,
      }, // whether they drink alcohol
      alcohol_preference: {
        type: Boolean,
        defaultValue: false,
      }, // whether they care if anyone else drinks alcohol.
      sleep: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        defaultValue: 2,
      },
      sleep_preference: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        defaultValue: 12,
      },
      sex: {
        type: Number,
        allowedValues: [0, 1, 2], // 0: Male, 1: Female, 3: Other
        defaultValue: 2,
      },
      sex_preference: {
        type: Number,
        allowedValues: [0, 1, 2, 3], // 0: Male, 1: Female, 2: Don't care, 3: Other
        defaultValue: 2,
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
 * @type {UsersCollection}
 */
export const Users = new UsersCollection();
