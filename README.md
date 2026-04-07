
<div align="center">

# 🎮 JavaScript Mini Games Collection

### *7 hand-crafted browser games — built with pure HTML, CSS & JavaScript*

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-FF6B6B?style=for-the-badge&logo=databricks&logoColor=white)](#)
[![No Frameworks](https://img.shields.io/badge/No%20Frameworks-00C49A?style=for-the-badge&logo=checkmarx&logoColor=white)](#)

<br/>

> **A collection of 7 fun, interactive mini-games — each crafted from scratch using vanilla JavaScript.  
> No libraries, no frameworks, just pure web fundamentals.**

<br/>

![Games Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Game%20Collection&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=32&desc=7%20Games%20%7C%20Pure%20JS%20%7C%20No%20Frameworks&descAlignY=55&descAlign=50)

</div>

---

## 📋 Table of Contents

- [🕹️ Games Overview](#-games-overview)
- [🎯 Game Details](#-game-details)
  - [1. Tic-Tac-Toe](#1--tic-tac-toe)
  - [2. Click Counter](#2--click-counter)
  - [3. Color Guessing Game](#3--color-guessing-game)
  - [4. Whack-a-Mole](#4--whack-a-mole)
  - [5. Typing Speed Test](#5--typing-speed-test)
  - [6. Memory Flip Card](#6--memory-flip-card)
  - [7. Todo Game](#7--todo-game)
- [🚀 Getting Started](#-getting-started)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Core JavaScript Concepts Used](#️-core-javascript-concepts-used)
- [🔧 Features Across All Games](#-features-across-all-games)
- [💡 What Can Be Added Next](#-what-can-be-added-next)
- [👨‍💻 Author](#-author)

---

## 🕹️ Games Overview

| # | Game | Difficulty | Key Skill | localStorage | sessionStorage |
|---|------|-----------|-----------|:------------:|:--------------:|
| 1 | 🎯 Tic-Tac-Toe | ⭐ Beginner | 2-Player Logic | ❌ | ❌ |
| 2 | 🖱️ Click Counter | ⭐⭐ Easy | Timer + Score Tracking | ✅ | ❌ |
| 3 | 🎨 Color Guessing | ⭐⭐ Easy | RGB Logic + Streaks | ✅ | ❌ |
| 4 | 🔨 Whack-a-Mole | ⭐⭐⭐ Medium | Timing + Reaction | ✅ | ✅ |
| 5 | ⌨️ Typing Speed Test | ⭐⭐⭐ Medium | WPM + Accuracy Calc | ❌ | ✅ |
| 6 | 🃏 Memory Flip Card | ⭐⭐⭐ Medium | Card Matching + Memory | ✅ | ❌ |
| 7 | ✅ Todo Game | ⭐⭐ Easy | CRUD + DOM Manipulation | ❌ | ❌ |

---

## 🎯 Game Details

### 1. 🎯 Tic-Tac-Toe

> *The classic 3×3 board game — first to align three wins!*

```
📁 1.3x3-Tic-Tac_toe/
 ├── index.html
 ├── style.css
 └── index.js
```

**✨ Features:**
- 🔵 2-player local multiplayer (Player O vs Player X)
- 🏆 Auto-detects all 8 winning combinations (rows, columns, diagonals)
- ♻️ Board resets automatically on win
- 🔒 Cells disable after being clicked — no cheating!
- ⚡ Zero-dependency, fully vanilla JS

**🧠 How It Works:**
The game checks all 8 possible win patterns stored in a 2D array after every move. When a match is detected, all cells are cleared and re-enabled for a new round.

**🎮 Win Conditions Detected:**

```js
const winner = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]            // diagonals
];
```

---

### 2. 🖱️ Click Counter

> *How many times can YOU click in 10 seconds?*

```
📁 2.click.counter/
 ├── index.html
 ├── style.css
 └── index.js
```

**✨ Features:**
- 👤 **Player name prompt** on load using `prompt()` + stored in `localStorage`
- ⏱️ **10-second countdown timer** using `setInterval`
- 🏆 **Persistent High Score** saved with `localStorage`
- ⏸️ **Pause / Resume** toggle mid-game
- 🔄 **Reset All** — clears high score and starts fresh
- 🎉 **Win video animation** plays on new high score
- 🌟 Screen flashes gold on game end
- 📊 Calculates **clicks per second (CPS)** at game end
- 🔴 Score text turns red when you cross 20 clicks

**🧠 Game Flow:**

```
Prompt Name → Save to localStorage → Start Timer → Click Frenzy!
→ Timer hits 0 → Calculate CPS → Compare vs High Score
→ If New Record: Play Win Video 🎬 + Alert 🎉
```

---

### 3. 🎨 Color Guessing Game

> *An RGB color code is shown — guess the right color swatch!*

```
📁 3.Color-Guessing-Game/
 ├── index.html
 ├── style.css
 └── index.js
```

**✨ Features:**
- 🎨 Displays a **random RGB color code** — player must identify the matching swatch
- 🟢 **Easy Mode** — 3 color choices
- 🔴 **Hard Mode** — 6 color choices
- 🔥 **Streak System** — consecutive correct guesses build a streak
- 🏅 **Best Streak** saved in `localStorage` across sessions
- 💫 **Shake animation** on wrong guess
- ✨ **Fade animation** when a wrong color box is eliminated
- 🎉 Dynamic messages: `"🔥 First Win!"`, `"⚡ STREAK!"`, `"🎉 NEW BEST STREAK!"`
- 🌈 Header background **syncs to the correct color** on a correct guess

**🧠 Color Generation Logic:**

```js
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
```

---

### 4. 🔨 Whack-a-Mole

> *Moles pop up — smash them before they disappear! Beat the clock.*

```
📁 4.whack-a-Mole/
 ├── index.html
 ├── style.css
 └── index.js
```

**✨ Features:**
- 👤 **Player name entry** via `prompt()` at game start
- ⏱️ **30-second timer** with live countdown
- 🐭 Moles **pop up randomly** from 9 holes
- ⚡ **Speed increases** when < 10 seconds remain (moles appear/disappear faster!)
- ⏸️ **Pause / Resume** game mid-play
- 🏆 **Best Score** saved in `localStorage`
- 📊 **Last Game Score** tracked via `sessionStorage`
- 🚀 **Fastest Hit** timing tracked in milliseconds via `sessionStorage`
- 💥 "WHACK!" flash message on successful hit
- 🌟 Score turns **gold** when you exceed 50 points
- 🔥 Best score display glows when a new record is set

**🧠 Speed Scaling:**

```js
let speed = time < 10
  ? randomTime(300, 800)   // harder — moles vanish faster
  : randomTime(800, 1500); // normal speed
```

---

### 5. ⌨️ Typing Speed Test

> *Race against the clock — type the given sentence and measure your WPM!*

```
📁 5.Typing-speed-test/
 ├── index.html
 ├── style.css
 └── script.js
```

**✨ Features:**
- 📝 **Random test sentences** selected each round from a curated list
- ⏳ **Selectable time limits**: choose between preset durations (e.g. 30s, 60s)
- 📊 **Real-time WPM** (Words Per Minute) calculation as you type
- 🎯 **Accuracy tracking** — character-by-character comparison
- 🟢/🔴 **Live character highlighting** — green for correct, red for incorrect
- ⚡ **Fastest Start** — time to type first 5 chars tracked in `sessionStorage`
- 💾 **Best WPM & Last Score** stored in `sessionStorage`
- ⚠️ Timer turns **red** when under 10 seconds
- 🎉 WPM display turns **cyan + bold** when you break 100 WPM
- 💛 Best WPM flashes **gold** when beaten
- 🐢 Idle detection — encourages you if you stop typing for 3s
- 🔥 "Good start!" message when you hit the first space

**🧠 WPM Algorithm:**

```js
const elapsedTime = (Date.now() - startTime) / 60000; // minutes
const wpm = Math.floor(typed.split(/\s+/).length / elapsedTime);
```

---

### 6. 🃏 Memory Flip Card

> *Flip cards to find matching pairs — before the timer runs out!*

```
📁 6.memory-flip-card/
 ├── index.html
 ├── style.css
 └── index.js
```

**✨ Features:**
- 🃏 **18-card grid** (9 pairs) — dynamically generated
- 🔀 **Fisher-Yates Shuffle** algorithm for random card layout every game
- 🔄 **3D CSS flip animation** on card click (front → back reveal)
- ⏱️ **60-second countdown** timer
- 📊 **Move counter** — tracks every pair attempt
- ✅ **Pairs matched counter** live update
- 🏆 **Best Score** loaded from `localStorage`
- 🔒 Cards lock after a match — can't re-flip matched pairs
- ⏳ Cards auto-flip back after **700ms** if they don't match
- 🛡️ Anti-cheat: blocks clicking the same card twice

**🎴 Card Flip Logic:**

```
Click Card 1 → Flip & Store
Click Card 2 → Flip & Compare
  ✅ Match? → Mark matched, keep flipped
  ❌ No match? → Wait 700ms → Flip both back
All 9 pairs matched? → End Game 🎉
```

---

### 7. ✅ Todo Game

> *A feature-rich task manager with complete CRUD functionality.*

```
📁 7.todo game/
 ├── index.html
 ├── style.css
 └── index.js
```

**✨ Features:**
- ➕ **Add tasks** via button click or **Enter key** press
- ✅ **Mark tasks as complete** — strikethrough styling applied
- 🗑️ **Delete individual tasks** with a trash button
- 🔥 **Delete All** — clear the entire todo list
- 🧹 **Delete Selected** — remove only completed tasks
- 📊 **Live counters**: total tasks, completed count, remaining count
- 🧩 Tasks identified by **unique timestamp-based IDs** (`Date.now()`)
- 🔄 Toggle complete/incomplete state per task
- 🚫 **Validation** — empty tasks are prevented with an alert

**🧠 Data Model:**

```js
{
  content: "Task description",
  id: "1712345678901",  // Date.now()
  complete: false
}
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No installations, no build tools, no npm — just open and play!

### Run Locally

```bash
# Clone the repository
git clone https://github.com/sahilchaudhari32/game-task.git

# Navigate to any game folder
cd game-task/1.3x3-Tic-Tac_toe

# Open in browser
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

Or simply **double-click** any `index.html` file in File Explorer / Finder.

> 💡 **Tip:** Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code for the best development experience with auto-reload.

---

## 🗂️ Project Structure

```
game-task/
│
├── 📁 1.3x3-Tic-Tac_toe/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── 📁 2.click.counter/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── 📁 3.Color-Guessing-Game/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── 📁 4.whack-a-Mole/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── 📁 5.Typing-speed-test/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── 📁 6.memory-flip-card/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── 📁 7.todo game/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
└── README.md
```

---

## ⚙️ Core JavaScript Concepts Used

This collection covers a wide range of fundamental and intermediate JavaScript concepts:

| Concept | Used In |
|---------|---------|
| `querySelectorAll` / `getElementById` | All games |
| `addEventListener` (click, keypress, input) | All games |
| `setInterval` / `clearInterval` | Click Counter, Whack-a-Mole, Typing Test, Memory Card |
| `setTimeout` | Whack-a-Mole, Memory Card, Color Game, Click Counter |
| `localStorage` (get, set, remove) | Click Counter, Color Game, Whack-a-Mole, Memory Card |
| `sessionStorage` (get, set, clear) | Whack-a-Mole, Typing Speed Test |
| `Date.now()` for timing | Whack-a-Mole, Typing Test, Todo |
| Array methods (`.filter()`, `.forEach()`, `.push()`) | Todo, Color Game, Tic-Tac-Toe |
| Fisher-Yates Shuffle algorithm | Memory Flip Card |
| DOM manipulation (`innerHTML`, `textContent`, `classList`) | All games |
| CSS class toggling for animations | Color Game, Memory Card, Whack-a-Mole |
| Template literals & dynamic HTML generation | Todo Game, Typing Test |
| `Math.random()` & `Math.floor()` | Color Game, Whack-a-Mole, Typing Test, Memory Card |
| `prompt()` for user input | Click Counter, Whack-a-Mole |
| Event delegation | Todo Game |
| Regex (`/\s+/`) | Typing Speed Test |

---

## 🔧 Features Across All Games

- ✅ **Zero dependencies** — No npm, no CDN, no frameworks
- ✅ **Persistent data** — High scores & player names survive page refresh
- ✅ **Pause/Resume** — Available in Click Counter and Whack-a-Mole
- ✅ **Reset functionality** — Each game can be reset cleanly
- ✅ **Anti-cheat mechanics** — Buttons disabled during invalid states
- ✅ **Visual feedback** — Color changes, animations, and flash effects on events
- ✅ **Player personalization** — Name-based welcome in Click Counter & Whack-a-Mole
- ✅ **Mobile friendly HTML structure** — Playable on any screen

---

## 💡 What Can Be Added Next

Here are ideas to level up this collection:

### 🔮 Game Improvements

| Game | Possible Addition |
|------|------------------|
| 🎯 Tic-Tac-Toe | AI opponent (Minimax algorithm), win animation, draw detection |
| 🖱️ Click Counter | Leaderboard, difficulty levels (5s / 10s / 30s), multiplayer mode |
| 🎨 Color Guessing | Hex color mode, hint system, animated transitions |
| 🔨 Whack-a-Mole | Multiple moles at once, bomb moles to avoid, difficulty levels |
| ⌨️ Typing Test | More paragraph modes, language selector, performance graph |
| 🃏 Memory Card | Emoji/image cards, grid size selector (4×4, 6×6), multiplayer |
| ✅ Todo Game | `localStorage` persistence, drag-to-reorder, priority tags, due dates |

### 🌐 Global Additions

- 🏠 **Game Hub Landing Page** — A central page linking all 7 games with previews
- 🌙 **Dark / Light Mode Toggle** — Unified theme switcher
- 🔊 **Sound Effects** — Win sounds, click sounds, countdown beeps
- 🏆 **Global Leaderboard** — Using Firebase or a lightweight backend
- 📱 **Progressive Web App (PWA)** — Install games on mobile, offline support
- 🌍 **Multi-language Support** — i18n for wider accessibility
- 🎨 **Shared Design System** — Unified CSS variables across all games
- 📊 **Analytics Dashboard** — Track playtime, scores, and performance trends

---

## 👨‍💻 Author

<div align="center">

### Sahil Chaudhari

[![GitHub](https://img.shields.io/badge/GitHub-sahilchaudhari32-181717?style=for-the-badge&logo=github)](https://github.com/sahilchaudhari32)

*Built with ❤️ and pure JavaScript — no frameworks were harmed in the making of these games.*

</div>

---

<div align="center">

### ⭐ If you found this useful, please give it a star!

*Every game here is a learning project — feel free to fork, remix, and build on top of it.*

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer)

</div>