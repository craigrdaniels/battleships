import Gameboard from './gameboardFactory';

class Player {
  constructor(name = "Player", isAI = false) {
    this.gameboard = new Gameboard();
    this.isAI = isAI;
    this.turn = false;
    this.name = name;
  }

  get turn() {
    return this._turn; //eslint-disable-line
  }

  set turn(x) {
    this._turn = x; //eslint-disable-line
  }

  setTurn(enemy) {
    this.turn = true;
    enemy.turn = false; //eslint-disable-line
  }

  isValidAttack(player, x, y) {     //eslint-disable-line
    // make sure falls within bounds of gameboard
    if (x < 0 || x >= player.gameboard.board[0].length) return false;
    if (y < 0 || y >= player.gameboard.board.length) return false;

    if (player.gameboard.misses[y][x]) return false;
  
    if (player.gameboard.board[y][x]) {
      if (player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]) {
        return false;
      }
    }
    return true;
  }

  attack(player, x, y) {
    if (this.isValidAttack(player, x, y)) {
      player.gameboard.receiveAttack(x, y);
    }
  }

  attackRandom(player) {
    // check for any hits without sunk ships
    // check surrounding spaces, if not a valid move then choose the next 'hit'
    for (let i = 0; i < player.gameboard.board[0].length; i += 1) {
      for (let j = 0; j < player.gameboard.board.length; j += 1) {
        if (player.gameboard.board[j][i]) {
          if (player.gameboard.board[j][i].hits[player.gameboard.getShipIndex(i, j)] === 'hit' && !player.gameboard.board[j][i].isSunk()) {

            const attackVectors = [
              [-1, 0],
              [0, 1],
              [1, 0],
              [0, -1]
            ];

            for (let k = 0; k < attackVectors.length; k += 1) {
              if (this.isValidAttack(player, i + attackVectors[k][0], j + attackVectors[k][1])) {
                this.attack(player, i + attackVectors[k][0], j + attackVectors[k][1]);
                return;
              }
            }
          }
        }
      }
    }


    let success = false;
    while (success === false) {
      const x = Math.floor(Math.random() * player.gameboard.board[0].length);
      const y = Math.floor(Math.random() * player.gameboard.board.length);

      if (this.isValidAttack(player, x, y)) {
        this.attack(player, x, y);
        success = true;
        return;
      }
    }
  }
}

export default Player;
