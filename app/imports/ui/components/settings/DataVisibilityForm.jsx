import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../../api/user/User';
import { PublicUsers } from '../../../api/user/PublicUser';
import LoadingSpinner from '../LoadingSpinner';

let user = null;
let publicUser = null;
let initial = 0;
const DataVisibilityForm = () => {
  const { ready, users, publicUsers } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    const subscriptionPublicUser = Meteor.subscribe(PublicUsers.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription.ready();
    const rdy2 = subscriptionPublicUser.ready();
    const rdy = rdy1 && rdy2;
    const userItems = Users.collection.find({}).fetch();
    const publicUserItems = PublicUsers.collection.find({}).fetch();

    return {
      publicUsers: publicUserItems,
      users: userItems,
      ready: rdy,
    };
  }, []);
  // TODO Whatever the hell that weird bug was, must fix
  const [shareAlcohol, setShareAlcohol] = useState(true);
  const [shareSleep, setShareSleep] = useState(true);
  const [shareSex, setShareSex] = useState(true);
  const [sharePreferences, setSharePreferences] = useState(false);
  const [shareHabits, setShareHabits] = useState(false);
  const [shareDealbreakers, setShareDealbreakers] = useState(false);
  const [shareSocials, setShareSocials] = useState(false);

  if (ready && initial === 0) {
    // The following is ran by Underscore package
    // eslint-disable-next-line no-undef
    user = _.find(users, () => true);
    // The following is ran by Underscore package
    // eslint-disable-next-line no-undef
    publicUser = _.find(publicUsers, (publicUserItem) => publicUserItem.owner === user.owner);

    setShareAlcohol(publicUser.alcohol !== 2);
    setShareSleep(publicUser.sleep !== 24);
    setShareSex(publicUser.sex !== 3);
    setSharePreferences(publicUser.share_preferences !== 1);
    setShareHabits(publicUser.share_habits !== 1);
    setShareDealbreakers(publicUser.share_dealbreakers !== 1);
    setShareSocials(publicUser.share_contacts !== 1);
    initial = 1;
  }

  const ShareAlcohol = (checked) => {
    if (checked) {
      PublicUsers.collection.update(publicUser._id, { $set: { alcohol: user.alcohol === true ? 0 : 1 } });
    } else {
      PublicUsers.collection.update(publicUser._id, { $set: { alcohol: 2 } });
    }
    setShareAlcohol(checked);
  };
  const ShareSleep = (checked) => {
    if (checked) {
      PublicUsers.collection.update(publicUser._id, { $set: { sleep: user.sleep } });
    } else {
      PublicUsers.collection.update(publicUser._id, { $set: { sleep: 24 } });
    }
    setShareSleep(checked);
  };
  const ShareSex = (checked) => {
    if (checked) {
      PublicUsers.collection.update(publicUser._id, { $set: { sex: user.sex } });
    } else {
      PublicUsers.collection.update(publicUser._id, { $set: { sex: 3 } });
    }
    setShareSex(checked);
  };
  const SharePreferences = (checked) => {
    PublicUsers.collection.update(publicUser._id, { $set: { share_preferences: checked ? 0 : 1 } });
    setSharePreferences(checked);
  };
  const ShareHabits = (checked) => {
    PublicUsers.collection.update(publicUser._id, { $set: { share_habits: checked ? 0 : 1 } });
    setShareHabits(checked);
  };
  const ShareDealbreakers = (checked) => {
    PublicUsers.collection.update(publicUser._id, { $set: { share_dealbreakers: checked ? 0 : 1 } });
    setShareDealbreakers(checked);
  };
  const ShareSocials = (checked) => {
    PublicUsers.collection.update(publicUser._id, { $set: { share_contacts: checked ? 0 : 1 } });
    setShareSocials(checked);
  };

  return ready ? (
    <div className="data-visibility-form">
      <h2>Data Visibility</h2>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            id="c1"
            type="checkbox"
            label="Share whether you drink alcohol"
            checked={shareAlcohol}
            onChange={(e) => ShareAlcohol(e.target.checked)}
          />
          <Form.Check
            id="c2"
            type="checkbox"
            label="Share Sleep Hours"
            checked={shareSleep}
            onChange={(e) => ShareSleep(e.target.checked)}
          />
          <Form.Check
            id="c3"
            type="checkbox"
            label="Share gender"
            checked={shareSex}
            onChange={(e) => ShareSex(e.target.checked)}
          />
          <Form.Check
            id="c4"
            type="checkbox"
            label="Share extra preferences"
            checked={sharePreferences}
            onChange={(e) => SharePreferences(e.target.checked)}
          />
          <Form.Check
            id="c5"
            type="checkbox"
            label="Share relevant habits"
            checked={shareHabits}
            onChange={(e) => ShareHabits(e.target.checked)}
          />
          <Form.Check
            id="c6"
            type="checkbox"
            label="Share Deal Breakers"
            checked={shareDealbreakers}
            onChange={(e) => ShareDealbreakers(e.target.checked)}
          />
          <Form.Check
            id="c7"
            type="checkbox"
            label="Share contact methods (other than email)"
            checked={shareSocials}
            onChange={(e) => ShareSocials(e.target.checked)}
          />
        </Form.Group>
      </Form>
    </div>
  ) : (<LoadingSpinner />);
};

export default DataVisibilityForm;
