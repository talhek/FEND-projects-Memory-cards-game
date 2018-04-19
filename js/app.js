//TODO:
//+ decrease star for unsuccessful try
//+ display modal on winning game




// selectors
const moves = document.querySelector(".moves");
const restartButton = document.querySelector(".restart");
let cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let gameOver_popup = document.querySelector("#congratsModal"); 

//vars
let flippedCards = [];
let moves_counter = 0 , matches_counter = 0;
cards = [...cards];
let interVal1;

$(document).ready(beginGame());

//starts a fresh game
function beginGame(){

    formatTime();
    //reset previous data
    resetMoves();
    popAllCards();
    
    //setup new deck
    shuffleCards();

    //initialize eventlisteners
    setEventsListeners();


}
function formatTime(){
    document.querySelector("#seconds").innerHTML = "00";
    document.querySelector("#minutes").innerHTML = "00";
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
//setup for event listeners on game creation
function setEventsListeners(){
    //set up event listener for each card
    for (let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', function(e){
            flipCard(e.target);
            addToFlippedCards(e.currentTarget);
            if (flippedCards.length > 1){
                incPlayerMoves();
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

//two cards have matched
function cardsMatched(){
    for (let j = 0; j < flippedCards.length ; j++){
        flippedCards[j].classList.add("match");
        flippedCards[j].classList.remove("show" , "open");
    }
    matches_counter++;
    console.log(matches_counter);
    if (matches_counter == 8){
        gameWon();
    }
    popAllCards();
}
function pauseCardsSelection(){
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.add("paused");
    }
}
function resumeCardsSelection(){
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.remove("paused");
    }
}

function cardsNotMatching(){
    flippedCards[0].classList.add("unmatched");
    flippedCards[1].classList.add("unmatched");
    pauseCardsSelection();
    setTimeout(function(){
        flippedCards[0].classList.remove("show", "open","unmatched");
        flippedCards[1].classList.remove("show", "open","unmatched");
        resumeCardsSelection();
        popAllCards();
    },1300);

}
//flips a card and shows its symbol
function flipCard(card){
    card.classList.add("open", "show", "paused");
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

//Creates the game 'timer'(stopwatch)
function startTimer(){

    let sec = 0;
    function pad(val)
    { 
        return val > 9 ? val : "0" + val; 
    }
    interVal1 = setInterval( function(){
        $("#seconds").html(pad(++sec % 60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}

//Resets moves data
function resetMoves(){
    moves_counter = 0;
}
//empty the open cards list
function popAllCards(){
    flippedCards.length = 0;
}
//Increase moves counter 
function incPlayerMoves(){
    moves_counter++;
    moves.innerHTML = moves_counter;
    if(moves_counter == 1)
    startTimer();

}

//game won, displaying modal info
function gameWon(){
    console.log("game won!");
    clearInterval(interVal1);
    congratsModal.style.display = "block";
}
