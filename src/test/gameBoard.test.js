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

  it("should return an array of object after add ship object to fleet", () => {
    playerBoard.addToFleet(carrier, battleship, cruiser, submarine, destroyer);

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
        { type: carrier.getName(), isHit: false },
        { type: carrier.getName(), isHit: false },
        { type: carrier.getName(), isHit: false },
        { type: carrier.getName(), isHit: false },
        { type: carrier.getName(), isHit: false },
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  it("should return false when place destroyer on 2d array but is out of array bound", () => {
    const destroyer = Ship("destroyer", 2);
    const x = 9;
    const y = 3;
    const orientation = "x";

    expect(playerBoard.placeShip(destroyer, x, y, orientation)).toBeFalsy();
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

  it("should return false if place ship on occupied cell", () => {
    const carrier = Ship("carrier", 5);
    const patrolBoat = Ship("patrol boat", 2);

    expect(playerBoard.placeShip(carrier, 5, 3, "y")).toBeTruthy();
    expect(playerBoard.placeShip(patrolBoat, 4, 3, "x")).toBeFalsy();
    expect(playerBoard.getBoard()).toEqual([
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", { type: carrier.getName(), isHit: false }, "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });
});

describe("receiveAttack function of Gameboard factory", () => {
  const playerBoard = Gameboard();

  const carrier = Ship("carrier", 5);
  const battleship = Ship("battleship", 4);
  const cruiser = Ship("cruiser", 3);
  const destroyer = Ship("destroyer", 2);

  playerBoard.addToFleet(carrier, battleship, cruiser, destroyer);

  playerBoard.placeShip(carrier, 3, 5, "x");
  playerBoard.placeShip(battleship, 0, 0, "x");
  playerBoard.placeShip(cruiser, 3, 7, "x");
  playerBoard.placeShip(destroyer, 9, 2, "y");

  it("should record coordinates of missed shot by marking it in playerBoard", () => {
    playerBoard.receiveAttack(1, 1);
    playerBoard.receiveAttack(3, 8);
    playerBoard.receiveAttack(2, 3);

    expect(playerBoard.getBoard()).toEqual([
      [
        { type: "battleship", isHit: false },
        { type: "battleship", isHit: false },
        { type: "battleship", isHit: false },
        { type: "battleship", isHit: false },
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["", 0, "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", { type: "destroyer", isHit: false }],
      ["", "", 0, "", "", "", "", "", "", { type: "destroyer", isHit: false }],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        { type: "carrier", isHit: false },
        { type: "carrier", isHit: false },
        { type: "carrier", isHit: false },
        { type: "carrier", isHit: false },
        { type: "carrier", isHit: false },
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        { type: "cruiser", isHit: false },
        { type: "cruiser", isHit: false },
        { type: "cruiser", isHit: false },
        "",
        "",
        "",
        "",
      ],
      ["", "", "", 0, "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);
  });

  it("should send hit to correct ship and change isHit to true in playerBoard", () => {
    // attack on battleship
    playerBoard.receiveAttack(1, 0);
    playerBoard.receiveAttack(2, 0);
    playerBoard.receiveAttack(3, 0);

    // attack on destroyer
    playerBoard.receiveAttack(9, 2);

    // attack on carrier
    playerBoard.receiveAttack(3, 5);
    playerBoard.receiveAttack(4, 5);
    playerBoard.receiveAttack(5, 5);

    // attack on cruiser
    playerBoard.receiveAttack(3, 7);
    playerBoard.receiveAttack(4, 7);

    expect(playerBoard.getBoard()).toEqual([
      [
        { type: "battleship", isHit: false },
        { type: "battleship", isHit: true },
        { type: "battleship", isHit: true },
        { type: "battleship", isHit: true },
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["", 0, "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", { type: "destroyer", isHit: true }],
      ["", "", 0, "", "", "", "", "", "", { type: "destroyer", isHit: false }],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        { type: "carrier", isHit: true },
        { type: "carrier", isHit: true },
        { type: "carrier", isHit: true },
        { type: "carrier", isHit: false },
        { type: "carrier", isHit: false },
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", "", ""],
      [
        "",
        "",
        "",
        { type: "cruiser", isHit: true },
        { type: "cruiser", isHit: true },
        { type: "cruiser", isHit: false },
        "",
        "",
        "",
        "",
      ],
      ["", "", "", 0, "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]);

    expect(carrier.getLives()).toEqual(2);
    expect(battleship.getLives()).toEqual(1);
    expect(cruiser.getLives()).toEqual(1);
    expect(destroyer.getLives()).toEqual(1);
  });

  describe("areAllSunk function of Gameboard factory", () => {
    it("should return false when there are still ships left", () => {
      // attack on cruiser
      playerBoard.receiveAttack(5, 7);
      // attack on destroyer
      playerBoard.receiveAttack(9, 3);

      expect(carrier.isSunk()).toBeFalsy();
      expect(battleship.isSunk()).toBeFalsy();

      // 2 ship sunk
      expect(cruiser.getLives()).toEqual(0);
      expect(cruiser.isSunk()).toBeTruthy();
      expect(destroyer.getLives()).toEqual(0);
      expect(destroyer.isSunk()).toBeTruthy();

      expect(playerBoard.areAllSunk()).toBeFalsy();
    });

    it("should return true when there is no ship left", () => {
      // attack on carrier
      playerBoard.receiveAttack(6, 5);
      playerBoard.receiveAttack(7, 5);
      // attack on battleship
      playerBoard.receiveAttack(0, 0);

      expect(carrier.getLives()).toEqual(0);
      expect(carrier.isSunk()).toBeTruthy();
      expect(battleship.getLives()).toEqual(0);
      expect(battleship.isSunk()).toBeTruthy();
    });
  });
});
