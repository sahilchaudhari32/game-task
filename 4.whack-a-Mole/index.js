var player = prompt("Enter Your name");
const p = document.querySelector('.name');
p.textContent = player;

// DOM Elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

const msg = document.querySelector('#msg');  
const hitsDisplay = document.querySelector('#hits');
const lastGameDisplay = document.querySelector('#lastGame');
const fastestDisplay = document.querySelector('#fastest');

let score = 0;
let hits = 0;
let time = 30;
let bestScore = 0;
let playGame = false;
let gameId = null;
let pause = false;

let moleStartTime = 0;

function webLoad() {
  onLoad();
  displayContent();
  loadLastGameScore();
  loadFastestHit();
}

function onLoad() {
  const temp = localStorage.getItem('highScoreMole');
  bestScore = temp ? parseInt(temp) : 0;
}

function displayContent() {
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = time;
  maxScoreDisplay.textContent = bestScore;
  hitsDisplay.textContent = `Hits: ${hits}`;
}

function loadLastGameScore() {
  const last = sessionStorage.getItem("lastScore");
  lastGameDisplay.textContent = last ? `Last Game: ${last}` : "Last Game: None";
}

function loadFastestHit() {
  const fast = sessionStorage.getItem("fastestHit");
  fastestDisplay.textContent = fast ? `Fastest Hit: ${fast}ms` : "Fastest Hit: None";
}

function endGame() {
  clearInterval(gameId);
  playGame = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;

  startBtn.textContent = "Play Again";   

  sessionStorage.setItem("lastScore", score);
  loadLastGameScore();

  const bgVideo = document.querySelector('#bg-video');

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('highScoreMole', bestScore);

    //Glow Best Score
    maxScoreDisplay.style.textShadow = "0 0 20px yellow";
    setTimeout(() => {
      maxScoreDisplay.style.textShadow = "none";
    }, 1000);

    alert(`🎉 New High Score! You scored: ${score}`);

    bgVideo.classList.add('show');

    setTimeout(() => {
      bgVideo.classList.remove('show');
    }, 10000);
  } else {
    alert(`Your current score: ${score}`);
  }

  displayContent();
}

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function popGame() {
  if (!playGame || pause) return;

  let min = time < 10 ? 300 : 500;
  let max = time < 10 ? 800 : 1500;

  const timer = randomTime(min, max);
  const hole = randomHole();
  const mole = hole.querySelector('.mole');

  moleStartTime = Date.now(); 

  mole.classList.add('up');

  setTimeout(() => {
    mole.classList.remove('up');
    if (playGame && !pause) popGame();
  }, timer);
}

function startGame() {
  time = 30;
  score = 0;
  hits = 0;
  playGame = true;
  pause = false;

  startBtn.disabled = true;
  resetBtn.disabled = true;
  pauseBtn.disabled = false;
  pauseBtn.textContent = "Pause Game";

  sessionStorage.removeItem("lastScore");
  loadLastGameScore();

  displayContent();
  popGame();

  gameId = setInterval(() => {
    if (!pause) {
      time--;
      displayContent();

      if (time <= 0) endGame();
    }
  }, 1000);
}

function resetGame() {
  score = 0;
  hits = 0;
  bestScore = 0;
  localStorage.removeItem('highScoreMole');
  time = 30;
  displayContent();
  alert("Game has been reset!");
}

function bonk(event) {
  if (!event.isTrusted) return;

  if (event.target.classList.contains('up')) {
    event.target.classList.remove('up');
    event.target.classList.add('bonked');

    score++;
    hits++;

    if (score > 50) scoreDisplay.style.color = "gold";

    displayContent();

    msg.textContent = "Whack!";
    msg.style.opacity = 1;
    setTimeout(() => (msg.style.opacity = 0), 300);

    let timeTaken = Date.now() - moleStartTime;
    let fastest = sessionStorage.getItem("fastestHit");
    if (!fastest || timeTaken < fastest) {
      sessionStorage.setItem("fastestHit", timeTaken);
      loadFastestHit();
    }

    setTimeout(() => {
      event.target.classList.remove('bonked');
    }, 300);
  }
}

function pauseGame() {
  if (!playGame) return;

  if (!pause) {
    pause = true;
    pauseBtn.textContent = "Resume Game";
  } else {
    pause = false;
    pauseBtn.textContent = "Pause Game";
    popGame();
  }
}

webLoad();
moles.forEach((box) => box.addEventListener('click', bonk));

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
pauseBtn.addEventListener('click', pauseGame);
