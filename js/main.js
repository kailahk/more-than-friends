/*----- constants -----*/
let backOfCard = 'https://i.imgur.com/A7MJNVp.png'
let maxGuesses = 20;

/*----- state variables -----*/
let board;
let guessesLeft;
let winner;
// when turnStatus === 'off', the player's click will be the first click of their current turn. 
// when turnStatus === 'on', the player's click will be the secon click of their currrent turn.
let turnStatus;
let firstPick;
let arrOfMatches = [];

/*----- cached elements  -----*/
const guessesLeftMsg = document.getElementById('guesses-left');
const allCards = document.getElementById('cards');

/*----- event listeners -----*/
allCards.addEventListener('click', handleClick);

/*----- functions -----*/
init();

function init() {
  cards = [
    { imageUrl: 'https://i.imgur.com/HR4kTNG.png', id: 0, flipped: false, matched: false, match: 1 },
    { imageUrl: 'https://i.imgur.com/XA7gIx1.png', id: 1, flipped: false, matched: false, match: 0 },
    { imageUrl: 'https://i.imgur.com/dNf9bRk.png', id: 2, flipped: false, matched: false, match: 3 },
    { imageUrl: 'https://i.imgur.com/YXKrD33.png', id: 3, flipped: false, matched: false, match: 2 },
    { imageUrl: 'https://i.imgur.com/7pbniYx.png', id: 4, flipped: false, matched: false, match: 5 },
    { imageUrl: 'https://i.imgur.com/QHaWW8m.png', id: 5, flipped: false, matched: false, match: 4 },

    { imageUrl: 'https://i.imgur.com/Bp0hm2R.png', id: 6, flipped: false, matched: false, match: 7 },
    { imageUrl: 'https://i.imgur.com/WYCiTFX.png', id: 7, flipped: false, matched: false, match: 6 },
    { imageUrl: 'https://i.imgur.com/OILrHRo.png', id: 8, flipped: false, matched: false, match: 9 },
    { imageUrl: 'https://i.imgur.com/7t7fRLK.png', id: 9, flipped: false, matched: false, match: 8 },
    { imageUrl: 'https://i.imgur.com/NhKC7wJ.png', id: 10, flipped: false, matched: false, match: 11 },
    { imageUrl: 'https://i.imgur.com/N6OcioZ.png', id: 11, flipped: false, matched: false, match: 10 },

    { imageUrl: 'https://i.imgur.com/GqPSWRl.png', id: 12, flipped: false, matched: false, match: 13 },
    { imageUrl: 'https://i.imgur.com/Xwp0BG7.png', id: 13, flipped: false, matched: false, match: 12 },
    { imageUrl: 'https://i.imgur.com/TvQC4mU.png', id: 14, flipped: false, matched: false, match: 15 },
    { imageUrl: 'https://i.imgur.com/dMF4REZ.png', id: 15, flipped: false, matched: false, match: 14 },
    { imageUrl: 'https://i.imgur.com/Suw3lQN.png', id: 16, flipped: false, matched: false, match: 17 },
    { imageUrl: 'https://i.imgur.com/UDbz8st.png', id: 17, flipped: false, matched: false, match: 16 },

    { imageUrl: 'https://i.imgur.com/sCroF4h.png', id: 18, flipped: false, matched: false, match: 19 },
    { imageUrl: 'https://i.imgur.com/lil7ExR.png', id: 19, flipped: false, matched: false, match: 18 },
    { imageUrl: 'https://i.imgur.com/ubGfsHV.png', id: 20, flipped: false, matched: false, match: 21 },
    { imageUrl: 'https://i.imgur.com/ahhKDw1.png', id: 21, flipped: false, matched: false, match: 20 },
    { imageUrl: 'https://i.imgur.com/DT7UMOL.png', id: 22, flipped: false, matched: false, match: 23 },
    { imageUrl: 'https://i.imgur.com/SD1d5YJ.png', id: 23, flipped: false, matched: false, match: 22 },

    { imageUrl: 'https://i.imgur.com/zwWpT5D.png', id: 24, flipped: false, matched: false, match: 25 },
    { imageUrl: 'https://i.imgur.com/bCVFS5h.png', id: 25, flipped: false, matched: false, match: 24 },
    { imageUrl: 'https://i.imgur.com/18VQvIf.png', id: 26, flipped: false, matched: false, match: 27 },
    { imageUrl: 'https://i.imgur.com/ntSBHNm.png', id: 27, flipped: false, matched: false, match: 26 },
    { imageUrl: 'https://i.imgur.com/rOz6VFN.png', id: 28, flipped: false, matched: false, match: 29 },
    { imageUrl: 'https://i.imgur.com/GHotMmJ.png', id: 29, flipped: false, matched: false, match: 28 },

    { imageUrl: 'https://i.imgur.com/bPoyZN0.png', id: 30, flipped: false, matched: false, match: 31 },
    { imageUrl: 'https://i.imgur.com/ZbibW98.png', id: 31, flipped: false, matched: false, match: 30 },
    { imageUrl: 'https://i.imgur.com/NlxnVMs.png', id: 32, flipped: false, matched: false, match: 33 },
    { imageUrl: 'https://i.imgur.com/n8FSArl.png', id: 33, flipped: false, matched: false, match: 32 },
    { imageUrl: 'https://i.imgur.com/0Itot7A.png', id: 34, flipped: false, matched: false, match: 35 },
    { imageUrl: 'https://i.imgur.com/BxbsCr3.png', id: 35, flipped: false, matched: false, match: 34 },
  ];
  shuffleCards(cards);
  showCards(cards);
  winner = null;
  guessesLeft = maxGuesses;
  turnStatus = 'off'
  console.log(cards)
  render();
}

