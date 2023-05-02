import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonCircle } from 'react-bootstrap-icons';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/MapStuff.jsx. */
let user;
const ProfilePicture = ({ userName }) => {
  const { ready, users } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();

    return {
      users: userItems,
      ready: rdy,
    };
  }, []);

  if (ready) {
    // eslint-disable-next-line no-undef
    user = _.find(users, () => true);
    return userName === '' ? (/** If the user doesn't exist */
      <PersonCircle size={60} /> /** Then just display a PersonCircle Icon */
    ) : (
      <div style={{ borderRadius: '50%', border: 'darkgray', borderStyle: 'solid', width: '60px', height: '60px', overflow: 'hidden' }}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img
          alt="Pfp"
          style={{ cursor: 'pointer', display: 'inline', height: '100%' }}
          src={user.pfp}
          onError={(e) => { e.target.src = 'https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-73370.jpg'; }}
        />
      </div> // TODO Make this an AdvancedImage with Cloudinary
    );
  }
  return <PersonCircle size={50} />;
};

// Require a document to be passed to this component.
ProfilePicture.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default ProfilePicture;
