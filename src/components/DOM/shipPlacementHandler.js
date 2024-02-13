/* eslint-disable no-plusplus */
import { capitalize, isValidPlacement } from "../supportFnc";

function highlightCells(srtX, srtY, axis, playerBoard, shipLength, shipBoardDOM) {
  let x;
  let y;

  const className = isValidPlacement(playerBoard, srtX, srtY, axis, shipLength) ? "valid" : "invalid";

  for (let i = 0; i < shipLength; i++) {
    x = axis === "x" ? srtX + i : srtX;
    y = axis === "x" ? srtY : srtY + i;

    if (x >= 10 || y >= 10) break;

    const cell = shipBoardDOM.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`);
    cell.classList.add(className);
  }
}

function removeHighLight(srtX, srtY, axis, shipLength, shipBoardDOM) {
  let x;
  let y;

  for (let i = 0; i < shipLength; i++) {
    x = axis === "x" ? srtX + i : srtX;
    y = axis === "x" ? srtY : srtY + i;

    if (x >= 10 || y >= 10) break;

    const cell = shipBoardDOM.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`);
    cell.classList.remove("valid", "invalid");
  }
}

function highLightShipCell(srtX, srtY, axis, currShip, shipBoardDOM, playerBoardDOM) {
  let x;
  let y;

  for (let i = 0; i < currShip.getLength(); i++) {
    x = axis === "x" ? srtX + i : srtX;
    y = axis === "x" ? srtY : srtY + i;

    // shipBoardDOM
    const cell = shipBoardDOM.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`);
    cell.classList.remove("empty");
    cell.setAttribute("data-ship", currShip.getName());

    // playerBoardDOM
    const pCell = playerBoardDOM.querySelector(`.cell[data-y="${y}"][data-x="${x}"]`);
    pCell.classList.remove("empty");
    pCell.setAttribute("data-ship", currShip.getName());
  }
}

function shipPlacementHandler(shipPlacementDialog, playerBoard, playerBoardDOM) {
  const instruction = shipPlacementDialog.querySelector(".instruction");
  const changeAxis = shipPlacementDialog.querySelector(".change-axis");
  const shipBoardDOM = shipPlacementDialog.querySelector(".ship-board");

  const fleet = playerBoard.getFleet();
  let currShipIndex = 0;
  let currShip = fleet[currShipIndex];
  let isHorizontal = true;

  const updateInstruction = () => {
    instruction.textContent = `Place your ${capitalize(currShip.getName())}`;
  };

  changeAxis.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
    changeAxis.textContent = isHorizontal ? "Axis: X" : "Axis: Y";
  });

  function handleHover(event) {
    if (!event.target.classList.contains("cell")) return;

    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);
    const axis = isHorizontal ? "x" : "y";

    highlightCells(x, y, axis, playerBoard.getBoard(), currShip.getLength(), shipBoardDOM);
  }

  function handlePointerOut(event) {
    if (!event.target.classList.contains("cell")) return;

    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);
    const axis = isHorizontal ? "x" : "y";

    removeHighLight(x, y, axis, currShip.getLength(), shipBoardDOM);
  }

  function placeShipHandler(event) {
    if (!event.target.classList.contains("cell")) return;

    const srtX = parseInt(event.target.dataset.x, 10);
    const srtY = parseInt(event.target.dataset.y, 10);
    const axis = isHorizontal ? "x" : "y";

    // 2D Array
    const isSuccessful = playerBoard.placeShip(currShip, srtX, srtY, axis);

    // shipBoardDOM and playerBoardDOM
    if (isSuccessful) {
      highLightShipCell(srtX, srtY, axis, currShip, shipBoardDOM, playerBoardDOM);

      currShipIndex++;

      if (currShipIndex === 5) shipPlacementDialog.close();
      else {
        currShip = fleet[currShipIndex];
        updateInstruction();
      }
    }
  }

  shipBoardDOM.addEventListener("pointerover", handleHover);
  shipBoardDOM.addEventListener("pointerout", handlePointerOut);
  shipBoardDOM.addEventListener("click", placeShipHandler);
}

export default shipPlacementHandler;
