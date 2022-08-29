import Player from "./playerFactory";
import Ship from "./shipFactory";
import { SHIP_TYPES, SHIP_LENGTHS } from "../components/Ships";

class Game {
  constructor() {
    this.players = [];
    this.players[0] = new Player();
    this.players[1] = new Player();
  }

  // for now just place ships next to each other, vertically all at y-index 0
  // ToDo: place randomly - checking ships are not overlapping or off board edge
  placeShips() {
    this.players.forEach((player) => {
      SHIP_TYPES.forEach((ship, index) => {
        player.gameboard.placeShip(new Ship(SHIP_LENGTHS[ship]), index, 0, false);
      });
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