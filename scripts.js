console.log('Memory Game Scripts Connected!');


// Click .card reveals image - capture each 'click' and add to counter
// Only two images can be visable at any one time
// Clicking on two matching images are a 'match' - images should remain face up
// Non-matching pairs should remain visable for 1500 before hiding again
// Store lowest storing game in local storage - retain 'best score' 


const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function(e) {
  // console.log('Reset button clicked!')
  location.reload();
})

// buttons.addEventListener('click', function() {
//   console.log('A button was clicked')
// })



// Click listener for cards 
const cards = document.querySelectorAll('.flip-card');
const cardsInner = document.querySelectorAll('.flip-card-inner');

// cards.addEventListener('click', function(){
//   cards.classList.toggle('flipped')
//   cardsInner.classList.toggle('flipped')
// })


/* <div class="flip-card">
<div class="flip-card-inner">
  <div class="flip-card-front">
    <img src="" alt="">
  </div>
  <div class="flip-card-back">
  </div>
</div>
</div> */




/* .flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
} */