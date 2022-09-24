import { displayGame } from "./displayGame"; //eslint-disable-line

const dragStart = (e) => {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.setDragImage(e.target,0,0);
  setTimeout(() => e.target.classList.add('opacity-50'), 0);

}

const dragEnd = (e) => {
  e.preventDefault();
  e.target.classList.remove('opacity-50');
}

const dragOver = (ship, player, x, y, isHorizontal, e) => {
  e.preventDefault();
  if (player.gameboard.isValidPosition(ship, x, y, isHorizontal)) {
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

const drop = (ship, player, x, y, isHorizontal, e) => {
  e.preventDefault();
  dragLeave(e);
  if (player.gameboard.isValidPosition(ship, x, y, isHorizontal)) {
    player.gameboard.placeShip(ship, x, y, isHorizontal);
    document.getElementById('game').parentNode.replaceChild(displayGame(), document.getElementById('game'));
  }
}

export { dragStart, dragEnd, dragOver, dragLeave, drop } //eslint-disable-line