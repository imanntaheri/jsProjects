const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK} , ${PAPER} OR ${SCISSORS} ?`, '').toUpperCase();
  if (selection !== ROCK &&
    selection !== PAPER &&
    selection !== SCISSORS) {
    alert(`Invalid choice! we choice ${DEFAULT_USER_CHOICE} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

// IT IS THE SAME WAY TO DECLEAR THE FUNCTION WITHOUT {} AND FUNCTION KEYWORD
const getWinner = (pChoice, cChoice) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;


// const getWinner = function(pChoice , cChoice){
//     if(pChoice === cChoice){
//         return RESULT_DRAW
//     } else if(
//         cChoice === ROCK && pChoice === PAPER ||
//         cChoice === PAPER && pChoice === SCISSORS ||
//         cChoice === SCISSORS && pChoice === ROCK
//     ){
//         return RESULT_PLAYER_WINS;
//     } else {
//         return RESULT_COMPUTER_WINS;
//     }
// };

startGameBtn.addEventListener('click', function () {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if (playerChoice){
    winner = getWinner(playerChoice, computerChoice);
  }else{
    winner = getWinner(computerChoice);
  }
  let message = `You picked ${playerChoice || DEFAULT_USER_CHOICE} , and coputer picked ${computerChoice} , so therefore You `
  if(winner === RESULT_DRAW){
    message = message + 'had a draw.';
  }else if (winner === RESULT_PLAYER_WINS) {
    message = message + 'won!';
  } else {
    message = message + 'lost!';
  }
  alert(message);
  gameIsRunning = false;
});

