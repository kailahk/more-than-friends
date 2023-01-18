/*----- constants -----*/
let backOfCard = 'https://i.imgur.com/A7MJNVp.png'
let maxGuesses = 25;

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
const matchEl = document.getElementById('match-names');
const showEl = document.getElementById('show-name');

/*----- event listeners -----*/
allCards.addEventListener('click', handleClick);

/*----- functions -----*/
init();

function init() {
  cards = [
    { imageUrl: 'https://i.imgur.com/HR4kTNG.png', id: 0, name: 'Harvey Kinkle', show: 'Sabrina the Teenage Witch', flipped: false, matched: false, match: 1 },
    { imageUrl: 'https://i.imgur.com/XA7gIx1.png', id: 1, name: 'Sabrina Spellman', show: 'Sabrina the Teenage Witch', flipped: false, matched: false, match: 0 },
    { imageUrl: 'https://i.imgur.com/dNf9bRk.png', id: 2, name: 'Danny Castellano', show: 'The Mindy Project', flipped: false, matched: false, match: 3 },
    { imageUrl: 'https://i.imgur.com/YXKrD33.png', id: 3, name: 'Mindy Lahiri', show: 'The Mindy Project', flipped: false, matched: false, match: 2 },
    { imageUrl: 'https://i.imgur.com/7pbniYx.png', id: 4, name: 'Patrick Brewer', show: 'Schitt\'s Creek', flipped: false, matched: false, match: 5 },
    { imageUrl: 'https://i.imgur.com/QHaWW8m.png', id: 5, name: 'David Rose', show: 'Schitt\'s Creek', flipped: false, matched: false, match: 4 },

    { imageUrl: 'https://i.imgur.com/Bp0hm2R.png', id: 6, name: 'Pam Beesly', show: 'The Office', flipped: false, matched: false, match: 7 },
    { imageUrl: 'https://i.imgur.com/WYCiTFX.png', id: 7, name: 'Jim Halpert', show: 'The Office', flipped: false, matched: false, match: 6 },
    { imageUrl: 'https://i.imgur.com/OILrHRo.png', id: 8, name: 'Diane Chambers', show: 'Cheers', flipped: false, matched: false, match: 9 },
    { imageUrl: 'https://i.imgur.com/7t7fRLK.png', id: 9, name: 'Sam Malone', show: 'Cheers', flipped: false, matched: false, match: 8 },
    { imageUrl: 'https://i.imgur.com/NhKC7wJ.png', id: 10, name: 'April Ludgate', show: 'Parks and Recreation', flipped: false, matched: false, match: 11 },
    { imageUrl: 'https://i.imgur.com/N6OcioZ.png', id: 11, name: 'Andy Dwyer', show: 'Parks and Recreation', flipped: false, matched: false, match: 10 },

    { imageUrl: 'https://i.imgur.com/GqPSWRl.png', id: 12, name: 'Topanga Lawrence', show: 'Boy Meets World', flipped: false, matched: false, match: 13 },
    { imageUrl: 'https://i.imgur.com/Xwp0BG7.png', id: 13, name: 'Cory Matthews', show: 'Boy Meets World', flipped: false, matched: false, match: 12 },
    { imageUrl: 'https://i.imgur.com/TvQC4mU.png', id: 14, name: 'Fitzgerald Grant', show: 'Scandal', flipped: false, matched: false, match: 15 },
    { imageUrl: 'https://i.imgur.com/dMF4REZ.png', id: 15, name: 'Olivia Pope', show: 'Scandal', flipped: false, matched: false, match: 14 },
    { imageUrl: 'https://i.imgur.com/Suw3lQN.png', id: 16, name: 'Jessica Day', show: 'New Girl', flipped: false, matched: false, match: 17 },
    { imageUrl: 'https://i.imgur.com/UDbz8st.png', id: 17, name: 'Nick Miller', show: 'New Girl', flipped: false, matched: false, match: 16 },

    { imageUrl: 'https://i.imgur.com/sCroF4h.png', id: 18, name: 'Lawrence Walker', show: 'Insecure', flipped: false, matched: false, match: 19 },
    { imageUrl: 'https://i.imgur.com/lil7ExR.png', id: 19, name: 'Issa Dee', show: 'Insecure', flipped: false, matched: false, match: 18 },
    { imageUrl: 'https://i.imgur.com/ubGfsHV.png', id: 20, name: 'Cameron Tucker', show: 'Modern Family', flipped: false, matched: false, match: 21 },
    { imageUrl: 'https://i.imgur.com/ahhKDw1.png', id: 21, name: 'Mitchell Pritchett', show: 'Modern Family', flipped: false, matched: false, match: 20 },
    { imageUrl: 'https://i.imgur.com/DT7UMOL.png', id: 22, name: 'Becky Katsopolis', show: 'Full House', flipped: false, matched: false, match: 23 },
    { imageUrl: 'https://i.imgur.com/SD1d5YJ.png', id: 23, name: 'Jesse Katsopolis', show: 'Full House', flipped: false, matched: false, match: 22 },

    { imageUrl: 'https://i.imgur.com/zwWpT5D.png', id: 24, name: 'Philip Banks', show: 'Fresh Prince of Bel Air', flipped: false, matched: false, match: 25 },
    { imageUrl: 'https://i.imgur.com/bCVFS5h.png', id: 25, name: 'Vivian Banks', show: 'Fresh Prince of Bel Air', flipped: false, matched: false, match: 24 },
    { imageUrl: 'https://i.imgur.com/18VQvIf.png', id: 26, name: 'Eleanor Shellstrop', show: 'The Good Place', flipped: false, matched: false, match: 27 },
    { imageUrl: 'https://i.imgur.com/ntSBHNm.png', id: 27, name: 'Chidi Anagonye', show: 'The Good Place', flipped: false, matched: false, match: 26 },
    { imageUrl: 'https://i.imgur.com/rOz6VFN.png', id: 28, name: 'Donna Pinciotti', show: 'That \'70s Show', flipped: false, matched: false, match: 29 },
    { imageUrl: 'https://i.imgur.com/GHotMmJ.png', id: 29, name: 'Eric Forman', show: 'That \'70s Show', flipped: false, matched: false, match: 28 },

    { imageUrl: 'https://i.imgur.com/bPoyZN0.png', id: 30, name: 'Amy Santiago', show: 'Brooklyn 99', flipped: false, matched: false, match: 31 },
    { imageUrl: 'https://i.imgur.com/ZbibW98.png', id: 31, name: 'Jake Peralta', show: 'Brooklyn 99', flipped: false, matched: false, match: 30 },
    { imageUrl: 'https://i.imgur.com/NlxnVMs.png', id: 32, name: 'Tami Taylor', show: 'Friday Night Lights', flipped: false, matched: false, match: 33 },
    { imageUrl: 'https://i.imgur.com/n8FSArl.png', id: 33, name: 'Eric Taylor', show: 'Friday Night Lights', flipped: false, matched: false, match: 32 },
    { imageUrl: 'https://i.imgur.com/0Itot7A.png', id: 34, name: 'Rachel Greene', show: 'Friends', flipped: false, matched: false, match: 35 },
    { imageUrl: 'https://i.imgur.com/BxbsCr3.png', id: 35, name: 'Ross Geller', show: 'Friends', flipped: false, matched: false, match: 34 },
  ];
  shuffleCards(cards);
  showCards(cards);
  console.log(cards)
  winner = null;
  guessesLeft = maxGuesses;
  turnStatus = 'off'
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
  deck.forEach(function (cell, idx) {
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
  let curCellEl = document.getElementById(event.target.id)
  if (event.target.id === 'cards') return;
  if (currentCell.matched === true || currentCell.flipped === true) return;
  if (turnStatus === 'off') {
    currentCell.flipped = true;
    curCellEl.style.transform = `scale(1.2)`;
    turnStatus = 'on';
    firstPick = currentCell;
  } else if (turnStatus === 'on') {
    turnStatus = 'off'
    currentCell.flipped = true;
    curCellEl.style.transform = `scale(1.2)`;
    checkMatch(currentCell, curCellEl);
  }
  render();
}

function checkMatch(currentCell, curCellEl) {
  let firstPickEl = document.getElementById(cards.indexOf(firstPick))
  if (firstPick.match === currentCell.id) {
    firstPick.matched = true;
    currentCell.matched = true;
    firstPick.flipped = true;
    currentCell.flipped = true;
    showMatch(curCellEl, firstPickEl);
    let newArr = [firstPick, currentCell];
    arrOfMatches.unshift(newArr);
    checkWinner();
  } else {
    countToTwo(currentCell, firstPick, curCellEl, firstPickEl);
    guessesLeft -= 1;
    checkWinner();
  }
}

function showMatch(curCellEl, firstPickEl) {
  let curCell = cards[curCellEl.id]
  let firstPickCell = cards[firstPickEl.id]
  matchEl.innerHTML = `${curCell.name} <br> & <br> ${firstPickCell.name}`
  showEl.innerHTML = `${curCell.show}`
  setTimeout(() => {
    curCellEl.style.transform = `scale(1)`;
    firstPickEl.style.transform = `scale(1)`;
    matchEl.innerHTML = '';
    showEl.innerHTML = '';
  }, 3000)
}

function checkWinner() {
  if (arrOfMatches && arrOfMatches.length > 17 && guessesLeft > 0) {
    winner = true;
  } else if (guessesLeft <= 0) {
    winner = false
  }
  else {
    winner = null
  }
  if (winner === true) {
    window.location.href = "/more-than-friends/win.html"
  } else if (winner === false) {
    window.location.href = "/more-than-friends/lose.html"
  }
}

function countToTwo(currentCell, firstPick, curCellEl, firstPickEl) {
  setTimeout(() => {
    currentCell.flipped = false;
    firstPick.flipped = false;
    curCellEl.style.transform = `scale(1)`;
    firstPickEl.style.transform = `scale(1)`;
    render()
  }, 2000);
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
