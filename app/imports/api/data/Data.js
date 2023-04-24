import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The DataCollection. It encapsulates state and variable values for UserData.
 */
class DataCollection {
  constructor() {
    // The name of this collection.
    this.name = 'DataCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      data: String,
      // I don't know why I thought we needed this.
      owner: String, // This is the link between the UserData, Account, and User collections.
      data_type: {
        type: String,
        allowedValues: ['preference', 'dealbreaker', 'contact', 'habit'],
        defaultValue: 'preference',
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
 * The singleton instance of the DataCollection.
 * @type {DataCollection}
 */
export const UserData = new DataCollection();
