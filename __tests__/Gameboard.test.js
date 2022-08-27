import Gameboard from "../src/factories/gameboardFactory";
import Ship from "../src/factories/shipFactory";

describe('Test Gameboard', () => {
  const theGameboard = new Gameboard();
  const theShip = new Ship(4);

  test('ship is added', () => {
    theGameboard.placeShip(theShip, 0, 0, true);
    expect(theGameboard.board[0][0]).toBe(theShip);
  });

  test('receive attack', () => {
    theGameboard.receiveAttack(5,5);
    expect(theGameboard.misses[5][5]).toBe('miss');
    theGameboard.receiveAttack(0,0);
    expect(theShip.hits[0]).toBe('hit');
    theGameboard.receiveAttack(1, 0);
    expect(theShip.hits[1]).toBe('hit');
  });

  test('all ships sunk', () => {
    expect(theGameboard.allShipsSunk()).toBe(false);
    for (let i = 0; i < theShip.length; i += 1) {
      theShip.hit(i);
    }
    expect(theGameboard.allShipsSunk()).toBe(true);
  });

  test('valid ship positions', () => {
    expect(theGameboard.isValidPosition(theShip, 6, 7, true)).toBe(true);
    expect(theGameboard.isValidPosition(theShip, 6, 7, false)).toBe(false);
    expect(theGameboard.isValidPosition(theShip, 7, 6, true)).toBe(false);
    expect(theGameboard.isValidPosition(theShip, 7, 6, false)).toBe(true);
  });
});