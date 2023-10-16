let player = {
    name: 'per',
    chips: 145, 
    // sayHello: function() {
    //     console.log('heisann!')
    // }   
}

// player.sayHello()

let cards = []
let sum = 0;
let hasBlackJack = false;
let isAlive = false ;
let message = " ";
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
//let sumEl = document.querySelector('#sum-el');
let cardsEl = document.getElementById('cards-el');


let playerEl = document.getElementById('player-el');
playerEl.textContent = player.name + ': $'+player.chips 


function getRandomCard() {
    let randomCard = Math.floor( Math.random() *13) + 1;
    if (randomCard === 1){
        return 11
    }else if (randomCard > 10){
        return 10
    }else{
    return randomCard        
    }
}
let startGame = function(){
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame()
}
let renderGame = function() {
    cardsEl.textContent = 'cards:'
    for (let i = 0; i < cards.length; i++ ){
        cardsEl.textContent += cards[i] + ' ';
    }
    sumEl.textContent = 'Sum:' + sum;
    if (sum < 20) {
    message = "Do you want to draw a new card?";
    } else if (sum === 21){
    message = "you've won the blackjack! ";
    hasBlackJack = true;
    } else {
    message = "you've out of the game! ";
    isAlive = false;
    }
    //console.log(message);
    messageEl.textContent = message;
};
//console.log(hasBlackJack);
//console.log(isAlive);

let newCard = function() {
    if (isAlive === true && hasBlackJack === false){
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
    }
};

