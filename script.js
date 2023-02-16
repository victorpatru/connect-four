const playerRed = "R";
const playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;

const ROWS = 6;
const COLUMNS = 7;
let currColumns;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLUMNS; c++) {
      // JS
      row.push(" ");
      // HTML
      let tile = document.createElement("div");
      tile.id = `${r}-${c}`;
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  // "0-0" => ["0", "0"] => [0, 0]
  let coordinates = this.id.split("-").map((coor) => parseInt(coor));
  let [r, c] = coordinates;

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currPlayer;

  let tile = document.getElementById(`${r}-${c}`);

  // Allows us to start placing items on the board
  currPlayer === playerRed
    ? (tile.classList.add("red-piece"), (currPlayer = playerYellow))
    : (tile.classList.add("yellow-piece"), (currPlayer = playerRed));

  // Ensure that placing items on the board always end up at the bottom most row
  // eg. you can't place on row 4 if you there isn't a piece on the 5th row already

  r -= 1; // updating the row height for the column

  currColumns[c] = r; // update the array

  checkWinner();
}

function checkWinner() {
  // Check Horizontally (checking four ROWS at a time)

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      // COLUMNS - 3 to make sure we don't go out of the bounds of our row
      if (board[r][c] != " ") {
        // Ensures there exists a piece on that spot on the board
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Checking Vertically
  for (let c = 0; c < COLUMNS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r + 1][c] &&
          board[r + 1][c] === board[r + 2][c] &&
          board[r + 2][c] === board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Checking Anti-Diagonally
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r + 1][c + 1] &&
          board[r + 1][c + 1] === board[r + 2][c + 2] &&
          board[r + 2][c + 2] === board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Checking Diagonally
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r - 1][c + 1] === board[r - 2][c + 2] &&
          board[r - 2][c + 2] === board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  board[r][c] === playerRed
    ? (winner.innerText = "Red Wins")
    : (winner.innerText = "Yellow Wins");

  gameOver = true;
}

module.exports = checkWinner;
