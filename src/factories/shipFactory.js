class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
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
