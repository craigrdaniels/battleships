import { SHIP_TYPES, SHIP_LENGTHS } from '../components/Ships';

class Ship {
  constructor(id) {
    this.type = SHIP_TYPES[id];
    this.length = SHIP_LENGTHS[this.type];
    this.hits = [];
    this.isHorizontal = true;
  }

  rotate() {
    this.isHorizontal = !this.isHorizontal;
  }

  hit(index) {
    this.hits[index] = 'hit';
  }

  isSunk() {
    let numHits = 0;
    this.hits.forEach((element) => {
      if (element === 'hit') {
        numHits += 1;
      }
    });
    if (numHits === this.length) {
      return true;
    }
    return false;
  }
}

export default Ship;
