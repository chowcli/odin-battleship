/* eslint-disable no-plusplus */
function create2DArray() {
  const gameBoard = new Array(10);

  for (let i = 0; i < 10; i++) {
    gameBoard[i] = new Array(10).fill("");
  }

  return gameBoard;
}

function isOutOfBounds(srtX, srtY, axis, shipLength) {
  const srtPoint = axis === "x" ? srtX : srtY;
  return srtPoint + shipLength - 1 >= 10;
}

function isOverlap(gameBoard, srtX, srtY, axis, shipLength) {
  let x;
  let y;

  for (let i = 0; i < shipLength; i++) {
    x = axis === "x" ? srtX + i : srtX;
    y = axis === "x" ? srtY : srtY + i;

    if (gameBoard[y][x] !== "") return true;
  }

  return false;
}

function isValidPlacement(gameBoard, x, y, axis, shipLength) {
  return !isOutOfBounds(x, y, axis, shipLength) && !isOverlap(gameBoard, x, y, axis, shipLength);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEndGame(gameBoard1, gameBoard2) {
  if (gameBoard1.areAllSunk()) return 2; // player 1 lose mean return player 2 winner
  if (gameBoard2.areAllSunk()) return 1;

  return false;
}

function getRandomCoords() {
  return Math.floor(Math.random() * 10);
}

export { create2DArray, isValidPlacement, capitalize, isEndGame, getRandomCoords };
