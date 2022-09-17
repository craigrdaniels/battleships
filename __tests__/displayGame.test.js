import Game from '../src/factories/gameFactory';
import { displayGame } from '../src/views/displayGame';

test('game gets displayed', () => {
  const element = (displayGame(new Game()));
  expect(element.id).toBe('game');
});
