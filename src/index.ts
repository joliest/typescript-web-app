import { User } from './models/User';

const user = new User({});

user.on('change', () => {
  console.log('Change # 1');
});
user.on('change', () => {
  console.log('Change # 2');
});
user.on('save', () => {
  console.log('Save was triggered');
});

user.triggger('save');
