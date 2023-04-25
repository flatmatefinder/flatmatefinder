import React, { useState } from 'react';
import swal from 'sweetalert';
import { Col, Dropdown, Row, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Trash } from 'react-bootstrap-icons';
import { Users } from '../../api/user/User';
import { UserData } from '../../api/data/Data';
import LoadingSpinner from '../components/LoadingSpinner';
import { sleepIntToString } from '../../utils/Utils';
import { PublicUsers } from '../../api/user/PublicUser';

let user = null;
let publicUser = null;
let data = null;
let initial = 0;
let suspended = false;

const Profile = () => {
  const { ready, users, datas, publicUsers } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    const subscriptionData = Meteor.subscribe(UserData.userPublicationName);
    const subscriptionPublicUser = Meteor.subscribe(PublicUsers.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription.ready();
    const rdy2 = subscriptionData.ready();
    const rdy3 = subscriptionPublicUser.ready();
    const rdy = rdy1 && rdy2 && rdy3;
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const publicUserItems = PublicUsers.collection.find({}).fetch();
    const userData = UserData.collection.find({}).fetch();

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
    user = _.find(users, () => true);
    publicUser = _.find(publicUsers, (publicUserItemThing) => publicUserItemThing.owner === user.owner);
    data = _.find(datas, (dat) => dat.owner === user.owner);
    suspended = user.accountsuspended; // check if the user is suspended
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
  const [sleepPref, setSleepPref] = useState(0);

  if (ready) {
    PublicUsers.collection.update(publicUser._id, { $set: { pfp: url } });
    PublicUsers.collection.update(publicUser._id, { $set: { name: name } });
    if (publicUser.alcohol !== 2) {
      PublicUsers.collection.update(publicUser._id, { $set: { alcohol: alcohol ? 0 : 1 } });
    }
    if (publicUser.sleep !== 24) {
      PublicUsers.collection.update(publicUser._id, { $set: { sleep: sleep } });
    }
    if (publicUser.sex !== 3) {
      PublicUsers.collection.update(publicUser._id, { $set: { sex: gender === 'Male' ? 0 : gender === 'Female' ? 1 : 2 } });
      // TODO Fix it
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

  if (ready && initial === 0) {
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
    setSleepPref(user.sleep_preference);
    initial = 1;
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
    const tempPfp = formData.get('pfp'); /* anything with tempPfp is temporary */
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
    if (tempPfp !== '') {
      setUrl(tempName);
      Users.collection.update(user._id, { $set: { pfp: tempPfp } }, (error) => (error ?
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
        if (dealbreakers.length === 10) {
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

  const sleep_0 = (e) => {
    e.preventDefault();
    setSleep(0);
  };
  const sleep_1 = (e) => {
    e.preventDefault();
    setSleep(1);
  };
  const sleep_2 = (e) => {
    e.preventDefault();
    setSleep(2);
  };
  const sleep_3 = (e) => {
    e.preventDefault();
    setSleep(3);
  };
  const sleep_4 = (e) => {
    e.preventDefault();
    setSleep(4);
  };
  const sleep_5 = (e) => {
    e.preventDefault();
    setSleep(5);
  };
  const sleep_6 = (e) => {
    e.preventDefault();
    setSleep(6);
  };
  const sleep_7 = (e) => {
    e.preventDefault();
    setSleep(7);
  };
  const sleep_8 = (e) => {
    e.preventDefault();
    setSleep(8);
  };
  const sleep_9 = (e) => {
    e.preventDefault();
    setSleep(9);
  };
  const sleep_10 = (e) => {
    e.preventDefault();
    setSleep(10);
  };
  const sleep_11 = (e) => {
    e.preventDefault();
    setSleep(11);
  };
  const sleep_12 = (e) => {
    e.preventDefault();
    setSleep(12);
  };
  const sleep_13 = (e) => {
    e.preventDefault();
    setSleep(13);
  };
  const sleep_14 = (e) => {
    e.preventDefault();
    setSleep(14);
  };
  const sleep_15 = (e) => {
    e.preventDefault();
    setSleep(15);
  };
  const sleep_16 = (e) => {
    e.preventDefault();
    setSleep(16);
  };
  const sleep_17 = (e) => {
    e.preventDefault();
    setSleep(17);
  };
  const sleep_18 = (e) => {
    e.preventDefault();
    setSleep(18);
  };
  const sleep_19 = (e) => {
    e.preventDefault();
    setSleep(19);
  };
  const sleep_20 = (e) => {
    e.preventDefault();
    setSleep(20);
  };
  const sleep_21 = (e) => {
    e.preventDefault();
    setSleep(21);
  };
  const sleep_22 = (e) => {
    e.preventDefault();
    setSleep(22);
  };
  const sleep_23 = (e) => {
    e.preventDefault();
    setSleep(23);
  };

  const sleepPref_0 = (e) => {
    e.preventDefault();
    setSleepPref(0);
  };
  const sleepPref_1 = (e) => {
    e.preventDefault();
    setSleepPref(1);
  };
  const sleepPref_2 = (e) => {
    e.preventDefault();
    setSleepPref(2);
  };
  const sleepPref_3 = (e) => {
    e.preventDefault();
    setSleepPref(3);
  };
  const sleepPref_4 = (e) => {
    e.preventDefault();
    setSleepPref(4);
  };
  const sleepPref_5 = (e) => {
    e.preventDefault();
    setSleepPref(5);
  };
  const sleepPref_6 = (e) => {
    e.preventDefault();
    setSleepPref(6);
  };
  const sleepPref_7 = (e) => {
    e.preventDefault();
    setSleepPref(7);
  };
  const sleepPref_8 = (e) => {
    e.preventDefault();
    setSleepPref(8);
  };
  const sleepPref_9 = (e) => {
    e.preventDefault();
    setSleepPref(9);
  };
  const sleepPref_10 = (e) => {
    e.preventDefault();
    setSleepPref(10);
  };
  const sleepPref_11 = (e) => {
    e.preventDefault();
    setSleepPref(11);
  };
  const sleepPref_12 = (e) => {
    e.preventDefault();
    setSleepPref(12);
  };
  const sleepPref_13 = (e) => {
    e.preventDefault();
    setSleepPref(13);
  };
  const sleepPref_14 = (e) => {
    e.preventDefault();
    setSleepPref(14);
  };
  const sleepPref_15 = (e) => {
    e.preventDefault();
    setSleepPref(15);
  };
  const sleepPref_16 = (e) => {
    e.preventDefault();
    setSleepPref(16);
  };
  const sleepPref_17 = (e) => {
    e.preventDefault();
    setSleepPref(17);
  };
  const sleepPref_18 = (e) => {
    e.preventDefault();
    setSleepPref(18);
  };
  const sleepPref_19 = (e) => {
    e.preventDefault();
    setSleepPref(19);
  };
  const sleepPref_20 = (e) => {
    e.preventDefault();
    setSleepPref(20);
  };
  const sleepPref_21 = (e) => {
    e.preventDefault();
    setSleepPref(21);
  };
  const sleepPref_22 = (e) => {
    e.preventDefault();
    setSleepPref(22);
  };
  const sleepPref_23 = (e) => {
    e.preventDefault();
    setSleepPref(23);
  };

  return (ready ? (
    <div id="profile-page" className="px-5">
      <form method="post" onSubmit={handleSubmit}>
        <Row>
          <Col xs="3">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="justify-content-center">
              <p className="">Profile Picture:</p>
              {/* <div style={{ borderRadius: '50%', border: 'darkgray', borderStyle: 'solid', width: '100px', height: '100px', overflow: 'hidden' }}>
                <img
                  alt="Pfp"
                  style={{ cursor: 'pointer', display: 'inline', margin: '0 auto', height: '100%' }}
                  src={url || 'https://cdn.icon-icons.com/icons2/2645/PNG/512/person_circle_icon_159926.png'}
                /> <br />
              </div>
              {/* <Button variant="danger" onClick={(e) => pfpGetter(e)} style={{ display: 'none' }}> </Button> */}
              <input name="pfp" placeholder="Link to Image" type="text" />
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
              <input name="social" placeholder="9702868161, discord: Opal#0000" type="text" />
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
                    <Dropdown
                      name="sleep"
                      defaultValue={['12:00AM']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {sleepIntToString(sleep)} </Dropdown.Toggle>
                      <Dropdown.Menu style={{ height: '200px', overflowY: 'scroll', maxHeight: '400px', overflowX: 'hidden' }}>
                        <Dropdown.Item as="button" onClick={sleep_0}>12:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_1}>1:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_2}>2:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_3}>3:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_4}>4:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_5}>5:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_6}>6:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_7}>7:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_8}>8:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_9}>9:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_10}>10:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_11}>11:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_12}>12:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_13}>1:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_14}>2:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_15}>3:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_16}>4:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_17}>5:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_18}>6:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_19}>7:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_20}>8:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_21}>9:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_22}>10:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleep_23}>11:00PM</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    What time do you want your roommate to go to sleep (at the latest)?
                    <Dropdown
                      name="sleep_preference"
                      defaultValue={['12:00AM']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {sleepIntToString(sleepPref)} </Dropdown.Toggle>
                      <Dropdown.Menu style={{ height: '200px', overflowY: 'scroll', maxHeight: '400px', overflowX: 'hidden' }}>
                        <Dropdown.Item as="button" onClick={sleepPref_0}>12:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_1}>1:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_2}>2:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_3}>3:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_4}>4:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_5}>5:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_6}>6:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_7}>7:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_8}>8:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_9}>9:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_10}>10:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_11}>11:00AM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_12}>12:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_13}>1:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_14}>2:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_15}>3:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_16}>4:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_17}>5:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_18}>6:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_19}>7:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_20}>8:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_21}>9:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_22}>10:00PM</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={sleepPref_23}>11:00PM</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
