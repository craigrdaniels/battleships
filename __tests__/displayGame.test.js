import displayGame from '../src/views/displayGame';

test('game gets displayed', () => {
  const element = (displayGame());
  expect(element.id).toBe('game');
});
