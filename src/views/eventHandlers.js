import Ship from "../factories/shipFactory";
import { SHIP_TYPES } from "../components/Ships";
import { displayGame } from "./displayGame"; //eslint-disable-line

const dragStart = (ship, e) => {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', JSON.stringify(ship));
  e.dataTransfer.setDragImage(e.target,0,0);
  setTimeout(() => e.target.classList.add('opacity-50'), 0);

}

const dragEnd = (e) => {
  e.preventDefault();
  e.target.classList.remove('opacity-50');
}

const dragOver = (player, x, y, e) => {
  e.preventDefault();
  const ship = JSON.parse(e.dataTransfer.getData('text/plain')); 
  if (player.gameboard.isValidPosition(ship, x, y, ship.isHorizontal)) {
    e.target.classList.add('bg-blue-200');
  } else {
    e.target.classList.add('bg-red-200');
  }
}

const dragLeave = (e) => {
  e.preventDefault();
  e.target.classList.remove('bg-blue-200');
  e.target.classList.remove('bg-red-200');
}

const drop = (player, x, y, e) => {
  e.preventDefault();
  dragLeave(e);
  const ship = JSON.parse(e.dataTransfer.getData('text/plain'));
  if (player.gameboard.isValidPosition(ship, x, y, ship.isHorizontal)) {
    player.gameboard.placeShip(new Ship(SHIP_TYPES.indexOf(ship.type)), x, y, ship.isHorizontal);
    document.getElementById('game').parentNode.replaceChild(displayGame(), document.getElementById('game'));
  }
}

export { dragStart, dragEnd, dragOver, dragLeave, drop } //eslint-disable-line