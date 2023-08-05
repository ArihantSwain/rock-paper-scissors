// map and array to create the equivalent of a bi-dirctional map
const moves = new Map();
moves.set("rock", 0)
moves.set("paper", 1)
moves.set("scissors", 2)
const movesToString = ["rock", "paper", "scissors"]
let winCounter = 0
let lossCounter = 0
let round = 0

// base alert to start game
alert("Welcome! \nIn a game of rock, paper, scissors, you choose an option in which: \nscissors beats paper, paper beats rock, rock beats scissors. \n\nThough simple, it can be hard. \n\nGet ready to play against the ultimate AI!")

// calculates computer choice by assigning number 0-2
function computerPlay() {
  return Math.floor(Math.random() * 3)
}

// retry function for future promptings
function retry(tryAgain) {
  if (tryAgain.trim().toLowerCase() == "yes") {
    lossCounter = 0
    winCounter = 0
    round = 0
    return true
  }
  return false
}

function avoidNull(userInput) {
  if (userInput == null) { // edge case--user clicks cancel
    return true
  }
}

function play() {
  let decision = window.prompt("Enter your choice for round " + (round+1) + " of 5: \nrock, paper, or scissors?")
  
  if (avoidNull(decision)) {
    let checkQuit = window.prompt("You chose to quit. Do you want to continue?")
    retry(checkQuit)
    return "quit"
  }

  let numComputerChoice = computerPlay()
  let numUserChoice = moves.get(decision.trim().toLowerCase())
  console.log(numUserChoice)
  
  while (numUserChoice == undefined) { // edge case--string entered other than rock, paper, or scissors
    console.log("enter")
    numUserChoice = window.prompt("You entered a non-reliable value, enter a different value")
    if (avoidNull(numUserChoice)) {
      return "quit"
    }
    console.log("here")
    numUserChoice = moves.get(numUserChoice.trim().toLowerCase())
  }

  let outcome = checkWinCondition(numUserChoice, numComputerChoice)
  
  // increment counters
  round++;
  if (outcome == "won") {
    winCounter++;
  } else if (outcome == "lost") {
    lossCounter++;
  }

  alert("You " + outcome + " round " + round + "! \nComputer Choice: " + movesToString[numComputerChoice] + "\nYour Choice: " + movesToString[numUserChoice] + "\nYou've won " + winCounter + " game(s) and lost " + lossCounter + " game(s)!")
}

// win condition is based on greater than less than logic unless specific case (user rock, computer scissors)
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
    let condition = play()
    if (condition == "quit") {
      return
    }
  }

  if (winCounter > lossCounter) {
    let tryAgain = window.prompt("You beat the ultimate AI... beat it again?")
    if (retry(tryAgain)) {
      game()
    }
    else {
      alert("Good job beating the ultimate AI!")
    }
  } else if (winCounter < lossCounter) {
    let tryAgain = window.prompt("You lost to the AI... try again?")
    if (retry(tryAgain)) {
      game()
    }
    else {
      alert("A tie is nothing to scoff at, good work!")
    }
  } else {
    let tryAgain = window.prompt("You tied to the AI... try again?")
    if (retry(tryAgain)) {
      game()
    }
    else {
      alert("Maybe you can win another time...")
    }
  }
}

game()