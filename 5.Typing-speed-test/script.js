// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWPMDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const message = document.querySelector('#resultMessage');
const timeButtons = document.querySelectorAll('.sec');

const lastTestDisplay = document.querySelector('#lastTest');      
const fastStartDisplay = document.querySelector('#fastStart');    
const hintMessage = document.querySelector('#hintMessage');       

const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace.",
    "Coding is not just about syntax; it’s about solving problems creatively and logically Some new are here."
];

let currentText = '';
let timeLeft = 60;
let selectedDuration = 60;
let timerInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;

let noTypeTimer = null;          
let firstSpaceTriggered = false; 
let first5Time = null;           
let fiveCharStart = null;

function webLoad() {
    onLoad();
    displayContent();
    loadLastTestWPM();
    loadFastStart();
}

function onLoad() {
    const temp = sessionStorage.getItem('previousWpm');
    bestWPM = temp ? parseInt(temp) : 0;
}

function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWPMDisplay.textContent = bestWPM;
}

function loadLastTestWPM() {
    const last = sessionStorage.getItem('lastWPM');
    lastTestDisplay.textContent = last ? `Last Test: ${last} WPM` : "Last Test: —";
}

function loadFastStart() {
    const fast = sessionStorage.getItem('fastStart');
    fastStartDisplay.textContent = fast ? `Fastest Start: ${fast}ms` : "Fastest Start: —";
}

webLoad();

function endGame() {
    clearInterval(timerInterval);
    isTestActive = false;
    typingArea.disabled = true;
    startBtn.disabled = false;

    const currentWPM = parseInt(wpmDisplay.textContent) || 0;

    sessionStorage.setItem("lastWPM", currentWPM);
    loadLastTestWPM();

    if (currentWPM > bestWPM) {
        bestWPM = currentWPM;
        sessionStorage.setItem('previousWpm', bestWPM);

        bestWPMDisplay.style.color = "red";
        bestWPMDisplay.style.fontWeight = "bold";
    }

    const typedText = typingArea.value.trim();
    const mainText = currentText.trim();

    let message = "";
    if (typedText.toLowerCase() === mainText.toLowerCase()) {
        message = "Both texts are exactly the same!";
    } else {
        const mainWords = mainText.split(/\s+/);
        const typedWords = typedText.split(/\s+/);
        const commonWords = mainWords.filter(word => typedWords.includes(word));
        message = `Texts are different. ${commonWords.length} out of ${mainWords.length} words match.`;
    }

    let msgDisplay = document.querySelector('#resultMessage');
    if (!msgDisplay) {
        msgDisplay = document.createElement('div');
        msgDisplay.id = 'resultMessage';
        msgDisplay.style.marginTop = '10px';
        msgDisplay.style.fontWeight = 'bold';
        typingArea.parentNode.appendChild(msgDisplay);
    }
    msgDisplay.textContent = message;

    timeLeft = selectedDuration;
    displayContent();
}

function startGame() {
    startBtn.disabled = true;
    isTestActive = true;
    startTime = null;
    timeLeft = selectedDuration;
    firstSpaceTriggered = false;
    fiveCharStart = null;

    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.textContent = currentText;

    typingArea.disabled = false;
    typingArea.value = "";
    typingArea.focus();

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 10) {
            timerDisplay.style.color = "red";
            timerDisplay.style.fontSize = "2.2em";
        } else {
            timerDisplay.style.color = "white";
            timerDisplay.style.fontSize = "1.6em";
        }

        displayContent();
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function updateStatus() {
    const typed = typingArea.value;

    if (startTime == null) startTime = Date.now();

    const elapsedTime = (Date.now() - startTime) / 1000 / 60;

    const words = typed.trim().split(/\s+/).filter(w => w.length > 0);
    const wpm = elapsedTime > 0 ? Math.floor(words.length / elapsedTime) : 0;
    wpmDisplay.textContent = wpm;

    if (wpm > 100) {
        wpmDisplay.style.fontWeight = "bold";
    }

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (currentText[i] === typed[i]) correct++;
    }
    const accuracy = typed.length > 0 ? Math.floor((correct / typed.length) * 100) : 0;
    accuracyDisplay.textContent = accuracy;

    if (accuracy === 100) {
        accuracyDisplay.style.color = "green";
    } else {
        accuracyDisplay.style.color = "white";
    }

    if (typed.length === 1) {
        fiveCharStart = Date.now();
    }

    if (typed.length === 5 && fiveCharStart) {
        const timeTaken = Date.now() - fiveCharStart;
        sessionStorage.setItem('fastStart', timeTaken);
        loadFastStart();
        fiveCharStart = null;
    }
}

function Highlights() {
    const typed = typingArea.value;
    let highlightText = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {
            if (currentText[i] === typed[i]) {
                highlightText += `<span class="correct">${currentText[i]}</span>`;
            } else {
                highlightText += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            highlightText += currentText[i];
        }
    }

    textDisplay.innerHTML = highlightText;
}

function wordType() {
    if (!isTestActive) return;

    const typed = typingArea.value;

    clearTimeout(noTypeTimer);

    noTypeTimer = setTimeout(() => {
        hintMessage.textContent = "Keep typing!";
        hintMessage.style.color = "blue";
        hintMessage.style.opacity = 1;
        setTimeout(() => hintMessage.style.opacity = 0, 800);
    }, 3000);

    if (!firstSpaceTriggered && typed.includes(" ")) {
        firstSpaceTriggered = true;
        wpmDisplay.style.fontWeight = "bold";
        setTimeout(() => wpmDisplay.style.fontWeight = "normal", 300);
    }

    updateStatus();
    Highlights();
}

startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    bestWPM = 0;
    isTestActive = false;
    startBtn.disabled = false;
    typingArea.disabled = true;
    typingArea.value = '';
    textDisplay.textContent = 'Click "Start Test" to begin typing!';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timeLeft = selectedDuration;
    displayContent();

    if (message) message.remove();
});

timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedDuration = parseInt(btn.textContent);
        timeLeft = selectedDuration;
        displayContent();

        timeButtons.forEach(b => (b.style.opacity = 0.6));
        btn.style.opacity = 1;
    });
});
