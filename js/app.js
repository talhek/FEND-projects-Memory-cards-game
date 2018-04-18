

let flippedCards = [];
let moves = document.querySelector(".moves");
let moves_counter = 0;
let timer = 0;
let seconds = 0, minutes = 0, hours = 0;

/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName("card");
console.log('we have ' + cards.length + ' cards');
const deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//set up event listener for each card
for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function(e){
        flipCard(e);
        addToFlippedCards(e.currentTarget);
        if (flippedCards.length > 1){
            incMoves();
            if (flippedCards[0].type === flippedCards[1].type){
                cardsMatched();
            }
            else {
                noMatch();
            }
        }
        console.log(cards[i].type + 'clicked!');
    });
}
//cards symbols didn't match, remove from opened cards list
function noMatch(){
    flippedCards[0].classList.add("unmatched");
    flippedCards[1].classList.add("unmatched");
}
//cards matched, lock them in 'matched' position
function cardsMatched(){
    for (let j = 0; j <=1 ; j++){
        flippedCards[j].classList.remove("show", "open");
        flippedCards[j].classList.add("match");
    }
    flippedCards.pop();
    flippedCards.pop();


}
//increase moves counter 
function incMoves(){
    moves_counter++;
    moves.innerHTML = moves_counter;
}
//flips a card and shows its symbol
function flipCard(e){
    e.target.classList.toggle("open");
    e.target.classList.toggle("show");
    e.target.classList.toggle("disabled");
}
//add to a list of previously opened cards
function addToFlippedCards(cardToAdd){
    flippedCards.push(cardToAdd);
}
//shuffle and reset data when a new game is started
function beginGame(){
    let shuffledDeck = shuffle(cards);
    for (let i = 0; i < shuffledDeck.length; i++){
        deck.appendChild(shuffledDeck[i]);
    }

}
//reset timer
function resetTimer(){
    seconds = 0;
    minutes = 0;
    hours = 0;
    startTimer();
}

window.onload = beginGame();
