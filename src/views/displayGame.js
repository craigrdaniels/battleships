// import Game from "../factories/gameFactory";
import {initGame, newTurn, placeRandomShips} from '../components/GameController'; //eslint-disable-line
import Ship from '../factories/shipFactory';
import createHtmlElement from '../handlers/createHtmlElement';
import { dragStart, dragEnd, dragOver, dragLeave, drop } from './eventHandlers';

let theGame;

const redrawGameBoard = (player, id) => {
  const theBoard = document.getElementById(id);
  theBoard.parentNode.replaceChild(displayGameBoard(player), theBoard); //eslint-disable-line
};

const displayGameOverModalContent = () => {
  const element = createHtmlElement(
    'div',
    null,
    [
      'font-["PressStart2P"]',
      'text-white',
      'bg-black',
      'bg-opacity-50',
      'flex',
      'w-full',
      'h-24',
      'justify-center',
      'items-center',
    ],
    'GAME OVER'
  );

  return element;
};

const displayGameOverModal = () => {
  const element = createHtmlElement(
    'div',
    'game-over-modal',
    [
      'font-["PressStart2P"]',
      'flex',
      'items-center',
      'justify-center',
      'fixed',
      'z-10',
      'inset-0',
      'w-full',
      'h-full',
      'overflow-y-auto',
      'bg-gray-500',
      'bg-opacity-75',
    ],
    null
  );
  document.body.appendChild(element);

  element.appendChild(displayGameOverModalContent());

  window.onclick = (event) => {
    if (event.target === element) {
      theGame = initGame();
      // const game = document.getElementById('game');
      document.getElementById('game').parentNode.replaceChild(displayGame(theGame), document.getElementById('game')); // eslint-disable-line
      document.body.removeChild(element);
    }
  };
};

const displayRotateButton = () => { //eslint-disable-line
  const element = createHtmlElement(
    'button',
    null,
    ['font-["MaterialSymbols-Outlined"]'],
    "rotate_right"
  );

  return element;
}

const displayGameBoardTitle = (title, showButton = false) => { 
  const element = createHtmlElement(
    'div',
    null,
    ['font-["PressStart2P"]', 'col-span-10', 'flex', 'justify-between'],
    title
  );

  if (showButton) element.appendChild(displayRotateButton());

  return element;
};

const displayGameTile = (player, x, y, placeShips = false) => {
  const element = createHtmlElement(
    'div',
    null,
    [
      'font-["PressStart2P"]',
      'bg-white',
      'flex',
      'w-8',
      'h-8',
      'border',
      'border-slate-500',
      'text-black',
      'items-center',
      'justify-center',
    ],
    null
  );

  if (player.gameboard.board[y][x] && player.gameboard.board[y][x].isSunk()) {
    element.classList.remove('text-black');
    element.classList.add('text-red-500');
  }

  if (
    player.gameboard.board[y][x] &&
    player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]
  ) {
    element.innerHTML = 'X';
    element.classList.add('bg-blue-200');

    return element;
  }

  if (player.gameboard.misses[y][x]) {
    element.innerHTML = '•';
    return element;
  }

  if (player.isAI === false) {
    if (player.gameboard.board[y][x]) {
      element.classList.add('bg-blue-200');
      return element;
    }
  } else {
    element.classList.add('hover:bg-gray-400');

    // only allow player to click on AI board
    element.onclick = () => {
      const attackingPlayer =
        (theGame.players.findIndex((e) => e === player) + 1) % 2;
      if (theGame.players[attackingPlayer].isValidAttack(player, x, y)) {
        theGame.players[attackingPlayer].attack(player, x, y);

        let gameBoardId = 'gameboard';
        gameBoardId += (attackingPlayer + 1) % 2;
        redrawGameBoard(player, gameBoardId); //eslint-disable-line

        element.parentNode.replaceChild(displayGameTile(player, x, y), element);

        // check game over
        if (theGame.isGameOver()) {
          displayGameOverModal();
        } else {
          newTurn(player); // let AI have a turn
        }
      }
    };
  }

  if (placeShips) {

   element.addEventListener('dragover', (e) => dragOver(new Ship(0), player, x, y, false, e));
   // element.addEventListener('touchmove', dragOver);

   element.addEventListener('dragleave', dragLeave);
   element.addEventListener('drop', (e) => drop(new Ship(0), player, x, y, false, e));

  }

  return element;
};

const displayShipTile = () => {
  const element = createHtmlElement(
    'div',
    null,
    [
      'font-["PressStart2P"]',
      'bg-white',
      'flex',
      'w-8',
      'h-8',
      'border',
      'border-slate-500',
      'text-black',
      'items-center',
      'justify-center',
    ],
    null
  );

  return element;
}

const displayShip = (ship, isHorizontal = true) => {
  const element = createHtmlElement(
    'div',
    ship.type,
    ['flex', 'w-min', 'items-center', 'justify-center'],
    null
  );
  
  element.setAttribute("draggable", "true");


  if (isHorizontal) {
    element.classList.add('flex-row');
  } else {
    element.classList.add('flex-col');
  }

  for (let i = 0; i < ship.length; i += 1) {
    element.appendChild(displayShipTile());
  }

  element.addEventListener('touchmove', function(event) {  //eslint-disable-line
    const touch = event.targetTouches[0];

    element.classList.add('absolute');
    element.classList.add('z-50');

    element.style.left = touch.pageX - 1 + 'px'; //eslint-disable-line
    element.style.top = touch.pageY - 1 + 'px';//eslint-disable-line
    event.preventDefault();
  }, false);


  element.addEventListener('dragstart', dragStart);


  element.addEventListener('dragend', dragEnd);
  element.addEventListener('touchend', dragEnd);
  element.addEventListener('touchcancel', dragEnd);
  element.addEventListener('touchleave', dragEnd);



  return element;
}

const displayShipContainer = (ship, isHorizontal = true) => {
  const element = createHtmlElement(
    'div',
    null,
    ['flex', 'w-80', 'items-center', 'justify-center'],
    null
  );

  element.appendChild(displayShip(ship, isHorizontal));
  return element;
}


const displayGameBoard = (player, placeShips = false) => {
  const playerIndex = theGame.players.findIndex((p) => p === player);
  let gameBoardId = 'gameboard';
  gameBoardId += playerIndex;

  const element = createHtmlElement(
    'div',
    gameBoardId,
    ['grid', 'grid-cols-10', 'grid-rows-11', 'min-w-content'],
    null
  );

  if (placeShips === true) {
    element.appendChild(displayGameBoardTitle("Place Ships", true))
  } else {
    element.appendChild(displayGameBoardTitle(player.name));
  }  

  for (let i = 0; i < player.gameboard.board.length; i += 1) {
    for (let j = 0; j < player.gameboard.board[0].length; j += 1) {
      element.appendChild(displayGameTile(player, j, i, placeShips));
    }
  }

  return element;
};

const displayGame = (game = theGame, placeShips = false) => {
  theGame = game;
  const element = createHtmlElement(
    'div',
    'game',
    ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center', 'gap-8'],
    null
  );

  if (placeShips) element.appendChild(displayShipContainer(new Ship(0), false));
  if (!placeShips) element.appendChild(displayGameBoard(theGame.players[1]));
  element.appendChild(displayGameBoard(theGame.players[0], placeShips));

  // element.appendChild(displayGameOverModal());

  return element;
};

export { displayGame, displayGameOverModal, redrawGameBoard };
