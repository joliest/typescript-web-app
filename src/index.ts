import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({
  name: 'Joli',
  age: 20,
});

const root = document.getElementById('root');
if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
} else {
  throw new Error('root is not found');
}
