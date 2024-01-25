/* eslint-disable no-plusplus */

function isEndGame(gameBoard1, gameBoard2) {
  if (gameBoard1.areAllSunk()) return 2; // player 1 lose mean return player 2 winner
  if (gameBoard2.areAllSunk()) return 1;

  return false;
}

function getRandomCoords() {
  return Math.floor(Math.random() * 10);
}

export { isEndGame, getRandomCoords };
