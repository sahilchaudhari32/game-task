var player = prompt("Enter Your Name");

// Elements
const scoreDisplay = document.getElementById("score");
const hitsDisplay = document.getElementById("hits");
const maxScoreDisplay = document.getElementById("maxScore");
const lastGameDisplay = document.getElementById("lastGame");
const fastHitDisplay = document.getElementById("fastHit");
const timeLeftDisplay = document.getElementById("timeLeft");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const pauseBtn = document.getElementById("pauseBtn");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const whackMsg = document.getElementById("whackMsg");

// Variables
let score = 0;
let hits = 0;
let time = 30;
let bestScore = 0;
let playGame = false;
let pause = false;
let moleStartTime = 0;
let gameLoop;

function loadData() {
    bestScore = localStorage.getItem("highScoreMole") || 0;
    maxScoreDisplay.textContent = bestScore;

    let last = sessionStorage.getItem("lastScore");
    if(last) lastGameDisplay.textContent = "Last Game Score: " + last;

    let fastest = sessionStorage.getItem("fastestHit");
    if(fastest) fastHitDisplay.textContent = "Fastest Hit: " + fastest + "ms";
}

function randomTime(min, max) {
    return Math.random() * (max - min) + min;
}

function randomHole() {
    return holes[Math.floor(Math.random() * holes.length)];
}

function popMole() {
    if (!playGame || pause) return;

    let speed = time < 10 ? randomTime(300, 800) : randomTime(800, 1500);

    const hole = randomHole();
    const mole = hole.querySelector(".mole");

    mole.classList.add("up");
    moleStartTime = Date.now();

    setTimeout(() => {
        mole.classList.remove("up");
        if (playGame && !pause) popMole();
    }, speed);
}

function startGame() {
    score = 0;
    hits = 0;
    time = 30;
    playGame = true;
    pause = false;

    scoreDisplay.textContent = score;
    hitsDisplay.textContent = hits;
    timeLeftDisplay.textContent = time;
    startBtn.textContent = "Playing...";
    pauseBtn.disabled = false;

    popMole();

    gameLoop = setInterval(() => {
        if (!pause) {
            time--;
            timeLeftDisplay.textContent = time;
            if (time <= 0) endGame();
        }
    }, 1000);
}

function endGame() {
    playGame = false;
    clearInterval(gameLoop);

    sessionStorage.setItem("lastScore", score);

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("highScoreMole", bestScore);

        maxScoreDisplay.classList.add("glow");

        setTimeout(() => maxScoreDisplay.classList.remove("glow"), 1000);

        alert("🎉 New Record! Score: " + score);
    } else {
        alert("Game Over! Score: " + score);
    }

    lastGameDisplay.textContent = "Last Game Score: " + score;
    maxScoreDisplay.textContent = bestScore;

    startBtn.textContent = "Play Again";
}

function resetGame() {
    localStorage.removeItem("highScoreMole");
    sessionStorage.clear();
    bestScore = 0;
    score = 0;
    hits = 0;
    lastGameDisplay.textContent = "";
    fastHitDisplay.textContent = "";
    maxScoreDisplay.textContent = 0;
    scoreDisplay.textContent = 0;
    hitsDisplay.textContent = 0;
    alert("Game Reset!");
}

function bonk(e) {
    if (!e.isTrusted || !e.target.classList.contains("up")) return;

    e.target.classList.remove("up");

    hits++;
    hitsDisplay.textContent = hits;

    score++;
    scoreDisplay.textContent = score;

    if(score > 50) scoreDisplay.style.color = "gold";

    whackMsg.style.opacity = 1;
    setTimeout(()=> whackMsg.style.opacity = 0, 300);

    let hitTime = Date.now() - moleStartTime;
    let fastest = sessionStorage.getItem("fastestHit") || Infinity;

    if(hitTime < fastest){
        sessionStorage.setItem("fastestHit", hitTime);
        fastHitDisplay.textContent = "Fastest Hit: " + hitTime + "ms";
    }
}

function pauseGame() {
    pause = !pause;
    pauseBtn.textContent = pause ? "Resume Game" : "Pause Game";

    if (!pause && playGame) popMole();
}

loadData();
moles.forEach(m => m.addEventListener("click", bonk));

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", pauseGame);