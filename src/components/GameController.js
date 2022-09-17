import Game from "../factories/gameFactory";
import { redrawGameBaord } from "../views/displayGame"; //eslint-disable-line

let game; //eslint-disable-line

const initGame = () => {
  game = new Game();
  game.players[0].setTurn(game.players[1]);
}

const placeRandomShips = () => {
  // for now place random ships
  game.players.forEach((player) => game.placeRandomShips(player));
}

const newTurn = (player) => { 
  if (player.isAI === true) {
    const playerIndex = game.players.findIndex((p) => p === player);
    game.players[playerIndex].attackRandom(game.players[(playerIndex + 1) % 2]);

    let gameBoardId = "gameboard";
    gameBoardId += (playerIndex + 1) % 2;

    redrawGameBaord(game.players[(playerIndex + 1) % 2], gameBoardId);

    // check game over
    if (game.isGameOver()) console.log('GAME OVER'); //eslint-disable-line

  }
}



export { initGame, placeRandomShips, newTurn, game}