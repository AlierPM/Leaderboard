import './style.css';
import Store from './modules/store.js';
import UI from './modules/ui.js';
import User from './modules/user.js';

document.addEventListener('DOMContentLoaded', UI.displayUsers);

const form = document.querySelector('#user-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;

  const user = new User(name, score);

  Store.addUser(user);
  UI.addUserToList(user);

  UI.clearFields();
});
