
// *selectors
const moves = document.querySelector(".moves");
const timer = document.querySelector(".timer");
const restartButton = document.querySelector(".restart");
let cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
//vars
let flippedCards = [];
let moves_counter = 0;
let seconds = 0, minutes = 0, hours = 0;

$(document).ready(beginGame());

//starts a fresh game
function beginGame(){
    shuffleCards();
    setEventsListeners();
    popAllCards();
    resetTimer();
    resetMoves();

}

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

function setEventsListeners(){
    //set up event listener for each card
    for (let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', function(e){
            flipCard(e.target);
            addToFlippedCards(e.currentTarget);
            if (flippedCards.length > 1){
                incMoves();
                if (flippedCards[0].type === flippedCards[1].type){
                    cardsMatched();
                }
                else {
                    cardsNotMatching();
                }
            }
        });
    }
    
    //set up event listener for game restart
    restartButton.addEventListener('click' , function()
    {
        location.reload();
    });
}
function popAllCards(){
    while (flippedCards.length > 0 ){
        flippedCards.pop();
    }
}
//TODO:
//+ add animation for cards that matched
function cardsMatched(){
    for (let j = 0; j <=1 ; j++){
        flippedCards[j].classList.remove("show", "open");
        flippedCards[j].classList.add("match");
    }
    popAllCards();
}
//TODO:
//+ decrease star for unsuccessful try
//+ add animation for cards that didn't match
function cardsNotMatching(){
    //flippedCards[0].classList.add("unmatched");
    //flippedCards[1].classList.add("unmatched");

    flippedCards[0].classList.remove("shown" , "open");
    flippedCards[1].classList.remove("shown" , "open");
    popAllCards();

}
//flips a card and shows its symbol
function flipCard(card){
    card.classList.toggle("open");
    card.classList.toggle("show");
    card.classList.toggle("disabled");
}
//add to a list of previously opened cards
function addToFlippedCards(cardToAdd){
    flippedCards.push(cardToAdd);
}
//suffles the deck
function shuffleCards(){
    let shuffledDeck = shuffle(cards);
    for (let i = 0; i < shuffledDeck.length; i++){
        deck.appendChild(shuffledDeck[i]);
        shuffledDeck[i].classList.remove("show" , "open" , "match");
    }
}

//Creates the game 'timer'(stopwatch).
//TODO: time to begin on gameplay only (currently happens after restarts)
function startTimer(){
    setInterval(function(){
        timer.innerHTML =  minutes+":"+ seconds;
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds=0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
        }
    }, 1000);
}
//Resets timer data
function resetTimer(){
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.innerHTML = "0:0";
}
//Resets moves data
function resetMoves(){
    moves_counter = 0;
}
//Increase moves counter 
function incMoves(){
    moves_counter++;
    moves.innerHTML = moves_counter;
    if(moves_counter == 1)
    startTimer();

}

