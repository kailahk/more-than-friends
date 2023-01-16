  /*----- constants -----*/
let backOfCard = 'https://i.imgur.com/A7MJNVp.png'


  /*----- state variables -----*/
let board;
let guessesLeft;
let winner;
// when turnStatus === 'off', the player's click will be the first click of their current turn. 
// when turnStatus === 'on', the player's click will be the secon click of their currrent turn.
let turnStatus;
let firstPick;
let arrOfMatches;

  /*----- cached elements  -----*/
const guessesLeftMsg = document.getElementById('guesses-left');
const allCards = document.getElementById('cards');

  /*----- event listeners -----*/
allCards.addEventListener('click', handleClick);

  /*----- functions -----*/
init();

function init() {
  cards = [
   {imageUrl: '', id: 1, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 2, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 3, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 4, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 5, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 6, flipped: false, matched: false, match: 0},
   
   {imageUrl: '', id: 7, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 8, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 9, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 10, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 11, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 12, flipped: false, matched: false, match: 0},
   
   {imageUrl: '', id: 13, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 14, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 15, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 16, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 17, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 18, flipped: false, matched: false, match: 0},
   
   {imageUrl: '', id: 19, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 20, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 21, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 22, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 23, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 24, flipped: false, matched: false, match: 0},
   
   {imageUrl: '', id: 25, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 26, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 27, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 28, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 29, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 30, flipped: false, matched: false, match: 0},
   
   {imageUrl: '', id: 31, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 32, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 33, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 34, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 35, flipped: false, matched: false, match: 0}, 
   {imageUrl: '', id: 36, flipped: false, matched: false, match: 0},
  ];
  shuffleCards(cards);
  showCards(cards);
  winner = null;
  guessesLeft = 20;
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
  
}

function handleClick(event) {
  if (event.target.id === 'cards') return;
  if (event.target.matched === true || event.target.flipped === true) return;
  if (turnStatus === 'off') {
    event.target.flipped = true;
    turnStatus = 'on';
    firstPick = event.target;
  } else if (turnStatus === 'on') {
    event.target.flipped = true;
    turnStatus = 'off'
    checkMatch(event);
  }
}

function checkMatch(event) {
  if (firstPick.id === event.target.id) {
    firstPick.matched = true;
    event.target.matched = true;
    let newArr = [firstPick, event.target];
    arrOfMatches.unShift(newArr);
  } else {

  }
}

function render() {
  renderCards();
  renderGuesses();
}

function renderCards() {
  cards.forEach(function(card, idx) {
    position = idx;
    let curCell = document.getElementById(`${position}`);
    if (cards[position].flipped === true || cards[position].matched === true) {
      curCell.style.backgroundImage = `url(${cards[position].imageUrl})`;
    } else {
      curCell.style.backgroundImage = `url(${backOfCard})`;
      curCell.style.backgroundSize = `contain`;
      curCell.style.backgroundRepeat = `no-repeat`;
      curCell.style.height = '11vmin';
      curCell.style.width = '15vmin';
    }
  });
}

function renderGuesses() {
  if (guessesLeft > 0) {
    guessesLeftMsg.innerHTML = `You have ${guessesLeft} guesses left!`;
  } else if (guessesLeft <= 0) {
    guessesLeftMsg.innerHTML = `You have 0 guesses left!`;
    winner = false;
  }
}
