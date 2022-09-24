import Game from '../factories/gameFactory';
import Ship from '../factories/shipFactory';
import {displayGame, displayGameOverModal,redrawGameBoard} from '../views/displayGame'; //eslint-disable-line
import { SHIP_TYPES } from './Ships';

let game; //eslint-disable-line

const initGame = () => {
  game = new Game();
  game.players[0].setTurn(game.players[1]);

  // place enemy ships
  game.placeRandomShips(game.players[1]);
  return game;
};

const createFleet = () => {
  const fleet = [];
  SHIP_TYPES.forEach((shipType, index) => { //eslint-disable-line
    const ship = new Ship(index);
    fleet.push(ship);
  });
  return fleet;
}


const newTurn = (player) => {
  if (player.isAI === true) {
    const playerIndex = game.players.findIndex((p) => p === player);
    game.players[playerIndex].attackRandom(game.players[(playerIndex + 1) % 2]);

    let gameBoardId = 'gameboard';
    gameBoardId += (playerIndex + 1) % 2;

    redrawGameBoard(game.players[(playerIndex + 1) % 2], gameBoardId);

    // check game over
    if (game.isGameOver()) {
      console.log('GAME OVER'); //eslint-disable-line
      displayGameOverModal();
    }
  }
};

export { initGame, newTurn, createFleet, game };
