const { ConnectFour } = require("./script");
const utils = require("./utils");

test("checkWinner is able to find the horizontal winner", () => {
  const newGame = new ConnectFour();
  newGame.board = utils.HORIZONTAL_RED_WIN;
  newGame.checkWinnerTest();
  expect(newGame.gameOver).toBe(true);
  expect(newGame.gameWinner).toBe("red");
});
test("checkWinner is able to find the vertical winner", () => {
  const newGame = new ConnectFour();
  newGame.board = utils.VERTICAL_YELLOW_WIN;
  newGame.checkWinnerTest();
  expect(newGame.gameOver).toBe(true);
  expect(newGame.gameWinner).toBe("yellow");
});
test("checkWinner is able to find the anti-diagonal winner", () => {
  const newGame = new ConnectFour();
  newGame.board = utils.ANTI_DIAGONAL_RED_WIN;
  newGame.checkWinnerTest();
  expect(newGame.gameOver).toBe(true);
  expect(newGame.gameWinner).toBe("red");
});
test("checkWinner is able to find the diagonal winner", () => {
  const newGame = new ConnectFour();
  newGame.board = utils.DIAGONAL_RED_WIN;
  newGame.checkWinnerTest();
  expect(newGame.gameOver).toBe(true);
  expect(newGame.gameWinner).toBe("red");
});
