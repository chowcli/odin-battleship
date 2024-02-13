/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import createBoardDOM from "./boardDOM";
import Player from "../player";
import shipPlacementHandler from "./shipPlacementHandler";
import { isEndGame } from "../supportFnc";
import "../../styles/modal.css";

function initializePlayer() {
  const player1 = Player();
  const player2 = Player("computer");

  player1.prepareFleet();
  player2.prepareFleet();

  player1.setEnemyBoard(player2.getBoard());
  player2.setEnemyBoard(player1.getBoard());

  player2.randomShipPlacement();

  return { player1, player2 };
}

function BattlefieldHandler() {
  const { player1: humanPlayer, player2: computerPlayer } = initializePlayer();
  const playerBoard = humanPlayer.getBoard();
  const computerBoard = computerPlayer.getBoard();

  const shipPlacementDialog = document.querySelector(".ship-placement-dialog");
  shipPlacementDialog.showModal();

  const playerBoardDOM = document.querySelector(".player-board");
  const computerBoardDOM = document.querySelector(".computer-board");

  createBoardDOM(playerBoardDOM);
  createBoardDOM(computerBoardDOM);
  createBoardDOM(shipPlacementDialog.querySelector(".ship-board"));

  shipPlacementHandler(shipPlacementDialog, playerBoard, playerBoardDOM);

  let isUserTurn = true;
  let userClickCount = 0;

  function handleComputerAttack() {
    if (isUserTurn) return;

    const { x, y, attackSuccessful } = computerPlayer.randomAttack();
    const className = attackSuccessful === 1 ? "hit" : "missed";

    const cell = playerBoardDOM.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`);
    cell.classList.add(className);

    isUserTurn = true;
  }

  function handleUserAttack(event) {
    if (!event.target.classList.contains("cell")) return;

    const cell = event.target;

    if (cell.classList.contains("hit") || cell.classList.contains("missed")) return;

    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);

    const className = humanPlayer.attack(x, y) === 1 ? "hit" : "missed";

    cell.classList.add(className);

    isUserTurn = false;
    userClickCount++;
  }

  function displayWinner() {
    const winner = isEndGame(playerBoard, computerBoard);

    if (winner) {
      const resetGameDialog = document.querySelector(".reset-game-dialog");
      const h3 = resetGameDialog.querySelector("h3");
      const resetBtn = resetGameDialog.querySelector("button");

      if (winner === 1) {
        h3.textContent = "Congratulations You Won!";
      } else {
        h3.textContent = "Computer Won!";
      }

      resetGameDialog.showModal();

      resetBtn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }

  function gameRound(event) {
    handleUserAttack(event);
    handleComputerAttack();

    if (userClickCount >= 17) displayWinner();
  }

  computerBoardDOM.addEventListener("click", gameRound);
}

export default BattlefieldHandler;
