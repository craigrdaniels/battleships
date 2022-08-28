import Game from "../factories/gameFactory";

const theGame = new Game();
theGame.placeShips();

let turn = 0;

while(!theGame.isGameOver()) {
  theGame.players[turn % 2].attackRandom();
  turn += 1;
}

const winner = (turn-1) % 2 + 1;

console.log("Player %d wins!", winner);