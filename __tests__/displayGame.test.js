import Game from '../src/factories/gameFactory';
import {
  displayGame,
  displayGameOverModal,
} from '../src/views/displayGame';

const theGame = new Game();
const element = displayGame(theGame);

test('game gets displayed', () => {
  expect(element.id).toBe('game');
  expect(document.getElementById('game')).toBeDefined();
});

test('game over modal gets displayed', () => {
  displayGameOverModal();
  expect(document.getElementById('game-over-modal')).toBeDefined();
});

// test('redraw gameboard', () => {
//   redrawGameBoard(theGame.players[0], 0);
//   expect(document.getElementById('gameboard0')).toBeDefined();
// });
