const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const btn = document.getElementById("restartButton");
const win = document.querySelector(".winning-message");
const text = document.querySelector(".text");
const XClass = "x";
const circleClass = "circle";

const winningCombination = [
  // horizontal win
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical win
  [0, 3, 6],
  [, 1, 4, 7],
  [2, 5, 8],
  // cross win
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;
window.addEventListener("DOMContentLoaded", function () {
  board.classList.add("x");
});

// once true means only one time it can be clicked
function startGame() {
  cellElements.forEach(function (cell) {
    circleTurn = false;
    win.classList.remove("show");
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick, { once: true });
    cell.addEventListener("click", handleClick, { once: true });
  });
}
startGame();

// setting a variable if circleTurn is false by default and if it is then we want to add the x
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : XClass;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

// adding the current class for our grid
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// swapping turns  making the circle turn equal to the opposite of circle turn also setting the hover change
function swapTurns() {
  circleTurn = !circleTurn;
  if (!circleTurn) {
    board.classList.add("x");
    board.classList.remove("circle");
  } else {
    board.classList.remove("x");
    board.classList.add("circle");
  }
}

//  checking if we match any of these arrays=====
function checkWin(currentClass) {
  return winningCombination.some(function (combination) {
    return combination.every(function (index) {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// =====end game state ==========
function endGame(draw) {
  if (draw) {
    text.textContent = "draw!";
  } else {
    // depend which turn it is we display the message
    text.textContent = `${circleTurn ? "o's" : "x's"} win!`;
  }
  win.classList.add("show");
}

//=====draw function=======
function isDraw() {
  //  we destructure  the cell elements into an array
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(XClass) || cell.classList.contains(circleClass)
    );
  });
}
btn.addEventListener("click", startGame);
