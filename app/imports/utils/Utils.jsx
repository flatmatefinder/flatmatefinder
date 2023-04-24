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
