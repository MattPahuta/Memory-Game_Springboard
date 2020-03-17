console.log('New Memory Game Scripts connected!')

// Click .card reveals image - capture each 'click' and add to counter
// Only two images can be visable at any one time
// Clicking on two matching images are a 'match' - images should remain face up
// Non-matching pairs should remain visable for 1500 before hiding again
// Store lowest storing game in local storage - retain 'best score' 

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard;
let secondCard;

function flipCard() {
  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

    // do cards match?
    console.log(firstCard.dataset.gif);
    console.log(secondCard.dataset.gif);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));