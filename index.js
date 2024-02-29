const holes = document.querySelectorAll(".hole");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let timer;
let score = 0;
let countdown;
let moleInterval;
let random;

let gameOver = true;

function comeout() {
  holes.forEach((hole) => {
    hole.classList.remove("mole");
    hole.removeEventListener("click", handleMoleClick);
  });

  random = holes[Math.floor(Math.random() * 9)];

  random.classList.add("mole");
  random.addEventListener("click", handleMoleClick);
}

function handleMoleClick() {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
  random.classList.remove("mole");
}

function startGame() {
  if (!gameOver) {
    return;
  }
  gameOver = false;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  timer = 60;
  timerDisplay.textContent = `Time: ${timer}s`;

  startButton.disabled = true;
  endButton.disabled = false;

  countdown = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Time: ${timer}s`;

    if (timer <= 0) {
      clearInterval(countdown);
      gameOver = true;
      alert(`Game Over!\nYour final score: ${score}`);
      startButton.disabled = false;
      endButton.disabled = true;
    }
  }, 1000);

  moleInterval = setInterval(() => {
    if (!gameOver) comeout();
  }, 1000);

  console.log("Game started");
}

function endGame() {
  clearInterval(countdown);
  clearInterval(moleInterval);
  gameOver = true;
  alert(`Game Ended!\nYour final score: ${score}`);
  score = 0;
  timer = 60;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timer}s`;
  startButton.disabled = false;
  endButton.disabled = true;
}

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
