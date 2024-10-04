const body = document.querySelector("body");

let start = false;
const pig = document.querySelector(".pig");
let pipes = document.querySelectorAll(".pipe");
let pipes_conteiner = document.querySelector(".pipes");
let score = 0;
let gravity = 50;
let degree = 0;
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;

const high_score = document.createElement("div");
high_score.className = "high-score";
high_score.innerText = `High Score: ${highScore}`;
body.appendChild(high_score);

function startGame() {
  gravity < 82 ? (gravity += 3) : gravity;
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
}

function movePipe() {
  pipes.forEach((pipe) => {
    let pipeRight = parseInt(
      window.getComputedStyle(pipe).getPropertyValue("right")
    );
    pipe.style.right = pipeRight + 6 + "px";
  });
  const pipeInterval = setInterval(() => {
    pipes.forEach((pipe) => {
      let pipeLeft = parseInt(
        window.getComputedStyle(pipe).getPropertyValue("left")
      );
      if (pipeLeft < 0) {
        clearInterval(pipeInterval);
        for (let i = 0; i < 2; i++) {
          if (pipes_conteiner.firstElementChild) {
            pipes_conteiner.removeChild(pipes_conteiner.firstElementChild);
          }
        }
        score++;
        updateScore();
      }
      // if (checkCollision()) {
      //   clearInterval(pipeInterval);
      // }
    });
  }, 10);
}

function updateScore() {
  document.querySelector(".score span").textContent = score;
}

// function checkCollision() {
//   pipes.forEach((pipe) => {
//     const pipeRect = pipe.getBoundingClientRect();
//     const pigRect = pig.getBoundingClientRect();
//     if (
//       pigRect.left < pipeRect.right &&
//       pigRect.right > pipeRect.left &&
//       pigRect.bottom > pipeRect.top &&
//       pigRect.top < pipeRect.bottom
//     ) {
//       alert("Game Over!");
//       return;
//     }
//   });
// }

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector("h2").style.display = "none";
    start = true;
    setInterval(() => {
      startGame();
    }, 150);
    setInterval(() => {
      movePipe();
    }, 20);
    setInterval(() => {
      createPipe();
      updateScore();
    }, 3000);
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === " " && start === true) {
    PigFly();
  }
});
