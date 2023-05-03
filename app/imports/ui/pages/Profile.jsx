/* eslint-disable no-undef  */
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
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
      publicUserItems = PublicUsers.collection.find({ _id: _id }).fetch();
      userData = UserData.collection.find({}).fetch();
    }

    return {
      datas: userData,
      users: userItems,
      ready: rdy,
      publicUsers: publicUserItems,
    };
  }, []);

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
    return list.map(dat => dat.data);
  };
  const getDealbreakers = () => _.filter(data, (userData) => userData.data_type === 'dealbreaker').map(dat => dat.data);
  const getSocials = () => _.filter(data, (userData) => userData.data_type === 'contact').map(dat => dat.data);
  const getHabits = () => _.filter(data, (userData) => userData.data_type === 'habit').map(dat => dat.data);

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

  // const sleep_0 = (e) => {
  //   e.preventDefault();
  //   setSleep(0);
  // };
  // const sleep_1 = (e) => {
  //   e.preventDefault();
  //   setSleep(1);
  // };
  // const sleep_2 = (e) => {
  //   e.preventDefault();
  //   setSleep(2);
  // };
  // const sleep_3 = (e) => {
  //   e.preventDefault();
  //   setSleep(3);
  // };
  // const sleep_4 = (e) => {
  //   e.preventDefault();
  //   setSleep(4);
  // };
  // const sleep_5 = (e) => {
  //   e.preventDefault();
  //   setSleep(5);
  // };
  // const sleep_6 = (e) => {
  //   e.preventDefault();
  //   setSleep(6);
  // };
  // const sleep_7 = (e) => {
  //   e.preventDefault();
  //   setSleep(7);
  // };
  // const sleep_8 = (e) => {
  //   e.preventDefault();
  //   setSleep(8);
  // };
  // const sleep_9 = (e) => {
  //   e.preventDefault();
  //   setSleep(9);
  // };
  // const sleep_10 = (e) => {
  //   e.preventDefault();
  //   setSleep(10);
  // };
  // const sleep_11 = (e) => {
  //   e.preventDefault();
  //   setSleep(11);
  // };
  // const sleep_12 = (e) => {
  //   e.preventDefault();
  //   setSleep(12);
  // };
  // const sleep_13 = (e) => {
  //   e.preventDefault();
  //   setSleep(13);
  // };
  // const sleep_14 = (e) => {
  //   e.preventDefault();
  //   setSleep(14);
  // };
  // const sleep_15 = (e) => {
  //   e.preventDefault();
  //   setSleep(15);
  // };
  // const sleep_16 = (e) => {
  //   e.preventDefault();
  //   setSleep(16);
  // };
  // const sleep_17 = (e) => {
  //   e.preventDefault();
  //   setSleep(17);
  // };
  // const sleep_18 = (e) => {
  //   e.preventDefault();
  //   setSleep(18);
  // };
  // const sleep_19 = (e) => {
  //   e.preventDefault();
  //   setSleep(19);
  // };
  // const sleep_20 = (e) => {
  //   e.preventDefault();
  //   setSleep(20);
  // };
  // const sleep_21 = (e) => {
  //   e.preventDefault();
  //   setSleep(21);
  // };
  // const sleep_22 = (e) => {
  //   e.preventDefault();
  //   setSleep(22);
  // };
  // const sleep_23 = (e) => {
  //   e.preventDefault();
  //   setSleep(23);
  // };

  // const sleepPref_0 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(0);
  // };
  // const sleepPref_1 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(1);
  // };
  // const sleepPref_2 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(2);
  // };
  // const sleepPref_3 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(3);
  // };
  // const sleepPref_4 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(4);
  // };
  // const sleepPref_5 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(5);
  // };
  // const sleepPref_6 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(6);
  // };
  // const sleepPref_7 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(7);
  // };
  // const sleepPref_8 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(8);
  // };
  // const sleepPref_9 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(9);
  // };
  // const sleepPref_10 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(10);
  // };
  // const sleepPref_11 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(11);
  // };
  // const sleepPref_12 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(12);
  // };
  // const sleepPref_13 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(13);
  // };
  // const sleepPref_14 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(14);
  // };
  // const sleepPref_15 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(15);
  // };
  // const sleepPref_16 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(16);
  // };
  // const sleepPref_17 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(17);
  // };
  // const sleepPref_18 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(18);
  // };
  // const sleepPref_19 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(19);
  // };
  // const sleepPref_20 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(20);
  // };
  // const sleepPref_21 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(21);
  // };
  // const sleepPref_22 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(22);
  // };
  // const sleepPref_23 = (e) => {
  //   e.preventDefault();
  //   setSleepPref(23);
  // };

  return (ready && isInitialized ? (

    <div id="profile-page" className="px-5 justify-content-md-center">
      <form method="post" onSubmit={handleSubmit}>
        <Row>
          {/* Card with Profile */}
          <Col className="md-4 mb-3">
            <Card>
              <Card.Body className="justify-content-center">
                {/* <p className="">Profile Picture:</p> */}
                {/* <div style={{ borderRadius: '50%', border: 'darkgray', borderStyle: 'solid', width: '100px', height: '100px', overflow: 'hidden' }}>
                <img
                  alt="Pfp"
                  style={{ cursor: 'pointer', display: 'inline', margin: '0 auto', height: '100%' }}
                  src={url || 'https://cdn.icon-icons.com/icons2/2645/PNG/512/person_circle_icon_159926.png'}
                /> <br />
              </div>
              {/* <Button variant="danger" onClick={(e) => pfpGetter(e)} style={{ display: 'none' }}> </Button> */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="btn btn-secondary" role="button" id="button2">
                  <CloudinaryUploadWidget
                    url={url}
                    setUrl={(val) => {
                      setUrl(val);
                      Users.collection.update(user._id, { $set: { pfp: val } }, (error) => (error ?
                        console.log(error.message) : ''));
                    }}
                  />
                  Upload Profile
                </a>
                <p style={{ color: 'gray' }}>200px x 200px <br />Best for Profile Image</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Roommate Questions  */}
          <Col className="md-4">
            <Card className="mb-2">
              <Card.Body>
                <Row>
                  <Col className="mb-0 sm-3">
                    <Card.Title>Roommate Habit Preferences</Card.Title>
                    <Card.Text>I want someone who is...
                    </Card.Text>
                  </Col>
                  <Col className="sm-5">
                    <TextField name="preference" placeholder="clean" type="text" />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mb-0 sm-3">
                    <Card.Title>Roommate Habit Deal Breakers</Card.Title>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <Card.Text>I don't want someone who is...
                    </Card.Text>
                  </Col>
                  <Col className="sm-5">
                    <TextField name="dealbreaker" placeholder="dirty" type="text" />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mb-0 sm-3">
                    <Card.Title>Your Habits</Card.Title>
                    <Card.Text>I am (a)...
                    </Card.Text>
                  </Col>
                  <Col className="sm-5">
                    <TextField name="habit" placeholder="gamer" type="text" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Gender and Alcohol */}
          <Col className="md-4">
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col className="mb-0 sm-2">
                    <Card.Title>Gender</Card.Title>
                  </Col>
                  <Col className="sm-4">
                    <Dropdown
                      id="gender"
                      name="gender"
                      defaultValue={['Other']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {gender} </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item id="maleButton1" as="button" onClick={gender_male}>Male</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={gender_female}>Female</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={gender_other}>Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mb-0 sm-2">
                    <Card.Title>Preferred Roommate Gender</Card.Title>
                  </Col>
                  <Col className="sm-4">
                    <Dropdown
                      id="gender_preference"
                      name="gender_preference"
                      defaultValue={['Other']}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-profile"> {genderPref} </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item id="maleButton2" as="button" onClick={genderPref_male}>Male</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={genderPref_female}>Female</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={genderPref_noPreference}>No Preference</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={genderPref_other}>Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mb-0 sm-3">
                    <Card.Title>Do you drink alcohol?</Card.Title>
                  </Col>
                  <Col className="sm-5">
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
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="mb-0 sm-3">
                    <Card.Title>Do you care if others drink alcohol?</Card.Title>
                  </Col>
                  <Col className="sm-4">
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
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Name Contact Method */}
          <Col className="md-4 mb-3 ">
            <Row className="md-4 mb-3">
              <Card>
                <Card.Body className="justify-content-center">
                  <Col className="md-4">
                    <Row>
                      <Col className="mb-0 sm-3">
                        <Card.Title>Full Name</Card.Title>
                      </Col>
                      <Col className="sm-5">
                        <TextField name="name" placeholder={name || 'John Doe'} />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col className="mb-0 sm-3">
                        <Card.Title>Contact Methods</Card.Title>
                        <Card.Text>Submit after every entry of Phone Number, Instagram, Discord, Snapchat, etc.
                        </Card.Text>
                      </Col>
                      <Col className="sm-5">
                        <TextField name="social" placeholder="(808) 000-0000" type="text" />
                      </Col>
                    </Row>
                  </Col>
                </Card.Body>
              </Card>
            </Row>

            <Row classname="md-4 mb-3">
              {/* Linked Contact Methods */}
              <Card>
                <Card.Body>
                  <Row>
                    <Col className="md-4 mb-3">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
                    </Col>
                    <Col className="md-4 mb-3">
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
                    </Col>

                  </Row>
                  <Row>
                    <Col className="md-4 mb-3">
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
                    </Col>

                    <Col className="md-4 mb-3">
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
                    </Col>

                  </Row>

                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col xs="3">
            <Card>
              <Card.Body>
                <Card.Title>What time do you go to sleep?</Card.Title>
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
              </Card.Body>
            </Card>
          </Col>
          <Col xs="3">
            <Card>
              <Card.Body>
                <Card.Title>What time do you want your roommate to go to sleep (at the latest)?</Card.Title>
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
              </Card.Body>
            </Card>
          </Col>

          <div className="text-center" style={{ paddingTop: '30px', paddingBottom: '30px', fontSize: '40px' }}>
            <Button disabled={suspended} variant={suspended ? 'danger' : 'success'} type="submit" className="btn btn-primary">Submit</Button>
          </div>

        </Row>
      </form>
    </div>

  ) : <LoadingSpinner />);
};

export default Profile;
