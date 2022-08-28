import Player from "./playerFactory";
import Ships from "../components/Ships";
import Ship from "./shipFactory";

class Game {
  constructor() {
    this.players = [];
    this.players[0] = new Player();
    this.players[1] = new Player();
  }

  //  
  placeShips() {
    this.players.forEach((player) => {
      Ships.forEach((ship, index) => {
        player.gameboard.placeShip(new Ship(ship[index].length), index, 0, true);
      })
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