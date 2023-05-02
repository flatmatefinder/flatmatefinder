/* eslint-disable no-undef  */
import PropTypes from 'prop-types';
import { Users } from '../api/user/User';

export const sleepIntToString = (sleepInt) => {
  switch (sleepInt) {
  case 0: return '12:00AM';
  case 1: return '1:00AM';
  case 2: return '2:00AM';
  case 3: return '3:00AM';
  case 4: return '4:00AM';
  case 5: return '5:00AM';
  case 6: return '6:00AM';
  case 7: return '7:00AM';
  case 8: return '8:00AM';
  case 9: return '9:00AM';
  case 10: return '10:00AM';
  case 11: return '11:00AM';
  case 12: return '12:00PM';
  case 13: return '1:00PM';
  case 14: return '2:00PM';
  case 15: return '3:00PM';
  case 16: return '4:00PM';
  case 17: return '5:00PM';
  case 18: return '6:00PM';
  case 19: return '7:00PM';
  case 20: return '8:00PM';
  case 21: return '9:00PM';
  case 22: return '10:00PM';
  case 23: return '11:00PM';
  default: return 'Not a time';
  }
};

// export const match = (person1, person2) => {
//
// };

export const getUserIdFromPublicUser = (username) => {
  const user = Users.collection.find({ owner: username });
  return user._id;
};

export const pairTwo = (user1, user2, user1Data, user2Data) => {
  // If user1 cares about alcohol and user2 drinks alcohol, or vice versa...
  if ((user1.alcohol_preference && user2.alcohol) || (user2.alcohol_preference && user1.alcohol)) {
    return false;
  }
  // If User1 wants to dorm with me, and user2 is not a male, or user1 wants to dorm with female, and user2 is not a female, or user1 wants to dorm with "other", and user2 is not "other", or vice versa.
  if ((user1.sex_preference === 0 && user2.sex !== 0) || (user1.sex_preference === 1 && user2.sex !== 1) || (user1.sex_preference === 3 && user2.sex !== 2)
      || (user2.sex_preference === 0 && user1.sex !== 0) || (user2.sex_preference === 1 && user1.sex !== 1) || (user2.sex_preference === 3 && user1.sex !== 2)) {
    return false;
  }
  // TODO PUT LOGIC FOR THE SLEEP STUFF CUZ HONESTLY IDK HOW THE HELL TO DO THAT.

  const user1Nonos = _.filter(user1Data, (data) => data.data_type === 'dealbreaker');
  const user1Habits = _.filter(user1Data, (data) => data.data_type === 'habit');

  const user2Nonos = _.filter(user2Data, (data) => data.data_type === 'dealbreaker');
  const user2Habits = _.filter(user2Data, (data) => data.data_type === 'habit');

  let returnFalse = false;

  user1Nonos.forEach((user1Nono) => {
    user2Habits.forEach((user2Habit) => {
      if (user1Nono.data.toLowerCase() === user2Habit.data.toLowerCase()) {
        returnFalse = true;
        return undefined;
      }
      return undefined;
    });
  });
  user2Nonos.forEach((user2Nono) => {
    user1Habits.forEach((user1Habit) => {
      if (user2Nono.data.toLowerCase() === user1Habit.data.toLowerCase()) {
        returnFalse = true;
        return undefined;
      }
      return undefined;
    });
  });
  if (returnFalse) {
    return false;
  }
  return true;
};
pairTwo.propTypes = {
  user1: PropTypes.shape({
    pfp: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    alcohol: PropTypes.bool,
    alcohol_preferences: PropTypes.bool,
    sleep: PropTypes.number,
    sleep_preferences: PropTypes.number,
    sex: PropTypes.number,
    sex_preference: PropTypes.number,
  }).isRequired,
  user2: PropTypes.shape({
    pfp: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    alcohol: PropTypes.bool,
    alcohol_preferences: PropTypes.bool,
    sleep: PropTypes.number,
    sleep_preferences: PropTypes.number,
    sex: PropTypes.number,
    sex_preference: PropTypes.number,
  }).isRequired,
  user1Data: PropTypes.arrayOf(() => {
    PropTypes.shape({
      data: PropTypes.string,
      owner: PropTypes.string,
      data_type: PropTypes.string,
    });
  }).isRequired,
  user2Data: PropTypes.arrayOf(() => {
    PropTypes.shape({
      data: PropTypes.string,
      owner: PropTypes.string,
      data_type: PropTypes.string,
    });
  }).isRequired,
};
