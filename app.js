console.log('New Memory Game Scripts connected!')

const cards = document.querySelectorAll('.memory-card');
const resetButton = document.querySelector('#reset-btn');
const currentScore = document.querySelector('#current-score');
const bestScore = document.querySelector('#best-score');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let cardCounter = 0;
let gameOver = 0;
let lowScore = localStorage.getItem('low-score'); // Track best score in local storage

// Modal elemetents ********************
// Get the modal
const modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


if (lowScore) {
  document.getElementById('best-score').innerText = lowScore; // Display current best score
}

// Reset Game Board - Refresh page
resetButton.addEventListener('click', function() {
  location.reload();
})

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    cardCounter++; // increment counter
    currentScore.textContent = cardCounter; // Display current clicks
    return;
  }
    // second click
    hasFlippedCard = false;
    secondCard = this;
    cardCounter++; // increment counter
    currentScore.textContent = cardCounter; // Display current clicks
    checkForMatch();
}

function checkForMatch() {
  // Does the card pair match? ********************
  let matchedCards = firstCard.dataset.gif === secondCard.dataset.gif;
  matchedCards ? disableCards() : unflipCards();
}

function disableCards() {
    // Card pair matched!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    gameOver++;
    if (gameOver === 10){ 
      setTimeout(function() { endGame(); }, 500);
    } 
    resetBoard();
}

function unflipCards() {
  lockBoard = true;
  // Not a match
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500)
}

function resetBoard () {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function endGame() {
  if ((lowScore > currentScore.innerText) || !lowScore) {
    localStorage.setItem("low-score", currentScore.innerText);
    bestScore.innerText = currentScore.innerText;
    document.querySelector('h4').innerHTML = 'You solved the game at warp speed! The new top score of <span id="modal-click-counter"></span> is yours!'
    document.getElementById("modal-click-counter").innerText = cardCounter;
    modal.style.display = "flex";
  } else{
    document.getElementById("modal-click-counter").innerText = cardCounter;
    modal.style.display = "flex";
  }
}

// IIFE (Immediately Invoked Function Expression)
(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 20) // shuffle
    card.style.order = randomPos; // randomize based on flexbox property 'order' - assign random order to each card  
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// *********** Game Winning Modal ******************************** 
span.onclick = function() {
  modal.style.display = "none";
}

// Utility *********************
// localStorage.clear();