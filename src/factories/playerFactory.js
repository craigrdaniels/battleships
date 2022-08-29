import Gameboard from './gameboardFactory';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  isValidAttack(player, x, y) {     //eslint-disable-line
    if (!player.gameboard.misses[y][x]) {
      if (player.gameboard.board[y][x]) {
        if (player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]) {
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

  // For now just attack randomly
  // ToDo: add intelligence to pick around a 'hit' for less turns
  attackRandom(player) {
    let success = false;
    while (success === false) {
      const x = Math.floor(Math.random() * player.gameboard.board[0].length);
      const y = Math.floor(Math.random() * player.gameboard.board.length);

      if (this.isValidAttack(player, x, y)) {
        this.attack(player, x, y);
        success = true;
      }
    }
  }
}

export default Player;
