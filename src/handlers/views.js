// import { displayGame } from '../views/displayGame';
import displayHeader from '../views/displayHeader';
import createHtmlElement from './createHtmlElement';
import { initGame, createFleet, game} from '../components/GameController';
import { displayGame } from '../views/displayGame';

const getElement = (selector, parentNode = document) =>
  parentNode.querySelector(selector);

const setTheme = () => {
  // set light / dark theme based on media preference
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const mainLayout = () => {
  const element = createHtmlElement(
    'div',
    null,
    ['flex', 'flex-col', 'w-full', 'content-center', 'gap-8'],
    null
  );

  initGame();

  element.appendChild(displayHeader());
  element.appendChild(displayGame(game, createFleet()));

  return element;
};

const loadViews = (selector) => {
  setTheme();

  const mainContent = getElement(selector);
  mainContent.appendChild(mainLayout());
};
export default loadViews;
