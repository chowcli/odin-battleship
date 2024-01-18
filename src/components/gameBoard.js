/* eslint-disable no-plusplus */
function create2DArray() {
  const gameBoard = new Array(10);

  for (let i = 0; i < 10; i++) {
    gameBoard[i] = new Array(10).fill("");
  }

  return gameBoard;
}

function isOutOfBounds(x, y, orientation, shipLength) {
  const coordinate = orientation === "x" ? x : y;
  return coordinate + shipLength - 1 >= 10;
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

  function addToFleet(...ship) {
    fleet.push(...ship);
  }

  function placeShip(ship, x, y, orientation) {
    const shipLength = ship.getShipLength();
    const shipName = ship.getShipName();

    const isValidPlacement =
      !isOutOfBounds(x, y, orientation, shipLength) && !isOverlap(gameBoard, x, y, orientation, shipLength);

    if (isValidPlacement) {
      let row;
      let col;

      for (let i = 0; i < shipLength; i++) {
        row = orientation === "x" ? y : y + i;
        col = orientation === "x" ? x + i : x;

        gameBoard[row][col] = { type: shipName, isHit: false };
      }
    }
  }

  function receiveAttack(x, y) {
    if (gameBoard[y][x] === "") {
      gameBoard[y][x] = 0;
      return;
    }

    if (typeof gameBoard[y][x] === "object" && gameBoard[y][x].isHit === false) {
      gameBoard[y][x].isHit = true;

      const shipObject = getShip(gameBoard[y][x].type);
      shipObject.isHit();
    }
  }

  function isAllSunk() {
    return fleet.every(ship => ship.isSunk());
  }

  return { getBoard, getFleet, getShip, addToFleet, placeShip, receiveAttack, isAllSunk };
};

export default Gameboard;
