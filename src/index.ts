import { User } from './models/User';

const user = User.buildUser({ name: 'kiki', age: 5 });

// user.on('change', () => {
//   console.log(user);
// });

// user.fetch();

user.on('save', () => {
  console.log(user);
});

user.save();
