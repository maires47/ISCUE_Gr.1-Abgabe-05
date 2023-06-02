'use strict';

let words = [
  'hangman',
  'javascript',
  'programming',
  'openai',
  'hagenberg',
  'computer',
  'javascript',
  'html',
  'css',
  'algorithm',
  'network',
  'database',
  'software',
  'cybersecurity',
  'artificialintelligence',
  'datascience',
  'frontend',
  'backend',
  'webdevelopment',
  'informatics',
  'python',
];

let randomWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord = '';
let attempts = 0;
let canvas = document.querySelector('#hangmanCanvas');
let ctx = canvas.getContext('2d');

let hangmanParts = [
  function () { ctx.beginPath(); ctx.moveTo(50, 350); ctx.lineTo(150, 350); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(100, 350); ctx.lineTo(100, 50); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(100, 50); ctx.lineTo(250, 50); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(250, 50); ctx.lineTo(250, 100); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.arc(250, 130, 30, 0, Math.PI * 2); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(250, 160); ctx.lineTo(250, 270); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(250, 190); ctx.lineTo(200, 150); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(250, 190); ctx.lineTo(300, 150); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(250, 270); ctx.lineTo(200, 320); ctx.stroke(); },
  function () { ctx.beginPath(); ctx.moveTo(250, 270); ctx.lineTo(300, 320); ctx.stroke(); }
];

document.addEventListener("DOMContentLoaded", function() {
  const guessButton = document.querySelector(".checkGuess");
  guessButton.addEventListener("click", checkGuess);

  const hintButton = document.querySelector(".getHint");
  hintButton.addEventListener("click", getHint);
});

function startGame() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  hiddenWord = "";
  for (let i = 0; i < randomWord.length; i++) {
    hiddenWord += "_";
  }
  let wordElement = document.getElementById("word");
  wordElement.innerHTML = hiddenWord;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkGuess() {
  let guess = document.getElementById('guessInput').value.toLowerCase();
  let result = document.getElementById("result");
  let correctGuess = false;
  let newHiddenWord = "";

  if (hiddenWord.includes(guess)) {
    result.innerHTML = "You already guessed that letter!";
    return;
  }

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === guess) {
      newHiddenWord += guess;
      correctGuess = true;
    } else {
      newHiddenWord += hiddenWord[i];
    }
  }

  hiddenWord = newHiddenWord;

  if (hiddenWord === randomWord) {
    result.innerHTML = "Congratulations! You guessed the word: " + randomWord;
    document.getElementById('guessInput').disabled = true;
  
  } else {
    document.getElementById("word").innerHTML = hiddenWord;
    document.getElementById('guessInput').value = "";

    if (!correctGuess) {
      drawHangman();
      attempts++;

      if (attempts === hangmanParts.length) {
        result.innerHTML = "Game over! The word was: " + randomWord;
        document.getElementById('guessInput').disabled = true;
      }
    }
  }
}

function drawHangman() {
  hangmanParts[attempts]();
}

function newGame() {
  document.getElementById('guessInput').disabled = false;
  document.getElementById('result').innerHTML = "";
  attempts = 0;
  startGame();
}

let hintGiven = false;

document.addEventListener("DOMContentLoaded", function() {
  const hintButton = document.querySelector(".getHint");
  hintButton.addEventListener("click", getHint);
});

function getHint() {
  if (hintGiven) {
    return;
  }

  let lettersLeft = [];
  for (let i = 0; i < hiddenWord.length; i++) {
    if (hiddenWord[i] === "_") {
      lettersLeft.push(randomWord[i]);
    }
  }

  let randomIndex = Math.floor(Math.random() * lettersLeft.length);
  let randomLetter = lettersLeft[randomIndex];

  let hintElement = document.querySelector(".getHint");
  hintElement.innerHTML = `Hint: The word contains the letter "${randomLetter}"`;

  hintGiven = true;
  document.querySelector(".getHint").disabled = true;
}

startGame();
