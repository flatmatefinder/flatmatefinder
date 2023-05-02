/* eslint-disable no-undef  */
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Col, Dropdown, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Trash } from 'react-bootstrap-icons';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router';
import { Users } from '../../api/user/User';
import { UserData } from '../../api/data/Data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PublicUsers } from '../../api/user/PublicUser';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';

let user = null;
let publicUser = null;
let data = null;
let suspended = false;

const Profile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();

  const { ready, users, datas, publicUsers } = useTracker(() => {
    let rdy = null;
    let userItems = null;
    let publicUserItems = null;
    let userData = null;
    let subscriptionData = null;
    if (_id === undefined) {
      console.log(_id);
      const subscription = Meteor.subscribe(Users.userPublicationName);
      subscriptionData = Meteor.subscribe(UserData.userPublicationName);
      const subscriptionPublicUser = Meteor.subscribe(PublicUsers.userPublicationName);
      // Determine if the subscription is ready
      const rdy1 = subscription.ready();
      const rdy2 = subscriptionData.ready();
      const rdy3 = subscriptionPublicUser.ready();
      rdy = rdy1 && rdy2 && rdy3;
      userItems = Users.collection.find({}).fetch();
      publicUserItems = PublicUsers.collection.find({}).fetch();
      userData = UserData.collection.find({}).fetch();
    } else {
      const subscription = Meteor.subscribe(Users.adminPublicationName);
      subscriptionData = Meteor.subscribe(UserData.userPublicationName);
      const subscriptionPublicUser = Meteor.subscribe(PublicUsers.userPublicationName);
      // Determine if the subscription is ready
      const rdy1 = subscription.ready();
      const rdy2 = subscriptionData.ready();
      const rdy3 = subscriptionPublicUser.ready();
      rdy = rdy1 && rdy2 && rdy3;
      userItems = Users.collection.find({}).fetch();
      publicUserItems = PublicUsers.collection.find({}).fetch();
      userData = UserData.collection.find({ _id: _id }).fetch();
    }

    return {
      datas: userData,
      users: userItems,
      ready: rdy,
      publicUsers: publicUserItems,
    };
  }, []);
  // const pfpGetter = (e) => {
  //   e.preventDefault();
  //   const cloudinary = require('cloudinary').v2;
  //   cloudinary.uploader
  //     .upload(`${user.name}_pfp.jpg`)
  //     .then(result => console.log(result));
  // };

  if (ready) {
    if (_id === undefined) {
      user = _.find(users, () => true);
      publicUser = _.find(publicUsers, (publicUserItemThing) => publicUserItemThing.owner === user.owner);
      data = _.filter(datas, (dat) => dat.owner === user.owner);
      suspended = user.accountsuspended; // check if the user is suspended
    } else {
      publicUser = publicUsers[0];
      user = _.find(users, (usr) => usr.owner === publicUser.owner);
      data = _.filter(datas, (dat) => dat.owner === publicUser.owner);
      suspended = user.accountsuspended;
    }
  }

  const getPreferences = () => {
    const list = _.filter(data, (userData) => userData.data_type === 'preference');
    const list2 = list.map(dat => dat.data);
    return list2;
  };
  const getDealbreakers = () => {
    const list = _.filter(data, (userData) => userData.data_type === 'dealbreaker').map(dat => dat.data);
    return list;
  };
  const getSocials = () => {
    const list = _.filter(data, (userData) => userData.data_type === 'contact').map(dat => dat.data);
    return list;
  };
  const getHabits = () => {
    const list = _.filter(data, (userData) => userData.data_type === 'habit').map(dat => dat.data);
    return list;
  };

  const [preferences, setPreferences] = useState([]);
  const [dealbreakers, setDealbreakers] = useState([]);
  const [socials, setSocials] = useState([]);
  const [habits, setHabits] = useState([]);
  const [alcohol, setAlcohol] = useState('False');
  const [alcoholPref, setAlcoholPref] = useState('False');
  const [url, setUrl] = useState('DEFAULT');
  const [name, setName] = useState('DEFAULT');
  const [gender, setGender] = useState('Other');
  const [genderPref, setGenderPref] = useState('No Preference');
  const [sleep, setSleep] = useState(0);
  const [value, setValue] = React.useState(null);
  const [sleepPref, setSleepPref] = useState(0);
  const [valuePref, setValuePref] = React.useState(null);
  const [isInitialized, setIsInitialized] = useState(0);

  if (ready) { // any time the state of these "useState" variables are changed, the code in here will be called.
    PublicUsers.collection.update(publicUser._id, { $set: { pfp: url } });
    PublicUsers.collection.update(publicUser._id, { $set: { name: name } });
    if (publicUser.alcohol !== 2) {
      PublicUsers.collection.update(publicUser._id, { $set: { alcohol: alcohol ? 0 : 1 } });
    }
    if (publicUser.sleep !== 24) {
      PublicUsers.collection.update(publicUser._id, { $set: { sleep: sleep } });
    }
    if (publicUser.sex !== 3) {
      // eslint-disable-next-line no-nested-ternary
      PublicUsers.collection.update(publicUser._id, { $set: { sex: gender === 'Male' ? 0 : gender === 'Female' ? 1 : 2 } });
      // TODO Fix nested ternary
    }
  }
  const genderBender = (genderNum) => {
    switch (genderNum) {
    case 0: return 'Male';
    case 1: return 'Female';
    case 2: return 'Other';
    default: return 'Not Applicable';
    }
  };

  const genderPreferenceBender = (genderNum) => {
    switch (genderNum) {
    case 0: return 'Male';
    case 1: return 'Female';
    case 2: return 'Don\'t Care';
    case 3: return 'Other';
    default: return 'Not Applicable';
    }
  };

  if (ready && isInitialized === 0) {
    setPreferences(getPreferences());
    setDealbreakers(getDealbreakers());
    setSocials(getSocials());
    setHabits(getHabits());
    setAlcohol(user.alcohol);
    setAlcoholPref(user.alcohol_preference);
    setUrl(user.pfp);
    setName(user.name);
    setGender(genderBender(user.sex));
    setGenderPref(genderPreferenceBender(user.sex_preference));
    setSleep(user.sleep);
    const date = new Date();
    date.setHours(user.sleep, 0, 0, 0);
    setValue(date);
    setSleepPref(user.sleep_preference);
    const datePref = new Date();
    datePref.setHours(user.sleep_preference, 0, 0, 0);
    setValuePref(datePref);
    setIsInitialized(1);
  }

  const update_sleep = () => {
    Users.collection.update(user._id, { $set: { sleep: sleep } }, (error) => (error ?
      console.log(error.message) : ''));
  };
  const update_sleepPref = () => {
    Users.collection.update(user._id, { $set: { sleep_preference: sleepPref } }, (error) => (error ?
      console.log(error.message) : ''));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const tempName = formData.get('name');
    // const tempPfp = formData.get('pfp'); /* anything with tempPfp is temporary */
    const tempPreference = formData.get('preference');
    const tempHabit = formData.get('habit');
    const tempDealbreaker = formData.get('dealbreaker');
    const tempSocial = formData.get('social');

    update_sleep();
    update_sleepPref();
    Users.collection.update(user._id, { $set: { pfp: url } }, (error) => (error ?
      console.log(error.message) : ''));

    if (tempName !== '') {
      setName(tempName);
      Users.collection.update(user._id, { $set: { name: tempName } }, (error) => (error ?
        console.log(error.message) : ''));
    }
    if (tempPreference !== '') {
      if (_.find(preferences, preference => preference === tempPreference) === undefined) {
        if (preferences.length === 10) {
          swal('Error', 'Too many Preferences!', 'error').then();
        } else {
          setPreferences([...preferences, tempPreference]);
          UserData.collection.insert({ data: tempPreference, owner: user.owner, data_type: 'preference' });
        }
      }
    }
    if (tempHabit !== '') {
      if (_.find(habits, habit => habit === tempHabit) === undefined) {
        if (habits.length >= 10) {
          swal('Error', 'Too many Habits!', 'error').then();
        } else {
          setHabits([...habits, tempHabit]);
          UserData.collection.insert({ data: tempHabit, owner: user.owner, data_type: 'habit' });
        }
      }
    }
    if (tempDealbreaker !== '') {
      if (_.find(dealbreakers, dealbreaker => dealbreaker === tempDealbreaker) === undefined) {
        if (dealbreakers.length === 10) {
          swal('Error', 'Too many Dealbreakers!', 'error').then();
        } else {
          setDealbreakers([...dealbreakers, tempDealbreaker]);
          UserData.collection.insert({ data: tempDealbreaker, owner: user.owner, data_type: 'dealbreaker' });
        }
      }
    }
    if (tempSocial !== '') {
      if (_.find(socials, social => social === tempSocial) === undefined) {
        if (socials.length === 10) {
          swal('Error', 'Too many Contact Methods!', 'error').then();
        } else {
          setSocials([...socials, tempSocial]);
          UserData.collection.insert({ data: tempSocial, owner: user.owner, data_type: 'contact' });
        }
      }
    }
    swal('Success', 'Your Account has Successfully been Updated.', 'success').then();
  }

  const alcohol_yes = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { alcohol: true } }, (error) => (error ?
      console.log(error.message) : ''));
    setAlcohol('true');
  };
  const alcohol_no = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { alcohol: false } }, (error) => (error ?
      console.log(error.message) : ''));
    setAlcohol('false');
  };

  const alcoholPref_yes = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { alcohol_preference: true } }, (error) => (error ?
      console.log(error.message) : ''));
    setAlcoholPref('true');
  };
  const alcoholPref_no = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { alcohol_preference: false } }, (error) => (error ?
      console.log(error.message) : ''));
    setAlcoholPref('false');
  };

  const gender_male = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex: 0 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGender('Male');
  };
  const gender_female = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex: 1 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGender('Female');
  };
  const gender_other = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex: 2 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGender('Other');
  };

  const genderPref_male = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex_preference: 0 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGenderPref('Male');
  };
  const genderPref_female = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex_preference: 1 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGenderPref('Female');
  };
  const genderPref_noPreference = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex_preference: 2 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGenderPref('No Preference');
  };
  const genderPref_other = (e) => {
    e.preventDefault();
    Users.collection.update(user._id, { $set: { sex_preference: 3 } }, (error) => (error ?
      console.log(error.message) : ''));
    setGenderPref('Other');
  };

  return (ready && isInitialized ? (
    <div id="profile-page" className="px-5">
      <form method="post" onSubmit={handleSubmit}>
        <Row>
          <Col xs="3">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="justify-content-center">
              <p className="">Profile Picture:</p>
              <CloudinaryUploadWidget
                url={url}
                setUrl={(val) => {
                  setUrl(val);
                  Users.collection.update(user._id, { $set: { pfp: val } }, (error) => (error ?
                    console.log(error.message) : ''));
                }}
              />
              <p style={{ color: 'gray' }}>Images should be ~ 200px x 200px to work properly.</p>
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              What is your name? <br />
              <input name="name" placeholder={name || 'John Doe'} type="text" />
            </label>
            <br /><br />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              What are your Contact Methods? <br />
              <input name="social" placeholder="Opal#42069" type="text" />
              <p style={{ color: 'gray' }}> Press submit after every entry. it can be multiple words, should have all information needed to contact you. </p>
            </label>
            <p> Linked Contact Methods: </p>
            <ul>
              {socials.map(social => (
                <li key={`list-item-${social}`}> {social}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    variant="danger"
                    onClick={
                      () => {
                        const i = socials.indexOf(social);
                        let tempSocials = [];
                        for (let j = 0; j < socials.length; j++) {
                          if (j !== i) {
                            tempSocials = [...tempSocials, socials[j]];
                          }
                        }
                        setSocials(tempSocials);
                        const dataObjects = _.filter(data, (userData) => {
                          if (userData.data_type === 'contact' && userData.data === social) return true;
                          return false;
                        });
                        const dataObject = _.find(dataObjects, () => true);
                        const dataID = dataObject._id;
                        UserData.collection.remove({ _id: dataID });
                      }
                    }
                  ><Trash />
                  </Button>
                </li>
              ))}
            </ul>
            <br />
          </Col>
          <Col>
            <div style={{ borderRight: 'white', borderBottom: 'white', borderTop: 'white', borderLeft: 'gray', borderStyle: 'solid' }} className="px-5 ">
              <Row>
                <Col xs={3}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    Any extra preferences? <br />
                    <input name="preference" placeholder="clean" type="text" />
                    <p style={{ color: 'gray' }}> Press submit after every entry. I want someone who is...</p>
                  </label>
                  <p> Existing Preferences: </p>
                  <ul>
                    {preferences.map(preference => (
                      <li key={`list-item-${preference}`}> {preference}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                          variant="danger"
                          onClick={
                            () => {
                              const i = preferences.indexOf(preference);
                              let tempPreferences = [];
                              for (let j = 0; j < preferences.length; j++) {
                                if (j !== i) {
                                  tempPreferences = [...tempPreferences, preferences[j]];
                                }
                              }
                              setPreferences(tempPreferences);

                              const dataObjects = _.filter(data, (userData) => {
                                if (userData.data_type === 'preference' && userData.data === preference) return true;
                                return false;
                              });
                              const dataObject = _.find(dataObjects, () => true);
                              const dataID = dataObject._id;
                              UserData.collection.remove({ _id: dataID });
                            }
                          }
                        ><Trash />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <br />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    Any deal breakers? <br />
                    <input name="dealbreaker" placeholder="dirty" type="text" />
                    <p style={{ color: 'gray' }}> Press submit after every preference. It should answer the question of: I don&apos;t want someone who is... </p>
                  </label>
                  <p> Existing Dealbreakers: </p>
                  <ul>
                    {dealbreakers.map(dealbreaker => (
                      <li key={`list-item-${dealbreaker}`}> {dealbreaker}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                          variant="danger"
                          onClick={
                            () => {
                              const i = dealbreakers.indexOf(dealbreaker);
                              let tempDealbreakers = [];
                              for (let j = 0; j < dealbreakers.length; j++) {
                                if (j !== i) {
                                  tempDealbreakers = [...tempDealbreakers, dealbreakers[j]];
                                }
                              }
                              setDealbreakers(tempDealbreakers);

                              const dataObjects = _.filter(data, (userData) => {
                                if (userData.data_type === 'dealbreaker' && userData.data === dealbreaker) return true;
                                return false;
                              });
                              const dataObject = _.find(dataObjects, () => true);
                              const dataID = dataObject._id;
                              UserData.collection.remove({ _id: dataID });
                            }
                          }
                        ><Trash />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <br />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    Any extra information about yourself? <br />
                    <input name="habit" placeholder="gamer" type="text" />
                    <p style={{ color: 'gray' }}> Press submit after every habit. It should answer the question of: I am ... OR I am a ... </p>
                  </label>
                  <p> Existing Habits: </p>
                  <ul>
                    {habits.map(habit => (
                      <li key={`list-item-${habit}`}> {habit}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                          variant="danger"
                          onClick={
                            () => {
                              const i = habits.indexOf(habit);
                              let tempHabits = [];
                              for (let j = 0; j < habits.length; j++) {
                                if (j !== i) {
                                  tempHabits = [...tempHabits, habits[j]];
                                }
                              }
                              setSocials(tempHabits);

                              const dataObjects = _.filter(data, (userData) => {
                                if (userData.data_type === 'habit' && userData.data === habit) return true;
                                return false;
                              });
                              const dataObject = _.find(dataObjects, () => true);
                              const dataID = dataObject._id;
                              UserData.collection.remove({ _id: dataID });
                            }
                          }
                        ><Trash />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <br />
                </Col>
                <Col xs={4}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    Do you drink alcohol?
                    <Dropdown
                      name="alcohol"
                      defaultValue={['true']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {alcohol === 'true' || alcohol === true ? 'Yes' : 'No'} </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={alcohol_yes}>Yes</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={alcohol_no}>No</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    Do you care if others drink alcohol?
                    <Dropdown
                      name="alcohol_preference"
                      defaultValue={['true']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {alcoholPref === 'true' || alcoholPref === true ? 'Yes' : 'No'} </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={alcoholPref_yes}>Yes</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={alcoholPref_no}>No</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    What is your gender?
                    <Dropdown
                      name="gender"
                      defaultValue={['Other']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {gender} </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={gender_male}>Male</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={gender_female}>Female</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={gender_other}>Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    What is your gender preference?
                    <Dropdown
                      name="gender_preference"
                      defaultValue={['Other']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {genderPref} </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={genderPref_male}>Male</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={genderPref_female}>Female</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={genderPref_noPreference}>No Preference</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={genderPref_other}>Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    What time do you go to sleep?
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {/* TODO https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md */}
                      { /* eslint-disable react/jsx-props-no-spreading */ }
                      <StaticTimePicker
                        label="Sleep Time"
                        views={['hours']}
                        value={value}
                        onChange={(newValue) => { setValue(newValue); setSleep(newValue.getHours()); }}
                        renderInput={(parameters) => <TextField {...parameters} />}
                      />
                    </LocalizationProvider>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    What time do you want your roommate to go to sleep (at the latest)?
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {/* TODO https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md */}
                      { /* eslint-disable react/jsx-props-no-spreading */ }
                      <StaticTimePicker
                        label="Sleep Time"
                        views={['hours']}
                        value={valuePref}
                        onChange={(newValue) => { setValuePref(newValue); setSleepPref(newValue.getHours()); }}
                        renderInput={(parameters) => <TextField {...parameters} />}
                      />
                    </LocalizationProvider>
                  </label>
                </Col>
              </Row>
              <hr />
              <Button disabled={suspended} variant={suspended ? 'danger' : 'success'} type="submit">Submit</Button>
            </div>
          </Col>
        </Row>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      </form>
    </div>
  ) : <LoadingSpinner />);
};

export default Profile;
