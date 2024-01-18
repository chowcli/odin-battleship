/* eslint-disable no-plusplus */
function create2DArray() {
  const gameBoard = new Array(10);

  for (let i = 0; i < 10; i++) {
    gameBoard[i] = new Array(10).fill("");
  }

  return gameBoard;
}

function isOutOfBound(axisStartPoint, shipLength) {
  return parseInt(axisStartPoint, 10) + shipLength - 1 >= 10;
}

function isOverlap(gameBoard, x, y, orientation, shipLength) {
  let row;
  let col;

  for (let i = 0; i < shipLength; i++) {
    row = orientation === "x" ? y : y + i;
    col = orientation === "x" ? x + i : x;

    if (gameBoard[row][col] !== "") return true;
  }

  return false;
}

const Gameboard = () => {
  const gameBoard = create2DArray();
  const fleet = [];

  const getBoard = () => gameBoard;
  const getFleet = () => fleet;

  function getShip(shipName) {
    return fleet.find(ship => ship.getShipName() === shipName);
  }

  function addToFleet(ship) {
    fleet.push(ship);
  }

  function placeShip(ship, x, y, orientation) {
    if (
      orientation === "x" &&
      !isOutOfBound(x, ship.getShipLength()) &&
      !isOverlap(gameBoard, x, y, orientation, ship.getShipLength())
    ) {
      for (let i = 0; i < ship.getShipLength(); i++) {
        gameBoard[y][x + i] = { type: ship.getShipName(), isHit: false };
      }
    } else if (
      !isOutOfBound(y, ship.getShipLength()) &&
      !isOverlap(gameBoard, x, y, orientation, ship.getShipLength())
    ) {
      for (let i = 0; i < ship.getShipLength(); i++) {
        gameBoard[y + i][x] = { type: ship.getShipName(), isHit: false };
      }
    }
  }

  return { getBoard, getFleet, getShip, addToFleet, placeShip };
};

export default Gameboard;
