// import Game from "../factories/gameFactory";
import { newTurn } from "../components/GameController"; //eslint-disable-line
import createHtmlElement from "../handlers/createHtmlElement"

let theGame;

const displayGameTile = (player, x, y) => {
  const element = createHtmlElement(
    'div',
    null,
    ['font-["PressStart2P"]', 'bg-white', 'w-8', 'h-8', 'border', 'border-slate-500', 'text-black', 'text-center', 'align-middle'],
    null
  );
  
  if (player.gameboard.board[y][x] && player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]) {
    element.innerHTML = 'H';
    return element;
  }
  
  if (player.gameboard.misses[y][x]) {
      element.innerHTML = '.';
      return element;
  }

  if (player.isAI === false) {
    if (player.gameboard.board[y][x]) {
      element.innerHTML = 'X';
      return element;
    }
  } else {

    element.classList.add('hover:bg-gray-400');

    // only allow player to click on AI board
    element.onclick = () => {
      const attackingPlayer = (theGame.players.findIndex((e) => e === player) + 1) % 2;
      if (theGame.players[attackingPlayer].isValidAttack(player, x, y)) {
        theGame.players[attackingPlayer].attack(player, x, y);
        element.parentNode.replaceChild(displayGameTile(player, x, y), element);
        newTurn(player);
      }
    }
  }

  return element;
}

const displayGameBoard = (player) => {

  const playerIndex = theGame.players.findIndex((p) => p === player);
  let gameBoardId = "gameboard";
  gameBoardId += playerIndex;

  const element = createHtmlElement(
    'div',
    gameBoardId,
    ['grid', 'grid-cols-10', 'grid-rows-10', 'min-w-content'],
    null
  )
  for (let i = 0; i < player.gameboard.board.length; i += 1) {
    for (let j = 0; j< player.gameboard.board[0].length; j += 1) {
      element.appendChild(displayGameTile(player, j, i));
    }
  }

  return element;
}

const redrawGameBaord = (player, id) => {
  const theBoard = document.getElementById(id);
  theBoard.parentNode.replaceChild(displayGameBoard(player), theBoard);
}


const displayGame = (game) => {
  theGame = game;
  const element = createHtmlElement(
    'div',
    'game',
    ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center', 'gap-8'],
    null
  );

  element.appendChild(displayGameBoard(theGame.players[1]));
  element.appendChild(displayGameBoard(theGame.players[0]));

  return element;

  }

  export {displayGame, redrawGameBaord}