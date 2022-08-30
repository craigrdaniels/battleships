import Ship from "../src/factories/shipFactory";

describe('Test Ship Factory', () => {
  const theShip = new Ship(0);

  test('the length', () => {
    expect(theShip.length).toEqual(5);
  });

  test('hit', () => {
    theShip.hit(4);
    theShip.hits.forEach((element, index) => {
      if (index === 4) {
        expect(element).toBe('hit'); //eslint-disable-line
      } else {
        expect(element).toBeUndefined(); //eslint-disable-line
      }
    })    
  });

  test('isSunk', () => {
    expect(theShip.isSunk()).toBe(false);

    for (let i = 0; i < theShip.length; i += 1) {
      theShip.hit(i);
    }

    expect(theShip.isSunk()).toBe(true);
  });

});