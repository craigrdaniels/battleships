import {initGame, newTurn, placeRandomShips} from '../components/GameController'; //eslint-disable-line
import Ship from '../factories/shipFactory';
import createHtmlElement from '../handlers/createHtmlElement';
import { dragStart, dragEnd, dragOver, dragLeave, drop } from './eventHandlers'; //eslint-disable-line

let theGame;
let theFleet = [];

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

const displayRotateButton = (ship) => { //eslint-disable-line
  const element = createHtmlElement(
    'button',
    null,
    [
      'flex',
      'font-["MaterialSymbols-Outlined"]',
      'place-self-end'
    ],
    "rotate_right"
  );

  element.onclick = () => {
    ship.rotate();
    document.getElementById('placeship').parentElement.replaceChild(displayShip(ship), document.getElementById('placeship')); //eslint-disable-line

  }

  return element;
}

const displayGameBoardTitle = (title) => { 
  const element = createHtmlElement(
    'div',
    null,
    ['font-["PressStart2P"]', 'col-span-10', 'flex', 'justify-between'],
    title
  );

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

   element.addEventListener('dragover', (e) => dragOver(new Ship(0), player, x, y, true, e));
   element.addEventListener('dragleave', dragLeave);
   element.addEventListener('drop', (e) => drop(new Ship(0), player, x, y, true, e));

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

const displayShip = (ship) => {
  const element = createHtmlElement(
    'div',
    'placeship',
    [
      'flex',
      'w-min',
      'items-center',
      'place-self-center',
      'justify-center'
    ],
    null
  );
  
  element.setAttribute("draggable", "true");


  if (ship.isHorizontal) {
    element.classList.add('flex-row');
  } else {
    element.classList.add('flex-col');
  }

  for (let i = 0; i < ship.length; i += 1) {
    element.appendChild(displayShipTile());
  }

  element.addEventListener('dragstart', dragStart);
  element.addEventListener('dragend', dragEnd);

  return element;
}

const displayShipTitle = (ship) => {
  const element = createHtmlElement(
    'div',
    null,
    [
      'grid',
      'grid-rows-1',
      'grid-cols-2',
      'font-["PressStart2P"]',
      'w-full',
      'place-self-end'
    ],
    '&nbsp;'
  )
  element.innerHTML = ship.type;
  element.appendChild(displayRotateButton(ship));


  return element;
}

const displayShipContainer = (fleet) => {
  const element = createHtmlElement(
    'div',
    null,
    ['grid', 'h-80', 'w-80'],
    null
  );

  const ship = fleet.shift();
  console.log(ship); //eslint-disable-line

  element.appendChild(displayShip(ship));
  element.appendChild(displayShipTitle(ship));
  
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

const displayGame = (game = theGame, fleet = theFleet) => {
  theGame = game;
  theFleet = fleet;
  const element = createHtmlElement(
    'div',
    'game',
    ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center', 'gap-8'],
    null
  );


  if (fleet.length > 0) element.appendChild(displayShipContainer(fleet));
  if (fleet.length === 0) element.appendChild(displayGameBoard(theGame.players[1]));
  element.appendChild(displayGameBoard(theGame.players[0], true));

  return element;
};

export { displayGame, displayGameOverModal, redrawGameBoard, displayShip };
