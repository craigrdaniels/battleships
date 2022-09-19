import createHtmlElement from '../handlers/createHtmlElement';

const headerText = () => {
  const element = createHtmlElement(
    'h1',
    'null',
    [
      'font-["PressStart2P"]',
      'text-2xl',
      'text-center',
      'align-middle',
      'leading-10',
    ],
    'BattleShip'
  );

  return element;
};

const displayHeader = () => {
  const element = createHtmlElement('header', 'header', [], null);

  element.appendChild(headerText());

  return element;
};

export default displayHeader;
