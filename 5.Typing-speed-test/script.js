// DOM Elements
const typingArea = document.querySelector("#typingArea");
const textDisplay = document.querySelector("#textDisplay");
const timerDisplay = document.querySelector("#timer");
const wpmDisplay = document.querySelector("#wpm");
const accuracyDisplay = document.querySelector("#accuracy");
const bestWPMDisplay = document.querySelector("#bestWPM");
const encouragement = document.querySelector("#encouragement");
const lastTestDisplay = document.querySelector("#lastTest");
const fastStartDisplay = document.querySelector("#fastStart");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const timeButtons = document.querySelectorAll(".sec");

// Data
const testTexts = [
"The quick brown fox jumps over the lazy dog.",
"Typing fast requires patience and consistent training.",
"Programming teaches logic and accuracy.",
"Practice improves speed, accuracy and confidence."
];

let currentText = "";
let selectedDuration = 60;
let timeLeft = selectedDuration;
let timerInterval = null;
let isTestActive = false;
let startTime = null;
let bestWPM = 0;

// --- NEW VARIABLES (for added features) ---
let hasHit100 = false;
let accuracyPerfectShown = false;
let idleTimer = null;
let firstSpaceTriggered = false;
let fastStartTime = null;

// Load saved scores
function loadData(){
bestWPM = sessionStorage.getItem("bestWPM") || 0;
lastTestDisplay.textContent = sessionStorage.getItem("lastWPM") ? `Last Score: ${sessionStorage.getItem("lastWPM")} WPM` : "";
fastStartDisplay.textContent = sessionStorage.getItem("fastStart") ? `Fastest Start: ${sessionStorage.getItem("fastStart")} ms` : "";
bestWPMDisplay.textContent = bestWPM;
timerDisplay.textContent = selectedDuration;
}
loadData();

// Start Test
function startGame() {
startBtn.disabled = true;
isTestActive = true;
timeLeft = selectedDuration;
typingArea.disabled = false;
typingArea.value = "";
typingArea.focus();

currentText = testTexts[Math.floor(Math.random()*testTexts.length)];
textDisplay.textContent = currentText;

wpmDisplay.textContent = "0";
accuracyDisplay.textContent = "100%";
startTime = null;

timerInterval = setInterval(() => {
timeLeft--;
timerDisplay.textContent = timeLeft;

// 🔥 Feature #6 Time Running Out Warning
if(timeLeft <= 10){
timerDisplay.style.color="red";
} else {
timerDisplay.style.color="#00fff7";
}

if(timeLeft <= 0) endGame();
},1000);
}

// Live check while typing
function wordType() {
if(!isTestActive) return;

// Save the time fast typing started
if(typingArea.value.length === 1){
fastStartTime = Date.now();
}

// Feature: detect fastest 5 characters
if(typingArea.value.length === 5 && fastStartTime){
let diff = Date.now() - fastStartTime;
let fastest = sessionStorage.getItem("fastStart") || Infinity;

if(diff < fastest){
sessionStorage.setItem("fastStart", diff);
fastStartDisplay.textContent = `Fastest Start: ${diff} ms`;
}
}

// Start timer on first key press
if(startTime === null) startTime = Date.now();

updateStatus();
highlight();

// Feature #3 Idle reminder
clearTimeout(idleTimer);
idleTimer = setTimeout(()=>{
encouragement.textContent = "⏳ Keep going — don’t stop!";
},3000);

// Feature #4 Encourage when first space typed
if(!firstSpaceTriggered && typingArea.value.includes(" ")){
firstSpaceTriggered = true;
encouragement.textContent="🔥 Good start!";
setTimeout(()=>encouragement.textContent="",1200);
}
}

// Calculate WPM & accuracy
function updateStatus(){
const typed = typingArea.value;
const elapsedTime = (Date.now() - startTime) / 60000;
const wpm = elapsedTime>0 ? Math.floor(typed.split(/\s+/).length/elapsedTime) : 0;
wpmDisplay.textContent = wpm;

// NEW: Glowing effect if >100 WPM
if(wpm > 100 && !hasHit100){
wpmDisplay.style.color="cyan";
wpmDisplay.style.fontWeight="bold";
hasHit100 = true;
}

// accuracy
let correct=0;
for(let i=0;i<typed.length;i++){
if(typed[i]===currentText[i]) correct++;
}
let accuracy = typed.length>0 ? Math.floor((correct/typed.length)*100) : 0;
accuracyDisplay.textContent = accuracy+"%";

// NEW: Perfect accuracy effect
if(accuracy === 100 && !accuracyPerfectShown){
accuracyPerfectShown = true;
accuracyDisplay.style.color="lime";
}
}

// Highlight typed text
function highlight(){
const typed = typingArea.value;
let result = "";

for(let i=0;i<currentText.length;i++){
if(i< typed.length){
result+= typed[i]===currentText[i]
? `<span class='correct'>${currentText[i]}</span>`
: `<span class='incorrect'>${currentText[i]}</span>`;
} else result+= currentText[i];
}
textDisplay.innerHTML = result;
}

// End Test
function endGame(){
clearInterval(timerInterval);
isTestActive=false;
typingArea.disabled=true;
startBtn.disabled=false;

// Save result
const finalWPM = parseInt(wpmDisplay.textContent);
sessionStorage.setItem("lastWPM", finalWPM);
lastTestDisplay.textContent=`Last Score: ${finalWPM} WPM`;

if(finalWPM > bestWPM){
bestWPM = finalWPM;
bestWPMDisplay.textContent = bestWPM;
sessionStorage.setItem("bestWPM", bestWPM);

// 🎉 Highlight new record
bestWPMDisplay.style.color="gold";
setTimeout(()=>bestWPMDisplay.style.color="#00fff7",1500);
}
}

// Reset
resetBtn.addEventListener("click",()=>{
sessionStorage.clear();
location.reload();
});

// Events
typingArea.addEventListener("input",wordType);
startBtn.addEventListener("click",startGame);

timeButtons.forEach(btn=>{
btn.addEventListener("click",()=>{
selectedDuration = parseInt(btn.textContent);
timeLeft = selectedDuration;
timerDisplay.textContent=timeLeft;
timeButtons.forEach(b=>b.style.opacity=0.5);
btn.style.opacity=1;
});
});