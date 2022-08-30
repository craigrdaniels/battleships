const SIZE = 10;

class Gameboard {
  constructor() {
    this.board = Array.from(Array(SIZE), () => new Array(SIZE));
    this.misses = Array.from(Array(SIZE), () => new Array(SIZE));
  }

  isValidPosition(ship, x, y, isHorizontal) { //eslint-disable-line
    // check horizontal overlapping ships & not off gameboard edge
    if (isHorizontal === true) {
      if (x + ship.length > SIZE) return false;

      for (let i = 0; i < ship.length; i += 1) {
        if (this.board[y][x + i]) return false;
      }
    }

    // check vertical overlapping ships & not off gameboard edge
    if (isHorizontal === false) {
      if (y + ship.length > SIZE) return false;

      for (let i = 0; i < ship.length; i += 1) {
        if (this.board[y + i][x]) return false;
      }
    }    

    return true;
  }

  placeShip(ship, x, y, isHorizontal) {
    // check if posisble to place peice
    if (!this.isValidPosition(ship, x, y, isHorizontal)) return;

    // places horizontal - toadd vertical placement
    if (isHorizontal === true) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[y][x + i] = ship;
      }
    }

    if (isHorizontal === false) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[y + i][x] = ship;
      }
    }
  }

  getShipIndex(x, y) {
    let hitIndex = 0;
    // check horizontal
    for (let i = 1; i < this.board[y][x].length; i += 1) {
      if (x - i >= 0) {
        if (this.board[y][x - i] === this.board[y][x]) {
          hitIndex += 1;
        }
      }
    }
    // check vertical
    for (let i = 1; i < this.board[y][x].length; i += 1) {
      if (y - i >= 0) {
        if (this.board[y - i][x] === this.board[y][x]) {
          hitIndex += 1;
        }
      }
    }
    return hitIndex;
  }

  receiveAttack(x, y) {
    // check if hit a ship
    if (this.board[y][x]) {
      this.board[y][x].hit(this.getShipIndex(x, y));
    } else {
      this.misses[y][x] = 'miss';
    }
  }

  allShipsSunk() {
    for (let i = 0; i < SIZE; i += 1) {
      for (let j = 0; j < SIZE; j += 1) {
        if (this.board[i][j]) {
          if (!this.board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

export default Gameboard;
