import Game from '../src/factories/gameFactory';
import Ship from '../src/factories/shipFactory';

describe('Test Game Factory', () => {
  const theGame = new Game();
  theGame.players.forEach((player) => {
    player.gameboard.placeShip(new Ship(4), 0, 0, true);
  });

  test('Game Over', () => {
    expect(theGame.isGameOver()).toBe(false);
    theGame.players[1].attack(theGame.players[0], 1, 0);
    theGame.players[1].attack(theGame.players[0], 0, 0);

    expect(theGame.isGameOver()).toBe(true);
  });

  test('Play Game', () => {
    const secondGame = new Game();
    secondGame.players.forEach((player) => {
      secondGame.placeRandomShips(player);
    });

    // to do: % by num players to allow for more than 3
    let turn = 0;
    const numPlayers = secondGame.players.length;
    while (!secondGame.isGameOver()) {
      secondGame.players[turn % numPlayers].attackRandom(
        secondGame.players[(turn + 1) % numPlayers]
      );
      turn += 1;
    }
    const winner = ((turn - 1) % numPlayers) + 1;
    console.log('Player %d wins in %d turns!', winner, turn);

    expect(turn).toBeGreaterThan(1);
  });
});
