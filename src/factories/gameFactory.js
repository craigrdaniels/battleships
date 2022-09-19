import Player from "./playerFactory";
import Ship from "./shipFactory";
import { SHIP_TYPES } from "../components/Ships";

class Game {
  constructor() {
    this.players = [];
    this.players[0] = new Player("Player");
    this.players[1] = new Player("Enemy", true);
  }

  placeRandomShips(player) { //eslint-disable-line
    SHIP_TYPES.forEach((ship, index) => {
      const theShip = new Ship(index);
      let success = false;
      while(!success){
        const isHorizontal = Math.random() < 0.5;
        const x = Math.floor(Math.random() * player.gameboard.board[0].length);
        const y = Math.floor(Math.random() * player.gameboard.board.length);

        if (player.gameboard.isValidPosition(theShip, x, y, isHorizontal)) {
          player.gameboard.placeShip(theShip, x, y, isHorizontal);
          success = true;
        }
      }
    });
  }

  isGameOver() {
    let gameOver = false;
    this.players.forEach((player) => {
      if (player.gameboard.allShipsSunk() === true) gameOver = true;
    });
    return gameOver;
  }

}

export default Game;