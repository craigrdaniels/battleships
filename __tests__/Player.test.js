import Player from "../src/factories/playerFactory";
import Ship from "../src/factories/shipFactory";

describe('Test Player', () => {
  const player1 = new Player();
  const player2 = new Player();
  const theShip = new Ship(3);

  player2.gameboard.placeShip(theShip, 7, 9, true);

  test('player attack', () => {
    player1.attack(player2, 1, 1);
    player1.attack(player2, 7, 9);
    expect(player2.gameboard.misses[1][1]).toBe('miss');
    expect(theShip.hits[0]).toBe('hit');
  });

  test('valid attack', () => {
    expect(player1.isValidAttack(player2, 1, 1)).toBe(false);
    expect(player2.isValidAttack(player1, 1, 1)).toBe(true);
    expect(player1.isValidAttack(player2, 8, 9)).toBe(true);
    expect(player1.isValidAttack(player2, 7, 9)).toBe(false);
  });

  test('random attack', () => {
    player1.attackRandom(player2);
    let count = 0;
    for (let i = 0; i < player2.gameboard.misses.length; i += 1) {
      for (let j = 0; j < player2.gameboard.misses[i].length; j += 1) {
        if (player2.gameboard.misses[i][j] === 'miss') count += 1;
      }
    }
    expect(count).toBe(2);
  })
});