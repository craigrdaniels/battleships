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
    console.log(playerIndex); //eslint-disable-line
    game.players[playerIndex].attackRandom(game.players[(playerIndex + 1) % 2]);
    console.log("AI Attack"); //eslint-disable-line

    let gameBoardId = "gameboard";
    gameBoardId += (playerIndex + 1) % 2;

    redrawGameBaord(game.players[(playerIndex + 1) % 2], gameBoardId);

  }
}

export { initGame, placeRandomShips, newTurn, game}
