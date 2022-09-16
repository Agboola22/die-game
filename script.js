'use strict';

const playerOCurrScore = document.querySelector('#current--0');
const player1CurrScore = document.querySelector('#current--1');
const rollDie = document.querySelector('#roll');
const holdScore = document.querySelector('#hold');
const newGame = document.querySelector('#newgame');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const winner = document.querySelector('.winner');
const anotherGame = document.querySelector('.anothergame');

let scores, roundScore, activePlayer, isPlaying;
let p = document.createElement('p');

// start game
const initialize = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;

  document.querySelector('.dice').style.display = 'none'; // dont display any dicee image at begining
  document.querySelector('#score--0').textContent = '0';
  document.querySelector('#score--1').textContent = '0';
  playerOCurrScore.textContent = '0';
  player1CurrScore.textContent = '0';
  player0.classList.remove('active');
  player1.classList.remove('active');
  player0.classList.add('active');
  document.querySelector('.main').style.opacity = '1.0';
};
initialize();

// load next game
const load = () => {
  initialize();
  winner.style.display = 'none';
  p.remove();
};

// display winner
const displayWin = () => {
  document.querySelector('.main').style.opacity = '0.5';
  winner.style.display = 'flex';
  p.textContent = `player-${activePlayer + 1} wins :)`;

  winner.prepend(p);
};

// roll die function
rollDie.addEventListener('click', () => {
  if (isPlaying) {
    let diceDom = document.querySelector('.dice');
    let dice = Math.floor(Math.random() * 6) + 1;

    //   display dice image and number //
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    document.querySelector('#current--' + activePlayer).innerHTML =
      '<b>' + dice + '</b>';

    if (dice !== 1) {
      // add dice to total score
      roundScore += dice;
      document.querySelector(`#current--${activePlayer}`).innerHTML =
        roundScore;
    } else {
      reloadDIE();
    }
  }
});

// add scores to counter
holdScore.addEventListener('click', () => {
  if (isPlaying) {
    let diceDom = document.querySelector('.dice');

    scores[activePlayer] += roundScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      displayWin();
      document.querySelector('.dice').style.display = 'none';
      isPlaying = false;
    } else {
      reloadDIE();
    }
  }
});

// changePlayer
const reloadDIE = () => {
  let diceDom = document.querySelector('.dice');

  // next players turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // return scores to zero
  playerOCurrScore.textContent = '0';
  player1CurrScore.textContent = '0';

  // set active player
  player0.classList.toggle('active');
  player1.classList.toggle('active');

  diceDom.style.display = 'none';
};

newGame.addEventListener('click', load);
anotherGame.addEventListener('click', load);
