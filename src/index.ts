import { User } from './models/User';

const user = new User({ name: 'new record', age: 0 });

// returns events.on
user.on('click', () => {
  console.log('useful accessor');
});
