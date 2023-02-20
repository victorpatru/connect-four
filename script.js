class ConnectFour {
  playerRed = "R";
  playerYellow = "Y";
  currPlayer = this.playerRed;
  gameOver = false;
  board;
  rows = 6;
  columns = 7;
  currColumns;
  gameWinner;

  setGame = () => {
    this.board = [];

    this.currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // JS
        row.push(" ");
        // HTML
        let tile = document.createElement("div");
        tile.id = `${r}-${c}`;
        tile.classList.add("tile");
        tile.addEventListener("click", this.setPiece);
        document.getElementById("board").append(tile);
      }
      this.board.push(row);
    }
  };

  // TODO: Figure out why you needed to transform setPiece function from a function declaration to a function call
  // Something to do with binding "this" keyword to the right item
  setPiece = (e) => {
    // Boolean that we set once we've set the winner
    if (this.gameOver) {
      return;
    }

    // this => <div id="5-0" class="tile red-piece"></div>
    // id gets "0-0" => ["0", "0"] => [0, 0]
    let coordinates = e.target.id.split("-").map((coor) => parseInt(coor));
    // r,c => show us the coordinates on the page eg. 4,3
    let [r, c] = coordinates;

    // FIXME: figure out why you needed to use an arrow key to be able to access this.currColumns and this.board

    // 5 (represents that we are at bottom of the board), 4, 3, 2, 1 (represents that we are at the top of the board) => allows us to make sure we're not going beyond the height of the game
    r = this.currColumns[c];

    // We increment down as the spots get filled AND have a method for checking that
    if (r < 0) {
      return;
    }

    this.board[r][c] = this.currPlayer;

    let tile = document.getElementById(`${r}-${c}`);

    // Allows us to start placing items on the board
    this.currPlayer === this.playerRed
      ? (tile.classList.add("red-piece"), (this.currPlayer = this.playerYellow))
      : (tile.classList.add("yellow-piece"),
        (this.currPlayer = this.playerRed));

    // Ensure that placing items on the board always end up at the bottom most row
    // eg. you can't place on row 4 if you there isn't a piece on the 5th row already

    r -= 1; // updating the row height for the column as the game progresses

    this.currColumns[c] = r; // update the array

    this.checkWinner();
  };

  checkWinner = () => {
    // Checking Horizontally
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        // COLUMNS - 3 to make sure we don't go out of the bounds of our row
        if (this.board[r][c] !== " ") {
          // Ensures there exists a piece on that spot on the board

          if (
            this.board[r][c] === this.board[r][c + 1] &&
            this.board[r][c + 1] === this.board[r][c + 2] &&
            this.board[r][c + 2] === this.board[r][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    // Checking Vertically
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows - 3; r++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r + 1][c] &&
            this.board[r + 1][c] === this.board[r + 2][c] &&
            this.board[r + 2][c] === this.board[r + 3][c]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    // Checking Anti-Diagonally
    for (let r = 0; r < this.rows - 3; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r + 1][c + 1] &&
            this.board[r + 1][c + 1] === this.board[r + 2][c + 2] &&
            this.board[r + 2][c + 2] === this.board[r + 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    // Checking Diagonally
    for (let r = 3; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r - 1][c + 1] &&
            this.board[r - 1][c + 1] === this.board[r - 2][c + 2] &&
            this.board[r - 2][c + 2] === this.board[r - 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  };

  setWinner = (r, c) => {
    let winner = document.getElementById("winner");
    this.board[r][c] === this.playerRed
      ? ((winner.innerText = "Red Wins"), (this.gameWinner = "red"))
      : ((winner.innerText = "Yellow Wins"), (this.gameWinner = "yellow"));

    this.gameOver = true;
    console.log(this.gameWinner);
  };

  checkWinnerTest = () => {
    // Checking Horizontally
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        // COLUMNS - 3 to make sure we don't go out of the bounds of our row
        if (this.board[r][c] !== " ") {
          // Ensures there exists a piece on that spot on the board

          if (
            this.board[r][c] === this.board[r][c + 1] &&
            this.board[r][c + 1] === this.board[r][c + 2] &&
            this.board[r][c + 2] === this.board[r][c + 3]
          ) {
            this.board[r][c] === this.playerRed
              ? (this.gameWinner = "red")
              : (this.gameWinner = "yellow");
            this.gameOver = true;
            return;
          }
        }
      }
    }

    // Checking Vertically
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows - 3; r++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r + 1][c] &&
            this.board[r + 1][c] === this.board[r + 2][c] &&
            this.board[r + 2][c] === this.board[r + 3][c]
          ) {
            this.board[r][c] === this.playerRed
              ? (this.gameWinner = "red")
              : (this.gameWinner = "yellow");
            this.gameOver = true;
            return;
          }
        }
      }
    }

    // Checking Anti-Diagonally
    for (let r = 0; r < this.rows - 3; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r + 1][c + 1] &&
            this.board[r + 1][c + 1] === this.board[r + 2][c + 2] &&
            this.board[r + 2][c + 2] === this.board[r + 3][c + 3]
          ) {
            this.board[r][c] === this.playerRed
              ? (this.gameWinner = "red")
              : (this.gameWinner = "yellow");
            this.gameOver = true;
            return;
          }
        }
      }
    }

    // Checking Diagonally
    for (let r = 3; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] !== " ") {
          if (
            this.board[r][c] === this.board[r - 1][c + 1] &&
            this.board[r - 1][c + 1] === this.board[r - 2][c + 2] &&
            this.board[r - 2][c + 2] === this.board[r - 3][c + 3]
          ) {
            this.board[r][c] === this.playerRed
              ? (this.gameWinner = "red")
              : (this.gameWinner = "yellow");
            this.gameOver = true;
            return;
          }
        }
      }
    }
  };
}

// const newGame = new ConnectFour();
// newGame.setGame();

module.exports = {
  ConnectFour,
};
