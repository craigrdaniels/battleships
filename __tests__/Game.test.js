import Game from "../src/factories/gameFactory";
import Ship from "../src/factories/shipFactory";

describe('Test Game Factory', () => {
  const theGame = new Game();
  theGame.players.forEach((player) => {
    player.gameboard.placeShip(new Ship(2), 0, 0, true);
  });

  test('Game Over', () => {
      expect(theGame.isGameOver()).toBe(false);
      theGame.players[1].attack(theGame.players[0], 1, 0);
      theGame.players[1].attack(theGame.players[0], 0, 0);

      expect(theGame.isGameOver()).toBe(true);
  });


  test('Play Game', () => {
    const secondGame = new Game();
    secondGame.placeShips();

    let turn = 0;
    while(!(secondGame.isGameOver())) {
      secondGame.players[turn % 2].attackRandom(secondGame.players[(turn + 1) % 2]);
      turn += 1;
    }
    const winner = ((turn-1) % 2) + 1;
    console.log("Player %d wins in %d turns!", winner, turn);
  
    expect(turn).toBeGreaterThan(1);
  });

});