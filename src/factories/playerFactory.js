import Gameboard from './gameboardFactory';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  isValidAttack(player, x, y) {     //eslint-disable-line
    if (!player.gameboard.misses[y][x]) {
      if (player.gameboard.board[y][x]) {
        if (
          player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  attack(player, x, y) {
    if (this.isValidAttack(player, x, y)) {
      player.gameboard.receiveAttack(x, y);
    }
  }

  attackRandom(player) {
    let success = false;
    while (success === false) {
      // assuming both players have the same board size
      const x = Math.floor(Math.random() * this.gameboard.board[0].length);
      const y = Math.floor(Math.random() * this.gameboard.board.length);

      if (this.isValidAttack(player, x, y)) {
        this.attack(player, x, y);
        success = true;
      }
    }
  }
}

export default Player;
