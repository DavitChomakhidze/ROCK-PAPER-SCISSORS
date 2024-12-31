"use strict";

const score = document.querySelector(".score_number");
const paperButton = document.querySelector(".paper");
const scissorsButton = document.querySelector(".scissors");
const rockButton = document.querySelector(".rock");
const rules = document.querySelector(".rules_button");
const move = document.querySelector(".move");
const computer = document.querySelector(".computer");
const computerText = document.querySelector(".computer_text");
const rulesModal = document.querySelector(".rules_modal_main");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal_button");
const body = document.querySelector("body");

let scoreNum = localStorage.getItem("score");
scoreNum = scoreNum !== null && !isNaN(Number(scoreNum)) ? Number(scoreNum) : 0;

const moves = [
  ["paper", "images/icon-paper.svg"],
  ["scissors", "images/icon-scissors.svg"],
  ["rock", "images/icon-rock.svg"],
];

score.textContent = scoreNum;

const clearMoveField = function () {
  move.innerHTML = "";
};

const initializeMoveListeners = function () {
  const paperButton = document.querySelector(".paper");
  const scissorsButton = document.querySelector(".scissors");
  const rockButton = document.querySelector(".rock");

  paperButton.addEventListener("click", function () {
    const paperSrc = "images/icon-paper.svg";
    playerMove(paperSrc, "paper");
    setTimeout(() => generateComputerMove(paperSrc, "paper"), 500);
  });

  scissorsButton.addEventListener("click", function () {
    const scissorsSrc = "images/icon-scissors.svg";
    clearMoveField();
    playerMove(scissorsSrc, "scissors");
    setTimeout(() => generateComputerMove(scissorsSrc, "scissors"), 500);
  });

  rockButton.addEventListener("click", function () {
    const rockSrc = "images/icon-rock.svg";
    clearMoveField();
    playerMove(rockSrc, "rock");
    setTimeout(() => generateComputerMove(rockSrc, "rock"), 500);
  });
};

initializeMoveListeners();

const playAgainFunction = function () {
  const playAgain = document.querySelector(".result_button");

  playAgain.addEventListener("click", function () {
    clearMoveField();

    const markup = `
    <div class="move_container">
              <img class="triangle" src="images/bg-triangle.svg" />
              <div class="paper moves">
                <button class="move_button">
                  <img class="move_icon" src="images/icon-paper.svg" />
                </button>
              </div>
              <div class="scissors moves">
                <button class="move_button">
                  <img class="move_icon" src="images/icon-scissors.svg" />
                </button>
              </div>
              <div class="rock moves">
                <button class="move_button">
                  <img class="move_icon" src="images/icon-rock.svg" />
                </button>
              </div>
            </div>`;
    move.insertAdjacentHTML("beforeend", markup);

    initializeMoveListeners();
  });
};

const win = function (name, image, name1, image1) {
  clearMoveField();
  scoreNum++;
  localStorage.setItem("score", scoreNum);
  score.textContent = scoreNum;

  const markup = `
  <div class="grid grid_win">
            <div class="player">
              <span class="player_text">YOU PICKED</span>
              <div class="${name}_new moves_new circles">
                <button class="move_button">
                  <img class="move_icon" src="${image}" />
                </button>
                <div class="circle-container">
                  <div class="circle circle-1"></div>
                  <div class="circle circle-2"></div>
                  <div class="circle circle-3"></div>
                </div>                
              </div>
            </div>
            <div class="result">
              <span class="result_text">YOU WIN</span>
              <button class="result_button"><span class="rules_button_text">PLAY AGAIN</span></button>
            </div>
            <div class="computer new_computer">
              <span  class="computer_text">THE HOUSE PICKED</span>
          <div class="${name1}_new moves_new">
            <button class="move_button">
              <img class="move_icon" src="${image1}" />
            </button>
          </div>
            </div>
            
            
          </div>`;
  move.insertAdjacentHTML("beforeend", markup);
  playAgainFunction();
};

