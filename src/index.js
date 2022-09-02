import './style.css';
import sendNewScore from './modules/store.js';
import getData from './modules/get.js';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/j22uKXxrSkg52SSFn2tq/scores';

document.querySelector('.refresh-btn').addEventListener('click', () => {
  window.location.reload();
});

const form = document.querySelector('#user-form');
const submitButton = document.getElementsByClassName('add-btn');


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userName = document.querySelector('#name').value;
  const userScore = document.querySelector('#score').value;

  const data = {
    user: userName,
    score: userScore,
  };

  sendNewScore(url, data);

  document.querySelector('#name').value = '';
  document.querySelector('#score').value = '';
});
getData(url);

submitButton.addEventListener('click', async () => {
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');

  if (nameInput.value !== '' && scoreInput.value !== '') {
    createNewScore(url, nameInput.value, scoreInput.value);
    nameInput.value = '';
    scoreInput.value = '';
  }
});
