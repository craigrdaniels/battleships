import displayHeader from '../src/views/displayHeader';

test('header gets displayed', () => {
  const element = (displayHeader());
  expect(element.id).toBe('header');
});
