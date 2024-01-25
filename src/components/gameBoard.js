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
    return fleet.find(ship => ship.getName() === shipName);
  }

  function addToFleet(...ships) {
    fleet.push(...ships);
  }

  function placeShip(ship, x, y, orientation) {
    const shipLength = ship.getLength();
    const shipName = ship.getName();

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

      return true; // Placement was successful
    }

    return false; // Placement failed
  }

  function receiveAttack(x, y) {
    const cell = gameBoard[y][x];

    if (cell === "") {
      gameBoard[y][x] = 0;
      return 2; // miss
    }

    if (cell.isHit === false) {
      cell.isHit = true;
      getShip(cell.type).isHit();

      return 1; // hit
    }

    return 0; // attack unsuccessful
  }

  function areAllSunk() {
    return fleet.every(ship => ship.isSunk());
  }

  return { getBoard, getFleet, getShip, addToFleet, placeShip, receiveAttack, areAllSunk };
};

export default Gameboard;
