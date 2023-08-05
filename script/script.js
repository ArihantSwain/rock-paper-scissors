'use strict';

const moves = new Map();
moves.set("rock", 0)
moves.set("paper", 1)
moves.set("scissors", 2)
const movesToString = ["rock", "paper", "scissors"]
let winCounter = 0
let lossCounter = 0
let round = 0

function computerPlay() {
  return Math.floor(Math.random() * 3)
}

function play() {
  let decision = window.prompt("Welcome! \nIn a game of rock, paper, scissors, you choose option in which: \nscissors beats paper, paper beats rock, rock beats scissors. \n\nThough simple, it can be hard. \nGet ready to play against the ultimate AI...! \n\nEnter your choice for round one of five.")
  let numComputerChoice = computerPlay()
  let numUserChoice = decision.toLowerCase()
  numUserChoice = moves.get(decision.trim())
  if (numUserChoice == undefined) {
    alert("You entered a non-reliable value, round counted as a tie.")
    round++;
    return
  }
  let outcome = checkWinCondition(numUserChoice, numComputerChoice)
  
  round++;
  if (outcome == "won") {
    winCounter++;
  } else if (outcome == "lost") {
    lossCounter++;
  }

  alert("You " + outcome + " round " + round + "! \nComputer Choice: " + movesToString[numComputerChoice] + "\nYour Choice: " + movesToString[numUserChoice] + "\nYou've won " + winCounter + " games and lost " + lossCounter + " games!")
}

function checkWinCondition(user, computer) {
  if (user == 0 && computer == 2) {
    return "won"
  } else if (user == computer) {
    return "tied"
  } else {
    if (user > computer) {
      return "won"
    } else {
      return "lost"
    }
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    play()
  }

  if (winCounter > lossCounter) {
    alert("You beat the ultimate AI!")
  } else if (winCounter < lossCounter) {
    let tryAgain = window.prompt("You lost to the AI... try again?")
    if (tryAgain.toLowerCase() == "yes") {
      lossCounter = 0
      winCounter = 0
      round = 0
      game()
    }
  } else {
    let tryAgain = window.prompt("You tied to the AI... try again?")
    if (tryAgain.trim().toLowerCase() == "yes") {
      lossCounter = 0
      winCounter = 0
      round = 0
      game()
    }
  }
}

game()