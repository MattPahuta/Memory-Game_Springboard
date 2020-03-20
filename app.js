console.log('New Memory Game Scripts connected!')
// ********** Requirements *******************************************************
// * Complete * Click .card reveals image - capture each 'click' and add to counter
// * Complete * Only two images can be visable at any one time
// * Complete * Clicking on two matching images are a 'match' - images should remain face up
// * Complete * Non-matching pairs should remain visable for 1500 before hiding again
// * Complete * Store lowest storing game in local storage - retain 'best score' 


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
    console.log(cardCounter); // log counter
    return;
  }
    // second click
    hasFlippedCard = false;
    secondCard = this;
    cardCounter++; // increment counter
    currentScore.textContent = cardCounter; // Display current clicks
    console.log(`cardCounter var is: ${cardCounter}`); // log counter
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
    console.log('Card pair matched!') // logging
    gameOver++;
    console.log(`Game Over Counter is: ${gameOver}`); // logging
    console.log(`Current Low Score is: ${lowScore}`); // logging
    if (gameOver === 10){ // 10 for 20 -- 8 for 16 card deck (original 6 for 12)
      setTimeout(function() { endGame(); }, 500);
    } 
    resetBoard();

}

function unflipCards() {
  lockBoard = true;
  // Not a match
  console.log('Card pair not a match.')
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
      alert(`You've got the new best score of ${cardCounter}`);
  } else{
    // alert(`You won in ${cardCounter} clicks!`)
    document.getElementById("modal-click-counter").innerText = cardCounter;
    modal.style.display = "flex";
  }

}



// IIFE (Immediately Invoked Function Expression)
(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 20) // shuffle 12 (original) card deck
    card.style.order = randomPos; // randomize based on flexbox property 'order' - assign random order to each card  
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// Utility *********************
// localStorage.clear();


// *********** Game Winning Modal ******************************** 


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
