const body = document.querySelector("body");

const pipe = document.createElement("img");
pipe.className = "pipe";
pipe.setAttribute("src", "./assets/images/pipe.png");
pipe.setAttribute("alt", "pipe");

body.appendChild(pipe);

let start = false;
const pig = document.querySelector(".pig");
let gravity = 50;
let degree = 0;

function startGame() {
  gravity < 80 ? (gravity += 3) : gravity;
  pig.style.top = `${gravity}%`;
  degree <= 30 ? (degree += 5) : degree;
  pig.style.transform = `rotate(${degree}deg)`;
}

function PigFly() {
  gravity > 0 ? (gravity -= 8) : gravity;
  pig.style.top = `${gravity}%`;
  degree >= -30 ? (degree -= 10) : degree;
  pig.style.transform = `rotate(${degree}deg)`;
}

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector("h2").style.display = "none";
    start = true;
    setInterval(() => {
      startGame();
    }, 150);
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === " " && start === true) {
    PigFly();
  }
});
