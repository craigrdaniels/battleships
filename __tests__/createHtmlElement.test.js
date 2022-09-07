import createHtmlElement from '../src/handlers/createHtmlElement';

test('createHtmlElement returns HTML element', () => {
  const element = createHtmlElement('div', 'test id', null, 'test');
  expect(element).toBeInstanceOf(HTMLElement);
  expect(element.id).toBe('test id');
  expect(element.innerHTML).toBe('test');
});
