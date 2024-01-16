/* eslint-disable no-undef */
import Ship from "../components/ship";

describe("Ship factory", () => {
  it("should return an object", () => {
    const myShip = Ship("battleship", 4);

    expect(typeof myShip).toEqual("object");
  });

  it("create carrier", () => {
    const carrier = Ship("Carrier", 5);

    expect(carrier.getShipName()).toEqual("Carrier");
  });

  it("should return shipName when call getShipName", () => {
    const battleship = Ship("Battleship", 4);

    expect(battleship.getShipName()).toEqual("Battleship");
  });

  it("should return shipLength when call getShipLength", () => {
    const battleship = Ship("Battleship", 4);

    expect(battleship.getShipLength()).toEqual(4);
  });

  it("should return shipLives when call getShipLives", () => {
    const battleship = Ship("Battleship", 4);

    expect(battleship.getShipLives()).toEqual(4);
  });

  it("should return updated shipLives when call isHit", () => {
    const battleship = Ship("Battleship", 4);

    expect(battleship.isHit()).toEqual(3);
  });

  it("should return a boolean when call isSunk", () => {
    const battleship = Ship("Battleship", 4);

    expect(typeof battleship.isSunk()).toEqual("boolean");
  });

  it("should return false when shipLives is bigger than 0", () => {
    const battleship = Ship("Battleship", 4);

    expect(battleship.isSunk()).toEqual(false);
  });

  it("should return true when shipLives is equal to 0", () => {
    const battleship = Ship("Battleship", 4);
    battleship.isHit();
    battleship.isHit();
    battleship.isHit();
    battleship.isHit();

    expect(battleship.isSunk()).toEqual(true);
  });
});
