import { User } from './models/User';

const user = new User({ id: 1 });

user.set({ name: 'dudu', age: 10 });
user.save();

user.events.on('change', () => {
  console.log('change!');
});

user.events.triggger('change');
