import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The UsersCollection. It encapsulates state and variable values for stuff.
 */
class UsersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UsersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      pfp: String, // Profile pic
      name: Number,
      owner: String, // This string will link their "User" Collection to their "Account" collection.
      alcohol: Boolean, // whether they drink alcohol
      alcohol_preference: Boolean, // whether they care if anyone else drinks alcohol.
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
        allowedValues: [0, 1, 2],
        defaultValue: 2,
      },
      sex_preference: {
        type: Number,
        allowedValues: [0, 1, 2, 3],
        defaultValue: 2,
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
 * The singleton instance of the StuffsCollection.
 * @type {UsersCollection}
 */
export const Users = new UsersCollection();