function shuffleCards(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  cards = deck;
}

function showCards(deck) {
  deck.forEach(function(cell, idx) {
    cell.flipped = true;
    setTimeout(() => {
      cell.flipped = false;
      render()
    }, 5000);
  })
}

function handleClick(event) {
  let idx = event.target.id;
  let currentCell = cards[idx];
  if (event.target.id === 'cards') return;
  if (currentCell.matched === true || currentCell.flipped === true) return;
  if (turnStatus === 'off') {
    currentCell.flipped = true;
    turnStatus = 'on';
    firstPick = currentCell;
  } else if (turnStatus === 'on') {
    turnStatus = 'off'
    firstPick.flipped = true;
    currentCell.flipped = true;
    checkMatch(currentCell);
  }
  render();
}

function checkMatch(currentCell) {
  if (firstPick.match === currentCell.id) {
    firstPick.matched = true;
    currentCell.matched = true;
    firstPick.flipped = true;
    currentCell.flipped = true;
    let newArr = [firstPick, currentCell];
    arrOfMatches.unshift(newArr);
    checkWinner();
  } else {
    countToThree(currentCell, firstPick);
    guessesLeft -= 1;
    checkWinner();
  }
}

function checkWinner() {
  if (arrOfMatches && arrOfMatches.length > 35 && guessesLeft > 0) {
    winner = true;
  } else if (guessesLeft <= 0) {
    winner = false
  }
  else {
    winner = null
  }
  if (winner === true) {
    window.location.href = "./win.html"
  } else if (winner === false) {
    window.location.href = "./lose.html"
  }
}

function countToThree(currentCell, firstPick) {
  setTimeout(() => {
      currentCell.flipped = false;
      firstPick.flipped = false;
      render()
    }, 3000);
}

function render() {
  renderCards();
  renderGuesses();
}

function renderCards() {
  cards.forEach(function (card, idx) {
    let curCell = document.getElementById(`${idx}`);
    if (card.matched === true || card.flipped === true) {
      curCell.style.backgroundImage = `url(${card.imageUrl})`;
      curCell.style.backgroundSize = `contain`;
      curCell.style.backgroundRepeat = `no-repeat`;
      curCell.style.height = '14vmin';
      curCell.style.width = '18vmin';
    } else {
      curCell.style.backgroundImage = `url(${backOfCard})`;
      curCell.style.backgroundSize = `contain`;
      curCell.style.backgroundRepeat = `no-repeat`;
      curCell.style.height = '14vmin';
      curCell.style.width = '18vmin';
    }
  });
}

function renderGuesses() {
  if (guessesLeft > 0) {
    guessesLeftMsg.innerHTML = `${guessesLeft}`;
  } else if (guessesLeft <= 0) {
    guessesLeftMsg.innerHTML = `0 guesses left!`;
    allCards.removeEventListener('click', handleClick);
    winner = false;
  }
}
