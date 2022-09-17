import { initGame, game } from "../src/components/GameController";
import Game from "../src/factories/gameFactory";

test('initgame', () => {
  initGame();
  expect(game).toBeInstanceOf(Game);
});

// TO DO:
// Test placeRandomShips(), newTurn()