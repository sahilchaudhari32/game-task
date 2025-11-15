// DOM Elements
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');

let colors = [];
let correctColor = '';
let currentStreak = 0;
let bestStreak = 0;
let numColors = 6;

function init() {
    loadBestStreak();
    setupGame();
    updateStreakDisplay();
}

function loadBestStreak() {
    const saved = localStorage.getItem('colorGameBestStreak');
    bestStreak = saved ? parseInt(saved) : 0;
}

function saveBestStreak() {
    localStorage.setItem('colorGameBestStreak', bestStreak);
}

function resetBestStreak() {
    const confirmed = confirm('Are you sure you want to reset your best streak?');
    if (confirmed) {
        bestStreak = 0;
        currentStreak = 0;
        localStorage.removeItem('colorGameBestStreak');
        updateStreakDisplay();
        messageDisplay.innerText = 'Streak reset! Start fresh!';
    }
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateColors(num) {
    const arr = [];
    for (let i = 0; i < num; i++) arr.push(generateRandomColor());
    return arr;
}

function pickCorrectColor() {
    const idx = Math.floor(Math.random() * colors.length);
    return colors[idx];
}

function setupGame() {
    colors = generateColors(numColors);
    correctColor = pickCorrectColor();

    colorDisplay.innerText = correctColor.toUpperCase();
    messageDisplay.innerText = 'Pick a color!';
    messageDisplay.style.color = 'white';

    colorBoxes.forEach((box, index) => {
        box.classList.remove('shake');  
        box.style.border = 'none';      
        if (index < numColors) {
            box.style.display = 'block';
            box.style.backgroundColor = colors[index];
            box.classList.remove('fade');
        } else {
            box.style.display = 'none';
        }
    });
}

function handleColorClick(event) {
    const clickedBox = event.target;
    const clickedColor = clickedBox.style.backgroundColor;

    if (clickedColor === correctColor) {
        handleCorrectGuess(clickedBox);
    } else {
        handleWrongGuess(clickedBox);
    }
}

function handleCorrectGuess(clickedBox) {

    clickedBox.style.border = '5px solid yellow';
    currentStreak++;

    if (currentStreak === 1) {
        messageDisplay.innerText = '🔥 First Win!';
        messageDisplay.style.color = 'lightgreen';
    }

    else if (currentStreak >= 3) {
        messageDisplay.innerText = '⚡ STREAK!';
        messageDisplay.style.color = 'lightgreen';
    }

    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        saveBestStreak();

        messageDisplay.innerText = '🎉 NEW BEST STREAK! 🎉';
        messageDisplay.style.color = '#4ECDC4';

        colorDisplay.style.fontWeight = 'bold';
    }

    colorBoxes.forEach(box => {
        box.style.backgroundColor = correctColor;
    });

    document.querySelector('header').style.backgroundColor = correctColor;

    updateStreakDisplay();

    newRoundBtn.innerText = 'Next Round';
}

function handleWrongGuess(clickedBox) {

    currentStreak = 0;
    updateStreakDisplay();

    clickedBox.classList.add('fade');
    clickedBox.classList.add('shake');

    messageDisplay.innerText = 'Try Again!';
    messageDisplay.style.color = '#FF6B6B';
}

function updateStreakDisplay() {
    currentStreakDisplay.innerText = currentStreak;
    bestStreakDisplay.innerText = bestStreak;
}

function setEasyMode() {
    numColors = 3;

    easyBtn.style.backgroundColor = 'lightgreen';
    hardBtn.style.backgroundColor = '';

    setupGame();
}

function setHardMode() {
    numColors = 6;

    easyBtn.style.backgroundColor = '';
    hardBtn.style.backgroundColor = 'lightgreen';

    setupGame();
}

colorBoxes.forEach(box => {
    box.addEventListener('click', handleColorClick);
});

newRoundBtn.addEventListener('click', () => {
    setupGame();
    document.querySelector('header').style.backgroundColor = '';
    newRoundBtn.innerText = 'New Round';
});

easyBtn.addEventListener('click', setEasyMode);
hardBtn.addEventListener('click', setHardMode);

resetStreakBtn.addEventListener('click', resetBestStreak);

init();
