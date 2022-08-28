import Game from "../src/factories/gameFactory";
import Ship from "../src/factories/shipFactory";

describe('Test Game Factory', () => {
  const theGame = new Game();
  theGame.players.forEach((player) => {
    player.gameboard.placeShip(new Ship(1), 0, 0, true);
  });

  test('Game Over', () => {
      expect(theGame.isGameOver()).toBe(false);
      theGame.players[1].attack(theGame.players[0], 0, 0);
      expect(theGame.isGameOver()).toBe(true);
  })
});