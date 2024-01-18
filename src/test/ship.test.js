/* eslint-disable no-undef */
import Ship from "../components/ship";

describe("Ship factory", () => {
  const battleship = Ship("battleship", 4);

  it("should return an object", () => {
    expect(typeof battleship).toEqual("object");
  });

  it("should return lowercase shipName when call getShipName", () => {
    expect(battleship.getShipName()).toEqual("battleship");
  });

  it("should return shipLength when call getShipLength", () => {
    expect(battleship.getShipLength()).toEqual(4);
  });

  it("should return shipLives when call getShipLives", () => {
    expect(battleship.getShipLives()).toEqual(4);
  });

  it("should modify shipLives when call isHit", () => {
    battleship.isHit();

    expect(battleship.getShipLives()).toEqual(3);
  });

  it("should return a boolean when call isSunk", () => {
    expect(typeof battleship.isSunk()).toEqual("boolean");
  });

  it("should return false when shipLives is bigger than 0", () => {
    expect(battleship.isSunk()).toEqual(false);
  });

  it("should return true when shipLives is equal to 0", () => {
    battleship.isHit();
    battleship.isHit();
    battleship.isHit();

    expect(battleship.isSunk()).toEqual(true);
  });
});
