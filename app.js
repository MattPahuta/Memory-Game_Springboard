console.log('New Memory Game Scripts connected!')

// Click .card reveals image - capture each 'click' and add to counter
// * Complete * Only two images can be visable at any one time
// * Complete * Clicking on two matching images are a 'match' - images should remain face up
// * Complete * Non-matching pairs should remain visable for 1500 before hiding again
// Store lowest storing game in local storage - retain 'best score' 

const cards = document.querySelectorAll('.memory-card');

// const resetButton = document.querySelector('#reset');

// resetButton.addEventListener('click', function() {
//   location.reload();
// })




let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let cardCounter = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
    // second click
    hasFlippedCard = false;
    secondCard = this;
   
    checkForMatch();
}

function checkForMatch() {
  // do cards match? ********************
  // console.log(firstCard.dataset.gif);
  // console.log(secondCard.dataset.gif);
  let matchedCards = firstCard.dataset.gif === secondCard.dataset.gif;

  matchedCards ? disableCards() : unflipCards();

}

function disableCards() {
    // it's a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    console.log('Card pair matched!')
    resetBoard();
}

function unflipCards() {
  lockBoard = true;
  // not a match
  console.log('Card pair not a match.')
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500)
}

function resetBoard () {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


// IIFE (Immediately Invoked Function Expression)
(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12) // shuffle 12 card deck
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));