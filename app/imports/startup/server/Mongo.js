import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';

// Initialize the database with a default data document.
const addContact = (contact) => {
  console.log(`  Adding: ${contact.lastName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contact.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}
