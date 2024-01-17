/* eslint-disable no-undef */
import Gameboard from "../components/gameBoard";
import Ship from "../components/ship";

describe("Gameboard factory for player gameBoard", () => {
  const playerBoard = Gameboard();

  const carrier = Ship("carrier", 5);
  const battleship = Ship("battleship", 4);
  const cruiser = Ship("cruiser", 3);
  const submarine = Ship("submarine", 3);
  const destroyer = Ship("destroyer", 2);

  it("should return an array when call getBoard", () => {
    expect(Array.isArray(playerBoard.getBoard())).toEqual(true);
  });

  it("should return an array when call getFleet", () => {
    expect(Array.isArray(playerBoard.getFleet())).toEqual(true);
  });

  it("should return an array of object after add ship object to fleet", () => {
    playerBoard.addToFleet(carrier);
    playerBoard.addToFleet(battleship);
    playerBoard.addToFleet(cruiser);
    playerBoard.addToFleet(submarine);
    playerBoard.addToFleet(destroyer);

    expect(playerBoard.getFleet()).toEqual([carrier, battleship, cruiser, submarine, destroyer]);
  });

  it("should return specific ship object after calling getShip", () => {
    playerBoard.addToFleet(carrier);

    expect(playerBoard.getShip("carrier")).toEqual(carrier);
  });
});

describe("placeShip function of Gameboard factory", () => {
  let playerBoard;

  beforeEach(() => {
    playerBoard = Gameboard();
  });

  it("place carrier on 2d array", () => {
    const carrier = Ship("carrier", 5);
    const x = 3;
    const y = 5;
    const orientation = "x";

    playerBoard.placeShip(carrier, x, y, orientation);

    expect(playerBoard.getBoard()).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        { type: carrier.getShipName(), isHit: false },
        { type: carrier.getShipName(), isHit: false },
        { type: carrier.getShipName(), isHit: false },
        { type: carrier.getShipName(), isHit: false },
        { type: carrier.getShipName(), isHit: false },
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  it("place battleship on 2d array", () => {
    const battleship = Ship("battleship", 4);
    const x = 4;
    const y = 2;
    const orientation = "y";

    playerBoard.placeShip(battleship, x, y, orientation);

    expect(playerBoard.getBoard()).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", { type: battleship.getShipName(), isHit: false }, "", "", "", "", ""],
      ["", "", "", "", { type: battleship.getShipName(), isHit: false }, "", "", "", "", ""],
      ["", "", "", "", { type: battleship.getShipName(), isHit: false }, "", "", "", "", ""],
      ["", "", "", "", { type: battleship.getShipName(), isHit: false }, "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  it("place submarine on 2d array", () => {
    const submarine = Ship("submarine", 3);
    const x = 7;
    const y = 8;
    const orientation = "x";

    playerBoard.placeShip(submarine, x, y, orientation);

    expect(playerBoard.getBoard()).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        { type: submarine.getShipName(), isHit: false },
        { type: submarine.getShipName(), isHit: false },
        { type: submarine.getShipName(), isHit: false },
      ],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  it("place destroyer on 2d array but is out of array bound so modify none", () => {
    const destroyer = Ship("destroyer", 2);
    const x = 9;
    const y = 3;
    const orientation = "x";

    playerBoard.placeShip(destroyer, x, y, orientation);

    expect(playerBoard.getBoard()).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  it("should modify none if place ship on occupied cell", () => {
    const carrier = Ship("carrier", 5);
    const patrolBoat = Ship("patrol boat", 2);

    playerBoard.placeShip(carrier, 5, 3, "y");
    playerBoard.placeShip(patrolBoat, 4, 3, "x");

    expect(playerBoard.getBoard()).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getShipName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getShipName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getShipName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getShipName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getShipName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });
});
