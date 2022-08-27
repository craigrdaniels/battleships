import Ship from "./shipFactory";

const SIZE = 10;

class Gameboard {
  constructor() {
    this.board = Array.from(Array(SIZE), () => new Array(SIZE));
    this.misses = Array.from(Array(SIZE), () => new Array(SIZE));
  }


  placeShip(ship, x, y, isHorizontal) {
    // check if posisble to place peice


    // places horizontal - toadd vertical placement
    if (isHorizontal === true) {
      for (let i = 0; i < ship.length; i += 1){
        this.board[y][x + i] = ship;
      }
    }

    if (isHorizontal === false) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[y + i][x] = ship;
      }
    }

  }

  receiveAttack(x, y) {

    // check if hit a ship
    if (this.board[y][x]) {
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
      this.board[y][x].hit(hitIndex);
    } else {
      this.misses[y][x] = 'miss';
    }


  }

  allShipsSunk() {
    for (let i = 0; i < SIZE; i += 1) {
      for (let j = 0; j < SIZE; j += 1) {
        if (this.board[i][j]) {
          if (!(this.board[i][j].isSunk())) {
            return false;
          }
        }
      }
    }
    return true;
  }

}

export default Gameboard;