const game = document.querySelector(".game");
const message = document.querySelector(".message");
const game_over = document.querySelector(".game-over");
const final_score = document.querySelector(".final-score span");

let start = false;
const pig = document.querySelector(".pig");
let pipes = document.querySelectorAll(".pipe");
let pipes_conteiner = document.querySelector(".pipes");
let score = 0;
let gravity = 50;
let degree = 0;
let gameInterval;
let pipeInterval;
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;

const high_score = document.createElement("div");
high_score.className = "high-score";
high_score.innerText = `High Score: ${highScore}`;
game.appendChild(high_score);

function startGame() {
  gravity < 82 ? (gravity += 4) : gravity;
  pig.style.top = `${gravity}%`;
  degree <= 30 ? (degree += 5) : degree;
  pig.style.transform = `rotate(${degree}deg)`;
}

function PigFly() {
  gravity > 0 ? (gravity -= 8) : gravity;
  pig.style.top = `${gravity}%`;
  degree >= -30 ? (degree -= 13) : degree;
  pig.style.transform = `rotate(${degree}deg)`;
}

function createPipe() {
  const t_pipe = document.createElement("div");
  t_pipe.className = "pipe top-pipe";
  const random = Math.floor(Math.random() * 40) + 10;
  t_pipe.style.height = `${random}%`;

  const b_pipe = document.createElement("div");
  b_pipe.className = "pipe btm-pipe";
  b_pipe.style.height = `${60 - random}%`;

  pipes_conteiner.appendChild(t_pipe);
  pipes_conteiner.appendChild(b_pipe);
  pipes = document.querySelectorAll(".pipe");

  let pipeInterval = setInterval(() => {
    checkCollision();
    pipes.forEach((pipe) => {
      let pipeLeft = parseInt(
        window.getComputedStyle(pipe).getPropertyValue("left")
      );
      if (pipeLeft < -60) {
        clearInterval(pipeInterval);
        for (let i = 0; i < 2; i++) {
          if (pipes_conteiner.firstElementChild) {
            pipes_conteiner.removeChild(pipes_conteiner.firstElementChild);
          }
        }
        score++;
        updateScore();
      }
    });
  }, 20);
}

function updateScore() {
  document.querySelector(".score span").textContent = score;
}

function checkCollision() {
  pipes.forEach((pipe) => {
    const pipeRect = pipe.getBoundingClientRect();
    const pigRect = pig.getBoundingClientRect();
    if (
      pigRect.left < pipeRect.right &&
      pigRect.right > pipeRect.left &&
      pigRect.bottom > pipeRect.top &&
      pigRect.top < pipeRect.bottom
    ) {
      game.style.display = "none";
      game_over.style.display = "flex";
      final_score.textContent = score;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        high_score.innerText = `High Score: ${highScore}`;
      }
      score = 0;
    }
  });
}

document.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    message.style.display = "none";
    PigFly();
  }
});

gameInterval = setInterval(startGame, 150);
setInterval(() => {
  updateScore();
}, 3000);

pipeInterval = setInterval(createPipe, 1000);
