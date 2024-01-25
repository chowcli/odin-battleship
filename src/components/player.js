/* eslint-disable no-plusplus */
import Ship from "./ship";
import Gameboard from "./gameBoard";
import { getRandomCoords } from "./supportFnc";

const Player = (type = "human") => {
  const playerType = type;
  const boardObject = Gameboard();
  let enemyBoard;

  const getType = () => playerType;
  const getBoard = () => boardObject;

  function prepareFleet() {
    const fleet = [
      Ship("carrier", 5),
      Ship("battleship", 4),
      Ship("destroyer", 3),
      Ship("submarine", 3),
      Ship("patrol boat", 2),
    ];

    boardObject.addToFleet(...fleet);
  }

  function setEnemyBoard(board) {
    enemyBoard = board;
  }

  function attack(x, y) {
    return enemyBoard.receiveAttack(x, y);
  }

  // AI method

  function randomShipPlacement() {
    const fleet = boardObject.getFleet();
    const occupiedPositions = [];

    fleet.forEach(ship => {
      let isPlacementSuccessful = false;

      while (!isPlacementSuccessful) {
        const srtX = getRandomCoords();
        const srtY = getRandomCoords();
        const orientation = Math.random() < 0.5 ? "x" : "y";

        // Check if the chosen position is not too close to already occupied positions
        const isTooClose = occupiedPositions.some(({ x, y }) => Math.abs(x - srtX) < 2 && Math.abs(y - srtY) < 2);

        if (!isTooClose) {
          isPlacementSuccessful = boardObject.placeShip(ship, srtX, srtY, orientation);

          // If placement is successful, update occupied positions
          if (isPlacementSuccessful) {
            for (let i = 0; i < ship.getLength(); i++) {
              const x = orientation === "x" ? srtY : srtY + i;
              const y = orientation === "x" ? srtX + i : srtX;
              occupiedPositions.push({ x, y });
            }
          }
        }
      }
    });
  }

  function randomAttack() {
    let attackSuccessful = 0;
    let x;
    let y;

    while (attackSuccessful === 0) {
      x = getRandomCoords();
      y = getRandomCoords();

      attackSuccessful = attack(x, y);
    }

    return attackSuccessful;
  }

  return {
    getType,
    getBoard,
    prepareFleet,
    setEnemyBoard,
    ...(playerType === "human" ? { attack } : { randomAttack, randomShipPlacement }),
  };
};

export default Player;
