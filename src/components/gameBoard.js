/* eslint-disable no-plusplus */
import { create2DArray, isValidPlacement } from "./supportFnc";

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

  function placeShip(ship, srtX, srtY, axis) {
    const shipLength = ship.getLength();
    const shipName = ship.getName();

    if (isValidPlacement(gameBoard, srtX, srtY, axis, shipLength)) {
      let x;
      let y;

      for (let i = 0; i < shipLength; i++) {
        x = axis === "x" ? srtX + i : srtX;
        y = axis === "x" ? srtY : srtY + i;

        gameBoard[y][x] = { type: shipName, isHit: false };
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