const loose = function (name, image, name1, image1) {
  clearMoveField();
  scoreNum--;
  localStorage.setItem("score", scoreNum);
  score.textContent = scoreNum;

  const markup = `
  <div class="grid grid_win">
            <div class="player">
              <span class="player_text">YOU PICKED</span>
              <div class="${name}_new moves_new ">
                <button class="move_button">
                  <img class="move_icon" src="${image}" />
                </button>
                <div class="circle-container">
                  <div class="circle new_circle-1"></div>
                  <div class="circle new_circle-2"></div>
                  <div class="circle new_circle-3"></div>
                </div>                
              </div>
            </div>
            <div class="result">
              <span class="result_text ">YOU LOST</span>
              <button class="result_button"><span class="rules_button_text lost">PLAY AGAIN</span></button>
            </div>
            <div class="computer new_computer circles">
              <span  class="computer_text">THE HOUSE PICKED</span>
          <div class="${name1}_new moves_new">
            <button class="move_button">
              <img class="move_icon" src="${image1}" />
            </button>
          </div>
            </div>
            
            
          </div>`;
  move.insertAdjacentHTML("beforeend", markup);
  playAgainFunction();
};

const tie = function (name, image, name1, image1) {
  clearMoveField();
  localStorage.setItem("score", scoreNum);
  score.textContent = scoreNum;

  const markup = `
 <div class="grid grid_win">
            <div class="player">
              <span class="player_text">YOU PICKED</span>
              <div class="${name}_new moves_new circles">
                <button class="move_button">
                  <img class="move_icon" src="${image}" />
                </button>            
              </div>
            </div>
            <div class="result">
              <span class="result_text ">IT'S A TIE!</span>
              <button class="result_button"><span class="rules_button_text">PLAY AGAIN</span></button>
            </div>
            <div class="computer new_computer">
              <span  class="computer_text">THE HOUSE PICKED</span>
          <div class="${name1}_new moves_new">
            <button class="move_button">
              <img class="move_icon" src="${image1}" />
            </button>
          </div>
            </div>
            
            
          </div>`;
  move.insertAdjacentHTML("beforeend", markup);
  playAgainFunction();
};

const playerMove = function (image, name) {
  clearMoveField();
  const playerMoving = `
  <div class="grid">
            <div class="player">
              <span class="player_text">YOU PICKED</span>
              <div class="${name} moves_new">
                <button class="move_button">
                  <img class="move_icon" src="${image}" />
                </button>
              </div>
            </div>
            <div class="computer">
              <span  class="computer_text">THE HOUSE PICKED</span>
              <div class="computer_move"></div>
            </div>
            
          </div>
          `;
  move.insertAdjacentHTML("beforeend", playerMoving);
};

const generateComputerMove = function (image, name) {
  clearMoveField();
  const randomNumber = Math.floor(Math.random() * 3);
  const [name1, image1] = moves[randomNumber];

  const markup = `
  <div class="grid">
            <div class="player">
              <span class="player_text">YOU PICKED</span>
              <div class="${name} moves_new">
                <button class="move_button">
                  <img class="move_icon" src="${image}" />
                </button>
              </div>
            </div>
            <div class="computer new_computer">
              <span  class="computer_text">THE HOUSE PICKED</span>
                <div class="${name1} moves_new">
            <button class="move_button">
              <img class="move_icon" src="${image1}" />
            </button>
          </div>
            </div>
            
          </div>
  `;

  move.insertAdjacentHTML("beforeend", markup);

  if (
    (name === "paper" && name1 === "rock") ||
    (name === "rock" && name1 === "scissors") ||
    (name === "scissors" && name1 === "paper")
  ) {
    win(name, image, name1, image1);
  } else if (
    (name === "paper" && name1 === "paper") ||
    (name === "rock" && name1 === "rock") ||
    (name === "scissors" && name1 === "scissors")
  ) {
    tie(name, image, name1, image1);
  } else {
    loose(name, image, name1, image1);
  }
};

rules.addEventListener("click", function () {
  rulesModal.style.display = "block";
  overlay.style.display = "block";
});

modalClose.addEventListener("click", function () {
  rulesModal.style.display = "none";
  overlay.style.display = "none";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && rulesModal.style.display !== "none") {
    rulesModal.style.display = "none";
    overlay.style.display = "none";
  }
});
