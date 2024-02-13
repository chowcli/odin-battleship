/* eslint-disable no-undef */
import Player from "../components/player";

describe("Player vs Computer", () => {
  const p1 = Player("AI");
  const p2 = Player();
  const board2 = p2.getBoard();
  const fleet2 = board2.getFleet();

  p1.prepareFleet();
  p2.prepareFleet();

  p1.setEnemyBoard(p2.getBoard());
  p2.setEnemyBoard(p1.getBoard());

  board2.placeShip(fleet2[0], 3, 2, "x");
  board2.placeShip(fleet2[1], 0, 1, "y");
  board2.placeShip(fleet2[2], 4, 9, "x");
  board2.placeShip(fleet2[3], 8, 3, "y");
  board2.placeShip(fleet2[4], 6, 8, "x");

  it("should randomly place ship for player 1", () => {
    const initialBoard = JSON.stringify(p1.getBoard().getBoard());
    p1.randomShipPlacement();
    const updatedBoard = JSON.stringify(p1.getBoard().getBoard());

    // Check if the updated board is different from the initial board
    expect(updatedBoard).not.toEqual(initialBoard);
  });

  it("should return undefined when try to call AI method on human type", () => {
    expect(p2.randomAttack).toBeUndefined();
  });

  it("Player1: should return true if randomAttack is successful", () => {
    const result = p1.randomAttack();

    expect(result.attackSuccessful === 1 || result.attackSuccessful === 2).toBeTruthy();
  });

  it("Player2: should return true if attack is successful", () => {
    expect(p2.attack(1, 3)).toBeTruthy();
    expect(p2.attack(3, 5)).toBeTruthy();
    expect(p2.attack(2, 1)).toBeTruthy();
    expect(p2.attack(0, 2)).toBeTruthy();
    expect(p2.attack(4, 3)).toBeTruthy();
    expect(p2.attack(2, 3)).toBeTruthy();
    expect(p2.attack(5, 3)).toBeTruthy();
    expect(p2.attack(8, 2)).toBeTruthy();
    expect(p2.attack(4, 1)).toBeTruthy();
    expect(p2.attack(2, 0)).toBeTruthy();
    expect(p2.attack(9, 4)).toBeTruthy();
    expect(p2.attack(7, 4)).toBeTruthy();
    expect(p2.attack(5, 2)).toBeTruthy();
  });

  it("Player2: should return 0 if attack is on a hit cell", () => {
    expect(p2.attack(1, 3)).toEqual(0);
  });
});
