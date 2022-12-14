import './style.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/j22uKXxrSkg52SSFn2tq/scores';

const list = document.querySelector('.list');
const form = document.querySelector('#user-form');
const refresh = document.querySelector('.refresh-btn');
const getScores = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const display = async () => {
  const data = await getScores();
  // eslint-disable-next-line no-unused-vars
  const highToLow = data.result.sort((a, b) => b.score - a.score);
  data.result.forEach((e) => {
    const listItem = document.createElement('li');
    listItem.className = 'listItem';
    const name = document.createElement('h2');
    const score = document.createElement('h2');

    list.appendChild(listItem);
    listItem.appendChild(name);
    listItem.appendChild(score);

    name.textContent = e.user;
    score.textContent = e.score;
  });
};

const addNewScore = async (name, score) => {
  await fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score,
      }),
    })
    .then((response) => response.json())
    .then((data) => data);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  if (name !== '' && score !== '') {
    addNewScore(name, score);
    const addScore = document.createElement('h4');
    addScore.classList.add('addScore');
    addScore.textContent = 'Click the refresh button to view your result';
    form.appendChild(addScore);
    setTimeout(() => {
      addScore.remove();
    }, 1000);
    form.reset();
  } else {
    const error = document.createElement('h4');
    error.classList.add('addScore');
    error.textContent = 'Fill in all the fields please!';
    form.appendChild(error);
    setTimeout(() => {
      error.remove();
    }, 3000);
  }
});

refresh.addEventListener('click', () => {
  list.innerHTML = '';
  display();
});

display();