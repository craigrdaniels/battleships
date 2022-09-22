import { displayGame } from "./displayGame"; //eslint-disable-line

const dragStart = (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('absolute');
  e.target.classList.add('z-50');
  setTimeout(() => {
    e.target.classList.add('hidden');
  }, 0);

  function moveAt(pageX, pageY) {
    e.target.style.left = pageX - 1;
    e.target.style.top = pageY - 1;

    e.target.style.left += 'px';
    e.target.style.top += 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);
}

const dragEnd = (e) => {
  e.preventDefault();
  e.target.classList.remove('absolute');
  e.target.classList.remove('z-50');
  e.target.classList.remove('hidden');
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