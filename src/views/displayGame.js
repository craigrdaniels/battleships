import Game from "../factories/gameFactory";
import createHtmlElement from "../handlers/createHtmlElement"

const theGame = new Game();
theGame.placeRandomShips(theGame.players[0]);
theGame.placeRandomShips(theGame.players[1]);


const displayGameTile = (player, x, y) => {
  const element = createHtmlElement(
    'div',
    null,
    ['bg-white', 'w-8', 'h-8', 'border', 'border-slate-500', 'hover:bg-gray-400', 'text-black', 'text-center', 'align-middle'],
    null
  );
  
  element.id = y;
  element.id += ',';
  element.id += x;

  if (player === theGame.players[0]) {
    if (player.gameboard.board[y][x]) {
      element.innerHTML = 'X';
    }
  }

  if (player.gameboard.board[y][x] && player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]) {
    element.innerHTML = 'H';
  }
  
  if (player.gameboard.misses[y][x]) {
      element.innerHTML = '.';
  }

  return element;
}

const displayGameBoard = (player) => {
  const element = createHtmlElement(
    'div',
    null,
    ['grid', 'grid-cols-10', 'grid-rows-10', 'min-w-content'],
    null
  )
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j< 10; j += 1) {
      element.appendChild(displayGameTile(player, j, i));
    }
  }

  return element;
}


const displayGame = () => {
  const element = createHtmlElement(
    'div',
    'game',
    ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center', 'gap-8'],
    null
  );

  theGame.players[0].attackRandom(theGame.players[1]);

  element.appendChild(displayGameBoard(theGame.players[1]));
  element.appendChild(displayGameBoard(theGame.players[0]));

  return element;

  }

  export default displayGame