
// selectors
const moves = document.querySelector(".moves");
const restartButton = document.querySelector(".restart");
let cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let gameOver_popup = document.querySelector("#congratsModal"); 
let stars = document.querySelectorAll(".fa-star");


//vars
let flippedCards = [];
let moves_counter = 0 , matches_counter = 0;
cards = [...cards];
let interVal1;
let gameWon = false;

$(document).ready(beginGame());

//starts a fresh game
function beginGame(){

    //reset previous data
    resetMoves();
    popAllCards();
    formatStarRatings();
    formatTime();
    //setup new deck
    shuffleCards();
    //initialize eventlisteners
    setEventsListeners();


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
    if (matches_counter == 8){
        gameWon = true;
        gameOver();
    }
    popAllCards();
}
//cards selected didn't match, handle and show animation
function cardsNotMatching(){
    flippedCards[0].classList.add("unmatched");
    flippedCards[1].classList.add("unmatched");
    pauseCardsSelection();
    setTimeout(function(){
        flippedCards[0].classList.remove("show", "open","unmatched");
        flippedCards[1].classList.remove("show", "open","unmatched");
        resumeCardsSelection();
        popAllCards();
    },900);

}
/*pause selection for *all* cards on the deck
* so cardsNotMatching() could finish its flow
* without the user selecting another card in
* the middle
*/ 
function pauseCardsSelection(){
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.add("paused");
    }
}
/*resumes selection functionality for *all* 
* cards on the deck as the animation for 
* the set that didn't match finished
*/ 
function resumeCardsSelection(){
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.remove("paused");
    }
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

//timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
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
function formatStarRatings(){
    for (let i = 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
    }
}
function formatTime(){
    document.querySelector("#seconds").innerHTML = "00";
    document.querySelector("#minutes").innerHTML = "00";
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

    if(moves_counter == 1){
    startTimer();
    }
    if(moves_counter >=9 && moves_counter <= 12){
        stars[2].style.color = "#000000";
    }
    if(moves_counter >=13 && moves_counter <= 15){
        stars[1].style.color = "#000000";
    }
    if(moves_counter >=16 && moves_counter <= 18){
        stars[0].style.color = "#000000";
    }
    if(moves_counter > 19){
        gameWon = false;
        gameOver();
    }

}

//game won, displaying modal info
function gameOver(){
    let modal = document.getElementById('congratsModal');
    let modalStats = document.querySelector(".modalStats");
    let modalHeader = document.querySelector(".modalHeader");
    let modalClose = document.querySelector(".modalClose");
    modalClose.addEventListener('click', function(){
        pauseCardsSelection();
        modal.style.display = "none";
    })
    if (gameWon){
        modalHeader.innerHTML = "YOU WON!!!!!!";
    }
    else {
        modalHeader.innerHTML = "Shame, try again?";
    }
    gameStats(modalStats); 
    clearInterval(interVal1);

    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            pauseCardsSelection();
            modal.style.display = "none";
        }
    }
}
//prints the game statistics
function gameStats(modalStats){
    modalStats.innerHTML = "Your time: " +
    document.querySelector("#minutes").innerHTML +
    " Minutes and " +
     document.querySelector("#seconds").innerHTML +
     " Seconds. " +
    " Total number of moves : " + moves_counter;    
}
