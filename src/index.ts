import { User } from './models/User';

const user = new User({});

user.set({ age: 60 });
console.log(user.get('name'));
console.log(user.get('age'));
