// global constants
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = []; // To store generated computer pattern
var rounds = 8; // Number of rounds the user will play
var progress = 0; // Number of rounds the user has beaten
var gamePlaying = false; // Whether or not the game is being played
var currentClueIndex = 0; // Current clue the game is playing
var guessCounter = 0; // Number of guesses the player has gotten right
var clueHoldTime = 1000; // How long each clue plays for
var cluePauseTime = 333; //how long to pause in between clues
var defaultStrikes = 3; // Number of strikes
var strikes = 3; // Number of mistakes the user can make
var timerFunctionTimeout = setTimeout(() => {}, 0);
var decrementTimerTimeout = setTimeout(() => {}, 0);
var timerFunctionInterval = setInterval(() => {}, 0);
var decrementTimerFunctionInterval = setInterval(() => {}, 0);
var gameNumber = 1; // Number of games the user has played

// Sets number of strikes
const setStrikes = () => {
  const numStrikes = parseInt(
    document.getElementById("strikes-input").value,
    10
  );
  if (numStrikes >= 1) {
    defaultStrikes = numStrikes;
  } else {
    alert("Number of strikes must be >= 1");
  }
};

// Sets number of rounds
const setNumRounds = () => {
  const numRounds = parseInt(document.getElementById("rounds-input").value, 10);
  if (numRounds >= 1) {
    rounds = numRounds;
  } else {
    alert("Number of rounds must be >= 1");
  }
};

// Start button is pressed
const startGame = () => {
  strikes = defaultStrikes;
  pattern = [];
  for (let i = 0; i < rounds; i++) {
    pattern.push(Math.floor(Math.random() * 6 + 1)); // 1 <= pattern[i] <= 6
  }
  clueHoldTime = 1000;
  cluePauseTime = 333;
  progress = 0;
  gamePlaying = true;
  document.getElementById("startButton").classList.add("hidden");
  document.getElementById("stopButton").classList.remove("hidden");
  playClueSequence();
};

// Stop button is pressed
const stopGame = () => {
  const table = document.getElementById("match-history");
  const row = table.insertRow(1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  cell1.innerHTML = gameNumber++;
  cell2.innerHTML = `${progress}/${rounds}`;
  document.getElementById("timer").textContent = 10; // Reset timer to 10
  clearInterval(timerFunctionInterval);
  clearInterval(decrementTimerFunctionInterval);
  clearTimeout(timerFunctionTimeout);
  clearTimeout(decrementTimerTimeout);
  progress = 0;
  gamePlaying = false;
  document.getElementById("startButton").classList.remove("hidden");
  document.getElementById("stopButton").classList.add("hidden");
};

// User loses game
const loseGame = () => {
  stopGame();
  alert("Game over. You lost.");
};

// User wins game
const winGame = () => {
  stopGame();
  alert("Game over. You won!");
};

// Sets the interval for user to lose game after 10 seconds
const handleTimeCountdown = () => {
  timerFunctionInterval = setInterval(loseGame, 10000);
};

// Sets the interval for timer countdown
const handleDecrementTimer = () => {
  decrementTimerFunctionInterval = setInterval(
    () =>
      (document.getElementById("timer").textContent =
        parseInt(document.getElementById("timer").textContent, 10) - 1),
    1000
  );
};

// Handles user guess
const guess = btn => {
  if (gamePlaying) {
    if (btn != pattern[guessCounter] && strikes === 1) {
      loseGame();
    } else if (btn != pattern[guessCounter] && strikes > 1) {
      alert("Wrong button! Try again!");
      strikes--;
    } else if (guessCounter < progress) {
      guessCounter++;
    } else if (progress < pattern.length - 1) {
      clearInterval(timerFunctionInterval);
      clearInterval(decrementTimerFunctionInterval);
      progress++;
      playClueSequence();
    } else {
      progress++;
      winGame();
    }
  } else {
  }
};

// Plays a single clue (sound)
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playSoundForLength(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

// Plays a sequence of clues according to the current progress
function playClueSequence() {
  document.getElementById("timer").textContent = 10; // Reset timer to 10
  guessCounter = 0;
  clueHoldTime -= 800 / rounds;
  cluePauseTime -= 240 / rounds;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (currentClueIndex = 0; currentClueIndex <= progress; currentClueIndex++) {
    // for each clue that is revealed so far
    console.log(
      "play single clue: " + pattern[currentClueIndex] + " in " + delay + "ms"
    );
    setTimeout(playSingleClue, delay, pattern[currentClueIndex]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
    console.log(currentClueIndex, progress);
  }
  timerFunctionTimeout = setTimeout(handleTimeCountdown, delay); // User loses game 10 seconds after clue sequence plays
  decrementTimerTimeout = setTimeout(handleDecrementTimer, delay); // Countdown begins after clue sequence
}

// Plays a sound
const playSound = id => {
  document.getElementById(`sound${id}`).play();
};

// Plays a sound for a given length of time
const playSoundForLength = (id, length) => {
  document.getElementById(`sound${id}`).play();
  setTimeout(function() {
    stopSound(id);
  }, length);
};

const stopSound = id => {
  document.getElementById(`sound${id}`).pause();
  document.getElementById(`sound${id}`).currentTime = 0;
};

// Computer lights up a button
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

// Computer dims a button
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}
