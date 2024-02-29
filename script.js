const holes = document.getElementsByClassName("hole");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const scoreDiv = document.getElementById("score");
const timerDiv = document.getElementById("timer");
const audio = new Audio("audio.mp3");

let timer;
let score = 0;
let countdown;
let moleInterval;
let random;

let gameOver = true;
function moleOut() {
  for (let i = 0; i < holes.length; i++) {
    if (holes[i].hasChildNodes())
      holes[i].removeChild(document.getElementsByClassName("mole")[0]);
    holes[i].removeEventListener("click", handleClick);
  }
  random = holes[Math.floor(Math.random() * 9)];
  const mole = document.createElement("div");
  mole.classList.add("mole");
  random.appendChild(mole);
  random.addEventListener("click", handleClick);
}
function handleClick() {
  random.removeEventListener("click", handleClick);
  if (!gameOver) {
    score++;
    scoreDiv.innerText = `Score: ${score}`;
  }
  audio.load();
  audio.play();
  document.getElementsByClassName("mole")[0].classList.add("skew");
}
function startGame() {
  if (!gameOver) {
    return;
  }
  gameOver = false;
  score = 0;
  scoreDiv.innerText = `Score: ${score}`;
  timer = 60;
  timerDiv.innerText = `Timer: ${timer}s`;

  startButton.disabled = true;
  endButton.disabled = false;

  countdown = setInterval(() => {
    timer--;
    timerDiv.innerText = `Timer: ${timer}s`;
    if (timer <= 0) {
      clearInterval(countdown);
      gameOver = true;
      alert(`Game Over!\n your final score is: ${score}`);
      startButton.disabled = false;
      endButton.disabled = true;
    }
  }, 1000);
  moleInterval = setInterval(() => {
    if (!gameOver) moleOut();
  }, 1000);
}
function endGame() {
  for (let i = 0; i < holes.length; i++) {
    holes[i].classList.remove("mole");
    holes[i].removeEventListener("click", handleClick);
  }
  clearInterval(countdown);
  clearInterval(moleInterval);
  gameOver = true;
  alert(`Game Ended!\n your final score is: ${score}`);
  timer = 60;
  score = 0;
  scoreDiv.innerText = `Score: ${score}`;
  timerDiv.innerText = `Score: ${timer}s`;
  startButton.disabled = false;
  endButton.disabled = true;
}

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
