import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The DataCollection. It encapsulates state and variable values for stuff.
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
      contactId: String,
      owner: String,
      type: {
        type: String,
        allowedValues: ['need', 'dealbreaker', 'contact', 'habit'],
        defaultValue: 'need',
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
 * The singleton instance of the NotesCollection.
 * @type {DataCollection}
 */
export const UserData = new DataCollection();
