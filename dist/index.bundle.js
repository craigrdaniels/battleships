/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/GameController.js":
/*!******************************************!*\
  !*** ./src/components/GameController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFleet": () => (/* binding */ createFleet),
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "initGame": () => (/* binding */ initGame),
/* harmony export */   "newTurn": () => (/* binding */ newTurn)
/* harmony export */ });
/* harmony import */ var _factories_gameFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/gameFactory */ "./src/factories/gameFactory.js");
/* harmony import */ var _factories_shipFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/shipFactory */ "./src/factories/shipFactory.js");
/* harmony import */ var _views_displayGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/displayGame */ "./src/views/displayGame.js");
/* harmony import */ var _Ships__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ships */ "./src/components/Ships.js");


 //eslint-disable-line


var game; //eslint-disable-line

var initGame = function initGame() {
  game = new _factories_gameFactory__WEBPACK_IMPORTED_MODULE_0__["default"]();
  game.players[0].setTurn(game.players[1]); // place enemy ships

  game.placeRandomShips(game.players[1]);
  return game;
};

var createFleet = function createFleet() {
  var fleet = [];
  _Ships__WEBPACK_IMPORTED_MODULE_3__.SHIP_TYPES.forEach(function (shipType, index) {
    //eslint-disable-line
    var ship = new _factories_shipFactory__WEBPACK_IMPORTED_MODULE_1__["default"](index);
    fleet.push(ship);
  });
  return fleet;
};

var newTurn = function newTurn(player) {
  if (player.isAI === true) {
    var playerIndex = game.players.findIndex(function (p) {
      return p === player;
    });
    game.players[playerIndex].attackRandom(game.players[(playerIndex + 1) % 2]);
    var gameBoardId = 'gameboard';
    gameBoardId += (playerIndex + 1) % 2;
    (0,_views_displayGame__WEBPACK_IMPORTED_MODULE_2__.redrawGameBoard)(game.players[(playerIndex + 1) % 2], gameBoardId); // check game over

    if (game.isGameOver()) {
      console.log('GAME OVER'); //eslint-disable-line

      (0,_views_displayGame__WEBPACK_IMPORTED_MODULE_2__.displayGameOverModal)();
    }
  }
};



/***/ }),

/***/ "./src/components/Ships.js":
/*!*********************************!*\
  !*** ./src/components/Ships.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SHIP_LENGTHS": () => (/* binding */ SHIP_LENGTHS),
/* harmony export */   "SHIP_TYPES": () => (/* binding */ SHIP_TYPES)
/* harmony export */ });
var SHIP_TYPES = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
var SHIP_LENGTHS = {
  Carrier: 5,
  Battleship: 4,
  Cruiser: 3,
  Submarine: 3,
  Destroyer: 2
};

/***/ }),

/***/ "./src/factories/gameFactory.js":
/*!**************************************!*\
  !*** ./src/factories/gameFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _playerFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerFactory */ "./src/factories/playerFactory.js");
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shipFactory */ "./src/factories/shipFactory.js");
/* harmony import */ var _components_Ships__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Ships */ "./src/components/Ships.js");






var Game = /*#__PURE__*/function () {
  function Game() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Game);

    this.players = [];
    this.players[0] = new _playerFactory__WEBPACK_IMPORTED_MODULE_2__["default"]('Player');
    this.players[1] = new _playerFactory__WEBPACK_IMPORTED_MODULE_2__["default"]('Enemy', true);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Game, [{
    key: "placeRandomShips",
    value: function placeRandomShips(player) {
      //eslint-disable-line
      _components_Ships__WEBPACK_IMPORTED_MODULE_4__.SHIP_TYPES.forEach(function (ship, index) {
        var theShip = new _shipFactory__WEBPACK_IMPORTED_MODULE_3__["default"](index);
        var success = false;

        while (!success) {
          var isHorizontal = Math.random() < 0.5;
          var x = Math.floor(Math.random() * player.gameboard.board[0].length);
          var y = Math.floor(Math.random() * player.gameboard.board.length);

          if (player.gameboard.isValidPosition(theShip, x, y, isHorizontal)) {
            player.gameboard.placeShip(theShip, x, y, isHorizontal);
            success = true;
          }
        }
      });
    }
  }, {
    key: "isGameOver",
    value: function isGameOver() {
      var gameOver = false;
      this.players.forEach(function (player) {
        if (player.gameboard.allShipsSunk() === true) gameOver = true;
      });
      return gameOver;
    }
  }]);

  return Game;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/factories/gameboardFactory.js":
/*!*******************************************!*\
  !*** ./src/factories/gameboardFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


var SIZE = 10;

var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Gameboard);

    this.board = Array.from(Array(SIZE), function () {
      return new Array(SIZE);
    });
    this.misses = Array.from(Array(SIZE), function () {
      return new Array(SIZE);
    });
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Gameboard, [{
    key: "isValidPosition",
    value: function isValidPosition(ship, x, y, isHorizontal) {
      //eslint-disable-line
      // check horizontal overlapping ships & not off gameboard edge
      // const z = ship.length;
      if (isHorizontal === true) {
        if (x + ship.length > SIZE) return false; // check not overlapping / next to a ship

        if (this.board[y][Math.max(0, x - 1)]) return false;
        if (this.board[y][Math.min(x + ship.length, SIZE - 1)]) return false;

        for (var i = 0; i < ship.length; i += 1) {
          if (this.board[y][x + i]) return false;
          if (this.board[Math.min(y + 1, this.board.length - 1)][x + i]) return false;
          if (this.board[Math.max(0, y - 1)][x + i]) return false;
        }
      } // check vertical overlapping ships & not off gameboard edge


      if (isHorizontal === false) {
        if (y + ship.length > SIZE) return false;
        if (this.board[Math.max(0, y - 1)][x]) return false;
        if (this.board[Math.min(y + ship.length, SIZE - 1)][x]) return false; // if (this.board[y + ship.length][x]) return false;

        for (var _i = 0; _i < ship.length; _i += 1) {
          if (this.board[y + _i][x]) return false;
          if (this.board[y + _i][Math.min(x + 1, this.board[0].length - 1)]) return false;
          if (this.board[y + _i][Math.max(0, x - 1)]) return false;
        }

        for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
          if (this.board[y + _i2][x]) return false;
        }
      }

      return true;
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, x, y, isHorizontal) {
      // check if posisble to place peice
      if (!this.isValidPosition(ship, x, y, isHorizontal)) return; // places horizontal - toadd vertical placement

      if (isHorizontal === true) {
        for (var i = 0; i < ship.length; i += 1) {
          this.board[y][x + i] = ship;
        }
      }

      if (isHorizontal === false) {
        for (var _i3 = 0; _i3 < ship.length; _i3 += 1) {
          this.board[y + _i3][x] = ship;
        }
      }
    }
  }, {
    key: "getShipIndex",
    value: function getShipIndex(x, y) {
      var hitIndex = 0; // check horizontal

      for (var i = 1; i < this.board[y][x].length; i += 1) {
        if (x - i >= 0) {
          if (this.board[y][x - i] === this.board[y][x]) {
            hitIndex += 1;
          }
        }
      } // check vertical


      for (var _i4 = 1; _i4 < this.board[y][x].length; _i4 += 1) {
        if (y - _i4 >= 0) {
          if (this.board[y - _i4][x] === this.board[y][x]) {
            hitIndex += 1;
          }
        }
      }

      return hitIndex;
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(x, y) {
      // check if hit a ship
      if (this.board[y][x]) {
        this.board[y][x].hit(this.getShipIndex(x, y));
      } else {
        this.misses[y][x] = 'miss';
      }
    }
  }, {
    key: "allShipsSunk",
    value: function allShipsSunk() {
      for (var i = 0; i < SIZE; i += 1) {
        for (var j = 0; j < SIZE; j += 1) {
          if (this.board[i][j]) {
            if (!this.board[i][j].isSunk()) {
              return false;
            }
          }
        }
      }

      return true;
    }
  }]);

  return Gameboard;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/factories/playerFactory.js":
/*!****************************************!*\
  !*** ./src/factories/playerFactory.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboardFactory */ "./src/factories/gameboardFactory.js");




var Player = /*#__PURE__*/function () {
  function Player() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Player';
    var isAI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Player);

    this.gameboard = new _gameboardFactory__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.isAI = isAI;
    this.turn = false;
    this.name = name;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Player, [{
    key: "turn",
    get: function get() {
      return this._turn; //eslint-disable-line
    },
    set: function set(x) {
      this._turn = x; //eslint-disable-line
    }
  }, {
    key: "setTurn",
    value: function setTurn(enemy) {
      this.turn = true;
      enemy.turn = false; //eslint-disable-line
    }
  }, {
    key: "isValidAttack",
    value: function isValidAttack(player, x, y) {
      //eslint-disable-line
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
  }, {
    key: "attack",
    value: function attack(player, x, y) {
      if (this.isValidAttack(player, x, y)) {
        player.gameboard.receiveAttack(x, y);
      }
    }
  }, {
    key: "attackRandom",
    value: function attackRandom(player) {
      // check for any hits without sunk ships
      // check surrounding spaces, if not a valid move then choose the next 'hit'
      for (var i = 0; i < player.gameboard.board[0].length; i += 1) {
        for (var j = 0; j < player.gameboard.board.length; j += 1) {
          if (player.gameboard.board[j][i]) {
            if (player.gameboard.board[j][i].hits[player.gameboard.getShipIndex(i, j)] === 'hit' && !player.gameboard.board[j][i].isSunk()) {
              var attackVectors = [[-1, 0], [0, 1], [1, 0], [0, -1]];

              for (var k = 0; k < attackVectors.length; k += 1) {
                if (this.isValidAttack(player, i + attackVectors[k][0], j + attackVectors[k][1])) {
                  this.attack(player, i + attackVectors[k][0], j + attackVectors[k][1]);
                  return;
                }
              }
            }
          }
        }
      }

      var success = false;

      while (success === false) {
        var x = Math.floor(Math.random() * player.gameboard.board[0].length);
        var y = Math.floor(Math.random() * player.gameboard.board.length);

        if (this.isValidAttack(player, x, y)) {
          this.attack(player, x, y);
          success = true;
          return;
        }
      }
    }
  }]);

  return Player;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _components_Ships__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Ships */ "./src/components/Ships.js");




var Ship = /*#__PURE__*/function () {
  function Ship(id) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Ship);

    this.type = _components_Ships__WEBPACK_IMPORTED_MODULE_2__.SHIP_TYPES[id];
    this.length = _components_Ships__WEBPACK_IMPORTED_MODULE_2__.SHIP_LENGTHS[this.type];
    this.hits = [];
    this.isHorizontal = true;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Ship, [{
    key: "rotate",
    value: function rotate() {
      this.isHorizontal = !this.isHorizontal;
    }
  }, {
    key: "hit",
    value: function hit(index) {
      this.hits[index] = 'hit';
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      var numHits = 0;
      this.hits.forEach(function (element) {
        if (element === 'hit') {
          numHits += 1;
        }
      });

      if (numHits === this.length) {
        return true;
      }

      return false;
    }
  }]);

  return Ship;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/handlers/createHtmlElement.js":
/*!*******************************************!*\
  !*** ./src/handlers/createHtmlElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createHtmlElement)
/* harmony export */ });
function createHtmlElement(type, id, arrayClasses, content) {
  var element = document.createElement(type);
  if (id) element.id = id;

  if (arrayClasses) {
    arrayClasses.forEach(function (myClass) {
      return element.classList.add(myClass);
    });
  }

  if (content) element.innerHTML = content;
  return element;
}

/***/ }),

/***/ "./src/handlers/views.js":
/*!*******************************!*\
  !*** ./src/handlers/views.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _views_displayHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/displayHeader */ "./src/views/displayHeader.js");
/* harmony import */ var _createHtmlElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHtmlElement */ "./src/handlers/createHtmlElement.js");
/* harmony import */ var _components_GameController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/GameController */ "./src/components/GameController.js");
/* harmony import */ var _views_displayGame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/displayGame */ "./src/views/displayGame.js");
// import { displayGame } from '../views/displayGame';





var getElement = function getElement(selector) {
  var parentNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return parentNode.querySelector(selector);
};

var setTheme = function setTheme() {
  // set light / dark theme based on media preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

var mainLayout = function mainLayout() {
  var element = (0,_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['flex', 'flex-col', 'w-full', 'content-center', 'gap-8'], null);
  (0,_components_GameController__WEBPACK_IMPORTED_MODULE_2__.initGame)();
  element.appendChild((0,_views_displayHeader__WEBPACK_IMPORTED_MODULE_0__["default"])());
  element.appendChild((0,_views_displayGame__WEBPACK_IMPORTED_MODULE_3__.displayGame)(_components_GameController__WEBPACK_IMPORTED_MODULE_2__.game, (0,_components_GameController__WEBPACK_IMPORTED_MODULE_2__.createFleet)()));
  return element;
};

var loadViews = function loadViews(selector) {
  setTheme();
  var mainContent = getElement(selector);
  mainContent.appendChild(mainLayout());
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadViews);

/***/ }),

/***/ "./src/views/displayGame.js":
/*!**********************************!*\
  !*** ./src/views/displayGame.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame),
/* harmony export */   "displayGameOverModal": () => (/* binding */ displayGameOverModal),
/* harmony export */   "displayShip": () => (/* binding */ displayShip),
/* harmony export */   "redrawGameBoard": () => (/* binding */ redrawGameBoard)
/* harmony export */ });
/* harmony import */ var _components_GameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/GameController */ "./src/components/GameController.js");
/* harmony import */ var _handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../handlers/createHtmlElement */ "./src/handlers/createHtmlElement.js");
/* harmony import */ var _eventHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventHandlers */ "./src/views/eventHandlers.js");
 //eslint-disable-line


 //eslint-disable-line

var theGame;
var theFleet = [];

var redrawGameBoard = function redrawGameBoard(player, id) {
  var theBoard = document.getElementById(id);
  theBoard.parentNode.replaceChild(displayGameBoard(player), theBoard); //eslint-disable-line
};

var displayGameOverModalContent = function displayGameOverModalContent() {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['font-["PressStart2P"]', 'text-white', 'bg-black', 'bg-opacity-50', 'flex', 'w-full', 'h-24', 'justify-center', 'items-center'], 'GAME OVER');
  return element;
};

var displayGameOverModal = function displayGameOverModal() {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', 'game-over-modal', ['font-["PressStart2P"]', 'flex', 'items-center', 'justify-center', 'fixed', 'z-10', 'inset-0', 'w-full', 'h-full', 'overflow-y-auto', 'bg-gray-500', 'bg-opacity-75'], null);
  document.body.appendChild(element);
  element.appendChild(displayGameOverModalContent());

  window.onclick = function (event) {
    if (event.target === element) {
      theGame = (0,_components_GameController__WEBPACK_IMPORTED_MODULE_0__.initGame)();
      theFleet = (0,_components_GameController__WEBPACK_IMPORTED_MODULE_0__.createFleet)();
      document.getElementById('game').parentNode.replaceChild(displayGame(theGame), document.getElementById('game')); // eslint-disable-line

      document.body.removeChild(element);
    }
  };
};

var displayRotateButton = function displayRotateButton(ship) {
  //eslint-disable-line
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('button', null, ['flex', 'font-["MaterialSymbols-Outlined"]', 'place-self-end'], "rotate_right");

  element.onclick = function () {
    ship.rotate();
    document.getElementById('placeship').parentElement.replaceChild(displayShip(ship), document.getElementById('placeship')); //eslint-disable-line
  };

  return element;
};

var displayGameBoardTitle = function displayGameBoardTitle(title) {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['font-["PressStart2P"]', 'col-span-10', 'flex', 'justify-between'], title);
  return element;
};

var displayGameTile = function displayGameTile(player, x, y) {
  var placeShips = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['font-["PressStart2P"]', 'bg-white', 'flex', 'w-8', 'h-8', 'border', 'border-slate-500', 'text-black', 'items-center', 'justify-center'], null);

  if (player.gameboard.board[y][x] && player.gameboard.board[y][x].isSunk()) {
    element.classList.remove('text-black');
    element.classList.add('text-red-500');
  }

  if (player.gameboard.board[y][x] && player.gameboard.board[y][x].hits[player.gameboard.getShipIndex(x, y)]) {
    element.innerHTML = 'X';
    element.classList.add('bg-blue-200');
    return element;
  }

  if (player.gameboard.misses[y][x]) {
    element.innerHTML = '•';
    return element;
  }

  if (player.isAI === false) {
    if (player.gameboard.board[y][x]) {
      element.classList.add('bg-blue-200');
      return element;
    }
  } else {
    element.classList.add('hover:bg-gray-400'); // only allow player to click on AI board

    element.onclick = function () {
      var attackingPlayer = (theGame.players.findIndex(function (e) {
        return e === player;
      }) + 1) % 2;

      if (theGame.players[attackingPlayer].isValidAttack(player, x, y)) {
        theGame.players[attackingPlayer].attack(player, x, y);
        var gameBoardId = 'gameboard';
        gameBoardId += (attackingPlayer + 1) % 2;
        redrawGameBoard(player, gameBoardId); //eslint-disable-line

        element.parentNode.replaceChild(displayGameTile(player, x, y), element); // check game over

        if (theGame.isGameOver()) {
          displayGameOverModal();
        } else {
          (0,_components_GameController__WEBPACK_IMPORTED_MODULE_0__.newTurn)(player); // let AI have a turn
        }
      }
    };
  }

  if (placeShips) {
    element.addEventListener('dragover', function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_2__.dragOver)(player, x, y, e);
    });
    element.addEventListener('dragleave', _eventHandlers__WEBPACK_IMPORTED_MODULE_2__.dragLeave);
    element.addEventListener('drop', function (e) {
      return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_2__.drop)(player, x, y, e);
    });
  }

  return element;
};

var displayShipTile = function displayShipTile() {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['font-["PressStart2P"]', 'bg-white', 'flex', 'w-8', 'h-8', 'border', 'border-slate-500', 'text-black', 'items-center', 'justify-center'], null);
  return element;
};

var displayShip = function displayShip(ship) {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', 'placeship', ['flex', 'w-min', 'items-center', 'place-self-center', 'justify-center'], null);
  element.setAttribute("draggable", "true");

  if (ship.isHorizontal) {
    element.classList.add('flex-row');
  } else {
    element.classList.add('flex-col');
  }

  for (var i = 0; i < ship.length; i += 1) {
    element.appendChild(displayShipTile());
  }

  element.addEventListener('dragstart', function (e) {
    return (0,_eventHandlers__WEBPACK_IMPORTED_MODULE_2__.dragStart)(ship, e);
  });
  element.addEventListener('dragend', _eventHandlers__WEBPACK_IMPORTED_MODULE_2__.dragEnd);
  return element;
};

var displayShipTitle = function displayShipTitle(ship) {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['grid', 'grid-rows-1', 'grid-cols-2', 'font-["PressStart2P"]', 'w-full', 'place-self-end'], '&nbsp;');
  element.innerHTML = ship.type;
  element.appendChild(displayRotateButton(ship));
  return element;
};

var displayShipContainer = function displayShipContainer(fleet) {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['grid', 'h-80', 'w-80'], null);
  var ship = fleet.shift();
  element.appendChild(displayShip(ship));
  element.appendChild(displayShipTitle(ship));
  return element;
};

var displayGameBoard = function displayGameBoard(player) {
  var placeShips = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var playerIndex = theGame.players.findIndex(function (p) {
    return p === player;
  });
  var gameBoardId = 'gameboard';
  gameBoardId += playerIndex;
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', gameBoardId, ['grid', 'grid-cols-10', 'grid-rows-11', 'min-w-content'], null);

  if (placeShips === true) {
    element.appendChild(displayGameBoardTitle("Place Ships", true));
  } else {
    element.appendChild(displayGameBoardTitle(player.name));
  }

  for (var i = 0; i < player.gameboard.board.length; i += 1) {
    for (var j = 0; j < player.gameboard.board[0].length; j += 1) {
      element.appendChild(displayGameTile(player, j, i, placeShips));
    }
  }

  return element;
};

var displayGame = function displayGame() {
  var game = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : theGame;
  var fleet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : theFleet;
  theGame = game;
  theFleet = fleet;
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', 'game', ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center', 'gap-8'], null);
  if (fleet.length === 0) element.appendChild(displayGameBoard(theGame.players[1]));
  if (fleet.length > 0) element.appendChild(displayShipContainer(fleet));
  element.appendChild(displayGameBoard(theGame.players[0], true));
  return element;
};



/***/ }),

/***/ "./src/views/displayHeader.js":
/*!************************************!*\
  !*** ./src/views/displayHeader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handlers/createHtmlElement */ "./src/handlers/createHtmlElement.js");


var headerText = function headerText() {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_0__["default"])('h1', 'null', ['font-["PressStart2P"]', 'text-2xl', 'text-center', 'align-middle', 'leading-10'], 'BattleShip');
  return element;
};

var displayHeader = function displayHeader() {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_0__["default"])('header', 'header', [], null);
  element.appendChild(headerText());
  return element;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayHeader);

/***/ }),

/***/ "./src/views/eventHandlers.js":
/*!************************************!*\
  !*** ./src/views/eventHandlers.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragEnd": () => (/* binding */ dragEnd),
/* harmony export */   "dragLeave": () => (/* binding */ dragLeave),
/* harmony export */   "dragOver": () => (/* binding */ dragOver),
/* harmony export */   "dragStart": () => (/* binding */ dragStart),
/* harmony export */   "drop": () => (/* binding */ drop)
/* harmony export */ });
/* harmony import */ var _factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/shipFactory */ "./src/factories/shipFactory.js");
/* harmony import */ var _components_Ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Ships */ "./src/components/Ships.js");
/* harmony import */ var _displayGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayGame */ "./src/views/displayGame.js");


 //eslint-disable-line

var dragStart = function dragStart(ship, e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', JSON.stringify(ship));
  e.dataTransfer.setDragImage(e.target, 0, 0);
  setTimeout(function () {
    return e.target.classList.add('opacity-50');
  }, 0);
};

var dragEnd = function dragEnd(e) {
  e.preventDefault();
  e.target.classList.remove('opacity-50');
};

var dragOver = function dragOver(player, x, y, e) {
  e.preventDefault();
  var ship = JSON.parse(e.dataTransfer.getData('text/plain'));

  if (player.gameboard.isValidPosition(ship, x, y, ship.isHorizontal)) {
    e.target.classList.add('bg-blue-200');
  } else {
    e.target.classList.add('bg-red-200');
  }
};

var dragLeave = function dragLeave(e) {
  e.preventDefault();
  e.target.classList.remove('bg-blue-200');
  e.target.classList.remove('bg-red-200');
};

var drop = function drop(player, x, y, e) {
  e.preventDefault();
  dragLeave(e);
  var ship = JSON.parse(e.dataTransfer.getData('text/plain'));

  if (player.gameboard.isValidPosition(ship, x, y, ship.isHorizontal)) {
    player.gameboard.placeShip(new _factories_shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"](_components_Ships__WEBPACK_IMPORTED_MODULE_1__.SHIP_TYPES.indexOf(ship.type)), x, y, ship.isHorizontal);
    document.getElementById('game').parentNode.replaceChild((0,_displayGame__WEBPACK_IMPORTED_MODULE_2__.displayGame)(), document.getElementById('game'));
  }
};

 //eslint-disable-line

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _handlers_views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/views */ "./src/handlers/views.js");



var startApp = function startApp() {
  (0,_handlers_views__WEBPACK_IMPORTED_MODULE_1__["default"])('#content');
};

startApp();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TXFDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07RUFDckIvQywyREFBUyxDQUFDLFVBQUQsQ0FBVDtBQUNELENBRkQ7O0FBSUErQyxRQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb21wb25lbnRzL0dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvbXBvbmVudHMvU2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZmFjdG9yaWVzL2dhbWVGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9oYW5kbGVycy9jcmVhdGVIdG1sRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9oYW5kbGVycy92aWV3cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy92aWV3cy9kaXNwbGF5R2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy92aWV3cy9kaXNwbGF5SGVhZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3ZpZXdzL2V2ZW50SGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGVzLmNzcz81MjMxIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWUgZnJvbSAnLi4vZmFjdG9yaWVzL2dhbWVGYWN0b3J5JztcbmltcG9ydCBTaGlwIGZyb20gJy4uL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeSc7XG5pbXBvcnQge2Rpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXJNb2RhbCxyZWRyYXdHYW1lQm9hcmR9IGZyb20gJy4uL3ZpZXdzL2Rpc3BsYXlHYW1lJzsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5pbXBvcnQgeyBTSElQX1RZUEVTIH0gZnJvbSAnLi9TaGlwcyc7XG5cbmxldCBnYW1lOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuY29uc3QgaW5pdEdhbWUgPSAoKSA9PiB7XG4gIGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnBsYXllcnNbMF0uc2V0VHVybihnYW1lLnBsYXllcnNbMV0pO1xuXG4gIC8vIHBsYWNlIGVuZW15IHNoaXBzXG4gIGdhbWUucGxhY2VSYW5kb21TaGlwcyhnYW1lLnBsYXllcnNbMV0pO1xuICByZXR1cm4gZ2FtZTtcbn07XG5cbmNvbnN0IGNyZWF0ZUZsZWV0ID0gKCkgPT4ge1xuICBjb25zdCBmbGVldCA9IFtdO1xuICBTSElQX1RZUEVTLmZvckVhY2goKHNoaXBUeXBlLCBpbmRleCkgPT4geyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoaW5kZXgpO1xuICAgIGZsZWV0LnB1c2goc2hpcCk7XG4gIH0pO1xuICByZXR1cm4gZmxlZXQ7XG59XG5cblxuY29uc3QgbmV3VHVybiA9IChwbGF5ZXIpID0+IHtcbiAgaWYgKHBsYXllci5pc0FJID09PSB0cnVlKSB7XG4gICAgY29uc3QgcGxheWVySW5kZXggPSBnYW1lLnBsYXllcnMuZmluZEluZGV4KChwKSA9PiBwID09PSBwbGF5ZXIpO1xuICAgIGdhbWUucGxheWVyc1twbGF5ZXJJbmRleF0uYXR0YWNrUmFuZG9tKGdhbWUucGxheWVyc1socGxheWVySW5kZXggKyAxKSAlIDJdKTtcblxuICAgIGxldCBnYW1lQm9hcmRJZCA9ICdnYW1lYm9hcmQnO1xuICAgIGdhbWVCb2FyZElkICs9IChwbGF5ZXJJbmRleCArIDEpICUgMjtcblxuICAgIHJlZHJhd0dhbWVCb2FyZChnYW1lLnBsYXllcnNbKHBsYXllckluZGV4ICsgMSkgJSAyXSwgZ2FtZUJvYXJkSWQpO1xuXG4gICAgLy8gY2hlY2sgZ2FtZSBvdmVyXG4gICAgaWYgKGdhbWUuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBjb25zb2xlLmxvZygnR0FNRSBPVkVSJyk7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZGlzcGxheUdhbWVPdmVyTW9kYWwoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGluaXRHYW1lLCBuZXdUdXJuLCBjcmVhdGVGbGVldCwgZ2FtZSB9O1xuIiwiZXhwb3J0IGNvbnN0IFNISVBfVFlQRVMgPSBbXG4gICdDYXJyaWVyJyxcbiAgJ0JhdHRsZXNoaXAnLFxuICAnQ3J1aXNlcicsXG4gICdTdWJtYXJpbmUnLFxuICAnRGVzdHJveWVyJyxcbl07XG5cbmV4cG9ydCBjb25zdCBTSElQX0xFTkdUSFMgPSB7XG4gIENhcnJpZXI6IDUsXG4gIEJhdHRsZXNoaXA6IDQsXG4gIENydWlzZXI6IDMsXG4gIFN1Ym1hcmluZTogMyxcbiAgRGVzdHJveWVyOiAyLFxufTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXJGYWN0b3J5JztcbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknO1xuaW1wb3J0IHsgU0hJUF9UWVBFUyB9IGZyb20gJy4uL2NvbXBvbmVudHMvU2hpcHMnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wbGF5ZXJzID0gW107XG4gICAgdGhpcy5wbGF5ZXJzWzBdID0gbmV3IFBsYXllcignUGxheWVyJyk7XG4gICAgdGhpcy5wbGF5ZXJzWzFdID0gbmV3IFBsYXllcignRW5lbXknLCB0cnVlKTtcbiAgfVxuXG4gIHBsYWNlUmFuZG9tU2hpcHMocGxheWVyKSB7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgIFNISVBfVFlQRVMuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRoZVNoaXAgPSBuZXcgU2hpcChpbmRleCk7XG4gICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgd2hpbGUgKCFzdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkWzBdLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc2l0aW9uKHRoZVNoaXAsIHgsIHksIGlzSG9yaXpvbnRhbCkpIHtcbiAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcCh0aGVTaGlwLCB4LCB5LCBpc0hvcml6b250YWwpO1xuICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpc0dhbWVPdmVyKCkge1xuICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpID09PSB0cnVlKSBnYW1lT3ZlciA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdhbWVPdmVyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjb25zdCBTSVpFID0gMTA7XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBBcnJheS5mcm9tKEFycmF5KFNJWkUpLCAoKSA9PiBuZXcgQXJyYXkoU0laRSkpO1xuICAgIHRoaXMubWlzc2VzID0gQXJyYXkuZnJvbShBcnJheShTSVpFKSwgKCkgPT4gbmV3IEFycmF5KFNJWkUpKTtcbiAgfVxuXG4gIGlzVmFsaWRQb3NpdGlvbihzaGlwLCB4LCB5LCBpc0hvcml6b250YWwpIHtcbiAgICAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgICAvLyBjaGVjayBob3Jpem9udGFsIG92ZXJsYXBwaW5nIHNoaXBzICYgbm90IG9mZiBnYW1lYm9hcmQgZWRnZVxuICAgIC8vIGNvbnN0IHogPSBzaGlwLmxlbmd0aDtcblxuICAgIGlmIChpc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh4ICsgc2hpcC5sZW5ndGggPiBTSVpFKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIGNoZWNrIG5vdCBvdmVybGFwcGluZyAvIG5leHQgdG8gYSBzaGlwXG4gICAgICBpZiAodGhpcy5ib2FyZFt5XVtNYXRoLm1heCgwLCB4IC0gMSldKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ib2FyZFt5XVtNYXRoLm1pbih4ICsgc2hpcC5sZW5ndGgsIFNJWkUgLSAxKV0pIHJldHVybiBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3ldW3ggKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtNYXRoLm1pbih5ICsgMSwgdGhpcy5ib2FyZC5sZW5ndGggLSAxKV1beCArIGldKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbTWF0aC5tYXgoMCwgeSAtIDEpXVt4ICsgaV0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayB2ZXJ0aWNhbCBvdmVybGFwcGluZyBzaGlwcyAmIG5vdCBvZmYgZ2FtZWJvYXJkIGVkZ2VcbiAgICBpZiAoaXNIb3Jpem9udGFsID09PSBmYWxzZSkge1xuICAgICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IFNJWkUpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuYm9hcmRbTWF0aC5tYXgoMCwgeSAtIDEpXVt4XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHRoaXMuYm9hcmRbTWF0aC5taW4oeSArIHNoaXAubGVuZ3RoLCBTSVpFIC0gMSldW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyBpZiAodGhpcy5ib2FyZFt5ICsgc2hpcC5sZW5ndGhdW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeSArIGldW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3kgKyBpXVtNYXRoLm1pbih4ICsgMSwgdGhpcy5ib2FyZFswXS5sZW5ndGggLSAxKV0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt5ICsgaV1bTWF0aC5tYXgoMCwgeCAtIDEpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeSArIGldW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCwgeCwgeSwgaXNIb3Jpem9udGFsKSB7XG4gICAgLy8gY2hlY2sgaWYgcG9zaXNibGUgdG8gcGxhY2UgcGVpY2VcbiAgICBpZiAoIXRoaXMuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGlzSG9yaXpvbnRhbCkpIHJldHVybjtcblxuICAgIC8vIHBsYWNlcyBob3Jpem9udGFsIC0gdG9hZGQgdmVydGljYWwgcGxhY2VtZW50XG4gICAgaWYgKGlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbeV1beCArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNIb3Jpem9udGFsID09PSBmYWxzZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbeSArIGldW3hdID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTaGlwSW5kZXgoeCwgeSkge1xuICAgIGxldCBoaXRJbmRleCA9IDA7XG4gICAgLy8gY2hlY2sgaG9yaXpvbnRhbFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5ib2FyZFt5XVt4XS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHggLSBpID49IDApIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeV1beCAtIGldID09PSB0aGlzLmJvYXJkW3ldW3hdKSB7XG4gICAgICAgICAgaGl0SW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVjayB2ZXJ0aWNhbFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5ib2FyZFt5XVt4XS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHkgLSBpID49IDApIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeSAtIGldW3hdID09PSB0aGlzLmJvYXJkW3ldW3hdKSB7XG4gICAgICAgICAgaGl0SW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGl0SW5kZXg7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICAvLyBjaGVjayBpZiBoaXQgYSBzaGlwXG4gICAgaWYgKHRoaXMuYm9hcmRbeV1beF0pIHtcbiAgICAgIHRoaXMuYm9hcmRbeV1beF0uaGl0KHRoaXMuZ2V0U2hpcEluZGV4KHgsIHkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5taXNzZXNbeV1beF0gPSAnbWlzcyc7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU0laRTsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFNJWkU7IGogKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtpXVtqXSkge1xuICAgICAgICAgIGlmICghdGhpcy5ib2FyZFtpXVtqXS5pc1N1bmsoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSc7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAnUGxheWVyJywgaXNBSSA9IGZhbHNlKSB7XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgdGhpcy5pc0FJID0gaXNBSTtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0IHR1cm4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3R1cm47IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgc2V0IHR1cm4oeCkge1xuICAgIHRoaXMuX3R1cm4gPSB4OyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIHNldFR1cm4oZW5lbXkpIHtcbiAgICB0aGlzLnR1cm4gPSB0cnVlO1xuICAgIGVuZW15LnR1cm4gPSBmYWxzZTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBpc1ZhbGlkQXR0YWNrKHBsYXllciwgeCwgeSkgeyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgICAvLyBtYWtlIHN1cmUgZmFsbHMgd2l0aGluIGJvdW5kcyBvZiBnYW1lYm9hcmRcbiAgICBpZiAoeCA8IDAgfHwgeCA+PSBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkWzBdLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh5IDwgMCB8fCB5ID49IHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAocGxheWVyLmdhbWVib2FyZC5taXNzZXNbeV1beF0pIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3ldW3hdKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQuYm9hcmRbeV1beF0uaGl0c1twbGF5ZXIuZ2FtZWJvYXJkLmdldFNoaXBJbmRleCh4LCB5KV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXR0YWNrKHBsYXllciwgeCwgeSkge1xuICAgIGlmICh0aGlzLmlzVmFsaWRBdHRhY2socGxheWVyLCB4LCB5KSkge1xuICAgICAgcGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFja1JhbmRvbShwbGF5ZXIpIHtcbiAgICAvLyBjaGVjayBmb3IgYW55IGhpdHMgd2l0aG91dCBzdW5rIHNoaXBzXG4gICAgLy8gY2hlY2sgc3Vycm91bmRpbmcgc3BhY2VzLCBpZiBub3QgYSB2YWxpZCBtb3ZlIHRoZW4gY2hvb3NlIHRoZSBuZXh0ICdoaXQnXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkWzBdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbal1baV0pIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW2pdW2ldLmhpdHNbXG4gICAgICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQuZ2V0U2hpcEluZGV4KGksIGopXG4gICAgICAgICAgICBdID09PSAnaGl0JyAmJlxuICAgICAgICAgICAgIXBsYXllci5nYW1lYm9hcmQuYm9hcmRbal1baV0uaXNTdW5rKClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dGFja1ZlY3RvcnMgPSBbXG4gICAgICAgICAgICAgIFstMSwgMF0sXG4gICAgICAgICAgICAgIFswLCAxXSxcbiAgICAgICAgICAgICAgWzEsIDBdLFxuICAgICAgICAgICAgICBbMCwgLTFdLFxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBhdHRhY2tWZWN0b3JzLmxlbmd0aDsgayArPSAxKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmFsaWRBdHRhY2soXG4gICAgICAgICAgICAgICAgICBwbGF5ZXIsXG4gICAgICAgICAgICAgICAgICBpICsgYXR0YWNrVmVjdG9yc1trXVswXSxcbiAgICAgICAgICAgICAgICAgIGogKyBhdHRhY2tWZWN0b3JzW2tdWzFdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhcbiAgICAgICAgICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICAgICAgICAgIGkgKyBhdHRhY2tWZWN0b3JzW2tdWzBdLFxuICAgICAgICAgICAgICAgICAgaiArIGF0dGFja1ZlY3RvcnNba11bMV1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgd2hpbGUgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGxheWVyLmdhbWVib2FyZC5ib2FyZFswXS5sZW5ndGgpO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoKTtcblxuICAgICAgaWYgKHRoaXMuaXNWYWxpZEF0dGFjayhwbGF5ZXIsIHgsIHkpKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrKHBsYXllciwgeCwgeSk7XG4gICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCB7IFNISVBfVFlQRVMsIFNISVBfTEVOR1RIUyB9IGZyb20gJy4uL2NvbXBvbmVudHMvU2hpcHMnO1xuXG5jbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IoaWQpIHtcbiAgICB0aGlzLnR5cGUgPSBTSElQX1RZUEVTW2lkXTtcbiAgICB0aGlzLmxlbmd0aCA9IFNISVBfTEVOR1RIU1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuaGl0cyA9IFtdO1xuICAgIHRoaXMuaXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgfVxuXG4gIHJvdGF0ZSgpIHtcbiAgICB0aGlzLmlzSG9yaXpvbnRhbCA9ICF0aGlzLmlzSG9yaXpvbnRhbDtcbiAgfVxuXG4gIGhpdChpbmRleCkge1xuICAgIHRoaXMuaGl0c1tpbmRleF0gPSAnaGl0JztcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBsZXQgbnVtSGl0cyA9IDA7XG4gICAgdGhpcy5oaXRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50ID09PSAnaGl0Jykge1xuICAgICAgICBudW1IaXRzICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKG51bUhpdHMgPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVIdG1sRWxlbWVudCh0eXBlLCBpZCwgYXJyYXlDbGFzc2VzLCBjb250ZW50KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBpZiAoaWQpIGVsZW1lbnQuaWQgPSBpZDtcbiAgaWYgKGFycmF5Q2xhc3Nlcykge1xuICAgIGFycmF5Q2xhc3Nlcy5mb3JFYWNoKChteUNsYXNzKSA9PiBlbGVtZW50LmNsYXNzTGlzdC5hZGQobXlDbGFzcykpO1xuICB9XG4gIGlmIChjb250ZW50KSBlbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG4iLCIvLyBpbXBvcnQgeyBkaXNwbGF5R2FtZSB9IGZyb20gJy4uL3ZpZXdzL2Rpc3BsYXlHYW1lJztcbmltcG9ydCBkaXNwbGF5SGVhZGVyIGZyb20gJy4uL3ZpZXdzL2Rpc3BsYXlIZWFkZXInO1xuaW1wb3J0IGNyZWF0ZUh0bWxFbGVtZW50IGZyb20gJy4vY3JlYXRlSHRtbEVsZW1lbnQnO1xuaW1wb3J0IHsgaW5pdEdhbWUsIGNyZWF0ZUZsZWV0LCBnYW1lfSBmcm9tICcuLi9jb21wb25lbnRzL0dhbWVDb250cm9sbGVyJztcbmltcG9ydCB7IGRpc3BsYXlHYW1lIH0gZnJvbSAnLi4vdmlld3MvZGlzcGxheUdhbWUnO1xuXG5jb25zdCBnZXRFbGVtZW50ID0gKHNlbGVjdG9yLCBwYXJlbnROb2RlID0gZG9jdW1lbnQpID0+XG4gIHBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbmNvbnN0IHNldFRoZW1lID0gKCkgPT4ge1xuICAvLyBzZXQgbGlnaHQgLyBkYXJrIHRoZW1lIGJhc2VkIG9uIG1lZGlhIHByZWZlcmVuY2VcbiAgaWYgKFxuICAgIHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzXG4gICkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKTtcbiAgfVxufTtcblxuY29uc3QgbWFpbkxheW91dCA9ICgpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIG51bGwsXG4gICAgWydmbGV4JywgJ2ZsZXgtY29sJywgJ3ctZnVsbCcsICdjb250ZW50LWNlbnRlcicsICdnYXAtOCddLFxuICAgIG51bGxcbiAgKTtcblxuICBpbml0R2FtZSgpO1xuXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheUhlYWRlcigpKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkaXNwbGF5R2FtZShnYW1lLCBjcmVhdGVGbGVldCgpKSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBsb2FkVmlld3MgPSAoc2VsZWN0b3IpID0+IHtcbiAgc2V0VGhlbWUoKTtcblxuICBjb25zdCBtYWluQ29udGVudCA9IGdldEVsZW1lbnQoc2VsZWN0b3IpO1xuICBtYWluQ29udGVudC5hcHBlbmRDaGlsZChtYWluTGF5b3V0KCkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGxvYWRWaWV3cztcbiIsImltcG9ydCB7aW5pdEdhbWUsIG5ld1R1cm4sIGNyZWF0ZUZsZWV0fSBmcm9tICcuLi9jb21wb25lbnRzL0dhbWVDb250cm9sbGVyJzsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5pbXBvcnQgY3JlYXRlSHRtbEVsZW1lbnQgZnJvbSAnLi4vaGFuZGxlcnMvY3JlYXRlSHRtbEVsZW1lbnQnO1xuaW1wb3J0IHsgZHJhZ1N0YXJ0LCBkcmFnRW5kLCBkcmFnT3ZlciwgZHJhZ0xlYXZlLCBkcm9wIH0gZnJvbSAnLi9ldmVudEhhbmRsZXJzJzsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5cbmxldCB0aGVHYW1lO1xubGV0IHRoZUZsZWV0ID0gW107XG5cbmNvbnN0IHJlZHJhd0dhbWVCb2FyZCA9IChwbGF5ZXIsIGlkKSA9PiB7XG4gIGNvbnN0IHRoZUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICB0aGVCb2FyZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkaXNwbGF5R2FtZUJvYXJkKHBsYXllciksIHRoZUJvYXJkKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZU92ZXJNb2RhbENvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBudWxsLFxuICAgIFtcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAndGV4dC13aGl0ZScsXG4gICAgICAnYmctYmxhY2snLFxuICAgICAgJ2JnLW9wYWNpdHktNTAnLFxuICAgICAgJ2ZsZXgnLFxuICAgICAgJ3ctZnVsbCcsXG4gICAgICAnaC0yNCcsXG4gICAgICAnanVzdGlmeS1jZW50ZXInLFxuICAgICAgJ2l0ZW1zLWNlbnRlcicsXG4gICAgXSxcbiAgICAnR0FNRSBPVkVSJ1xuICApO1xuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgZGlzcGxheUdhbWVPdmVyTW9kYWwgPSAoKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICAnZ2FtZS1vdmVyLW1vZGFsJyxcbiAgICBbXG4gICAgICAnZm9udC1bXCJQcmVzc1N0YXJ0MlBcIl0nLFxuICAgICAgJ2ZsZXgnLFxuICAgICAgJ2l0ZW1zLWNlbnRlcicsXG4gICAgICAnanVzdGlmeS1jZW50ZXInLFxuICAgICAgJ2ZpeGVkJyxcbiAgICAgICd6LTEwJyxcbiAgICAgICdpbnNldC0wJyxcbiAgICAgICd3LWZ1bGwnLFxuICAgICAgJ2gtZnVsbCcsXG4gICAgICAnb3ZlcmZsb3cteS1hdXRvJyxcbiAgICAgICdiZy1ncmF5LTUwMCcsXG4gICAgICAnYmctb3BhY2l0eS03NScsXG4gICAgXSxcbiAgICBudWxsXG4gICk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkaXNwbGF5R2FtZU92ZXJNb2RhbENvbnRlbnQoKSk7XG5cbiAgd2luZG93Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBlbGVtZW50KSB7XG4gICAgICB0aGVHYW1lID0gaW5pdEdhbWUoKTtcbiAgICAgIHRoZUZsZWV0ID0gY3JlYXRlRmxlZXQoKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZGlzcGxheUdhbWUodGhlR2FtZSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IGRpc3BsYXlSb3RhdGVCdXR0b24gPSAoc2hpcCkgPT4geyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdidXR0b24nLFxuICAgIG51bGwsXG4gICAgW1xuICAgICAgJ2ZsZXgnLFxuICAgICAgJ2ZvbnQtW1wiTWF0ZXJpYWxTeW1ib2xzLU91dGxpbmVkXCJdJyxcbiAgICAgICdwbGFjZS1zZWxmLWVuZCdcbiAgICBdLFxuICAgIFwicm90YXRlX3JpZ2h0XCJcbiAgKTtcblxuICBlbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgc2hpcC5yb3RhdGUoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VzaGlwJykucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZGlzcGxheVNoaXAoc2hpcCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZXNoaXAnKSk7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuY29uc3QgZGlzcGxheUdhbWVCb2FyZFRpdGxlID0gKHRpdGxlKSA9PiB7IFxuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBbJ2ZvbnQtW1wiUHJlc3NTdGFydDJQXCJdJywgJ2NvbC1zcGFuLTEwJywgJ2ZsZXgnLCAnanVzdGlmeS1iZXR3ZWVuJ10sXG4gICAgdGl0bGVcbiAgKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmNvbnN0IGRpc3BsYXlHYW1lVGlsZSA9IChwbGF5ZXIsIHgsIHksIHBsYWNlU2hpcHMgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBbXG4gICAgICAnZm9udC1bXCJQcmVzc1N0YXJ0MlBcIl0nLFxuICAgICAgJ2JnLXdoaXRlJyxcbiAgICAgICdmbGV4JyxcbiAgICAgICd3LTgnLFxuICAgICAgJ2gtOCcsXG4gICAgICAnYm9yZGVyJyxcbiAgICAgICdib3JkZXItc2xhdGUtNTAwJyxcbiAgICAgICd0ZXh0LWJsYWNrJyxcbiAgICAgICdpdGVtcy1jZW50ZXInLFxuICAgICAgJ2p1c3RpZnktY2VudGVyJyxcbiAgICBdLFxuICAgIG51bGxcbiAgKTtcblxuICBpZiAocGxheWVyLmdhbWVib2FyZC5ib2FyZFt5XVt4XSAmJiBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3ldW3hdLmlzU3VuaygpKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWJsYWNrJyk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0ZXh0LXJlZC01MDAnKTtcbiAgfVxuXG4gIGlmIChcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3ldW3hdICYmXG4gICAgcGxheWVyLmdhbWVib2FyZC5ib2FyZFt5XVt4XS5oaXRzW3BsYXllci5nYW1lYm9hcmQuZ2V0U2hpcEluZGV4KHgsIHkpXVxuICApIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICdYJztcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2JnLWJsdWUtMjAwJyk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLm1pc3Nlc1t5XVt4XSkge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJ+KAoic7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBpZiAocGxheWVyLmlzQUkgPT09IGZhbHNlKSB7XG4gICAgaWYgKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbeV1beF0pIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYmctYmx1ZS0yMDAnKTtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hvdmVyOmJnLWdyYXktNDAwJyk7XG5cbiAgICAvLyBvbmx5IGFsbG93IHBsYXllciB0byBjbGljayBvbiBBSSBib2FyZFxuICAgIGVsZW1lbnQub25jbGljayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFja2luZ1BsYXllciA9XG4gICAgICAgICh0aGVHYW1lLnBsYXllcnMuZmluZEluZGV4KChlKSA9PiBlID09PSBwbGF5ZXIpICsgMSkgJSAyO1xuICAgICAgaWYgKHRoZUdhbWUucGxheWVyc1thdHRhY2tpbmdQbGF5ZXJdLmlzVmFsaWRBdHRhY2socGxheWVyLCB4LCB5KSkge1xuICAgICAgICB0aGVHYW1lLnBsYXllcnNbYXR0YWNraW5nUGxheWVyXS5hdHRhY2socGxheWVyLCB4LCB5KTtcblxuICAgICAgICBsZXQgZ2FtZUJvYXJkSWQgPSAnZ2FtZWJvYXJkJztcbiAgICAgICAgZ2FtZUJvYXJkSWQgKz0gKGF0dGFja2luZ1BsYXllciArIDEpICUgMjtcbiAgICAgICAgcmVkcmF3R2FtZUJvYXJkKHBsYXllciwgZ2FtZUJvYXJkSWQpOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGRpc3BsYXlHYW1lVGlsZShwbGF5ZXIsIHgsIHkpLCBlbGVtZW50KTtcblxuICAgICAgICAvLyBjaGVjayBnYW1lIG92ZXJcbiAgICAgICAgaWYgKHRoZUdhbWUuaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgZGlzcGxheUdhbWVPdmVyTW9kYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdUdXJuKHBsYXllcik7IC8vIGxldCBBSSBoYXZlIGEgdHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwbGFjZVNoaXBzKSB7XG5cbiAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4gZHJhZ092ZXIocGxheWVyLCB4LCB5LCBlKSk7XG4gICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSk7XG4gICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4gZHJvcChwbGF5ZXIsIHgsIHksIGUpKTtcblxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBkaXNwbGF5U2hpcFRpbGUgPSAoKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBudWxsLFxuICAgIFtcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAnYmctd2hpdGUnLFxuICAgICAgJ2ZsZXgnLFxuICAgICAgJ3ctOCcsXG4gICAgICAnaC04JyxcbiAgICAgICdib3JkZXInLFxuICAgICAgJ2JvcmRlci1zbGF0ZS01MDAnLFxuICAgICAgJ3RleHQtYmxhY2snLFxuICAgICAgJ2l0ZW1zLWNlbnRlcicsXG4gICAgICAnanVzdGlmeS1jZW50ZXInLFxuICAgIF0sXG4gICAgbnVsbFxuICApO1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBkaXNwbGF5U2hpcCA9IChzaGlwKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICAncGxhY2VzaGlwJyxcbiAgICBbXG4gICAgICAnZmxleCcsXG4gICAgICAndy1taW4nLFxuICAgICAgJ2l0ZW1zLWNlbnRlcicsXG4gICAgICAncGxhY2Utc2VsZi1jZW50ZXInLFxuICAgICAgJ2p1c3RpZnktY2VudGVyJ1xuICAgIF0sXG4gICAgbnVsbFxuICApO1xuICBcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuXG5cbiAgaWYgKHNoaXAuaXNIb3Jpem9udGFsKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmbGV4LXJvdycpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxleC1jb2wnKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVNoaXBUaWxlKCkpO1xuICB9XG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4gZHJhZ1N0YXJ0KHNoaXAsIGUpKTtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZCk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmNvbnN0IGRpc3BsYXlTaGlwVGl0bGUgPSAoc2hpcCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBbXG4gICAgICAnZ3JpZCcsXG4gICAgICAnZ3JpZC1yb3dzLTEnLFxuICAgICAgJ2dyaWQtY29scy0yJyxcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAndy1mdWxsJyxcbiAgICAgICdwbGFjZS1zZWxmLWVuZCdcbiAgICBdLFxuICAgICcmbmJzcDsnXG4gIClcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBzaGlwLnR5cGU7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheVJvdGF0ZUJ1dHRvbihzaGlwKSk7XG5cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuY29uc3QgZGlzcGxheVNoaXBDb250YWluZXIgPSAoZmxlZXQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIG51bGwsXG4gICAgWydncmlkJywgJ2gtODAnLCAndy04MCddLFxuICAgIG51bGxcbiAgKTtcblxuICBjb25zdCBzaGlwID0gZmxlZXQuc2hpZnQoKTtcblxuICBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlTaGlwKHNoaXApKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkaXNwbGF5U2hpcFRpdGxlKHNoaXApKTtcbiAgXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBkaXNwbGF5R2FtZUJvYXJkID0gKHBsYXllciwgcGxhY2VTaGlwcyA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IHBsYXllckluZGV4ID0gdGhlR2FtZS5wbGF5ZXJzLmZpbmRJbmRleCgocCkgPT4gcCA9PT0gcGxheWVyKTtcbiAgbGV0IGdhbWVCb2FyZElkID0gJ2dhbWVib2FyZCc7XG4gIGdhbWVCb2FyZElkICs9IHBsYXllckluZGV4O1xuXG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBnYW1lQm9hcmRJZCxcbiAgICBbJ2dyaWQnLCAnZ3JpZC1jb2xzLTEwJywgJ2dyaWQtcm93cy0xMScsICdtaW4tdy1jb250ZW50J10sXG4gICAgbnVsbFxuICApO1xuXG4gIGlmIChwbGFjZVNoaXBzID09PSB0cnVlKSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChkaXNwbGF5R2FtZUJvYXJkVGl0bGUoXCJQbGFjZSBTaGlwc1wiLCB0cnVlKSlcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlHYW1lQm9hcmRUaXRsZShwbGF5ZXIubmFtZSkpO1xuICB9ICBcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbMF0ubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheUdhbWVUaWxlKHBsYXllciwgaiwgaSwgcGxhY2VTaGlwcykpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgZGlzcGxheUdhbWUgPSAoZ2FtZSA9IHRoZUdhbWUsIGZsZWV0ID0gdGhlRmxlZXQpID0+IHtcbiAgdGhlR2FtZSA9IGdhbWU7XG4gIHRoZUZsZWV0ID0gZmxlZXQ7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICAnZ2FtZScsXG4gICAgWydmbGV4JywgJ2ZsZXgtd3JhcC1yZXZlcnNlJywgJ3ctZnVsbCcsICdqdXN0aWZ5LWNlbnRlcicsICdnYXAtOCddLFxuICAgIG51bGxcbiAgKTtcblxuICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlHYW1lQm9hcmQodGhlR2FtZS5wbGF5ZXJzWzFdKSk7XG4gIGlmIChmbGVldC5sZW5ndGggPiAwKSBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlTaGlwQ29udGFpbmVyKGZsZWV0KSk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheUdhbWVCb2FyZCh0aGVHYW1lLnBsYXllcnNbMF0sIHRydWUpKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXJNb2RhbCwgcmVkcmF3R2FtZUJvYXJkLCBkaXNwbGF5U2hpcCB9O1xuIiwiaW1wb3J0IGNyZWF0ZUh0bWxFbGVtZW50IGZyb20gJy4uL2hhbmRsZXJzL2NyZWF0ZUh0bWxFbGVtZW50JztcblxuY29uc3QgaGVhZGVyVGV4dCA9ICgpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdoMScsXG4gICAgJ251bGwnLFxuICAgIFtcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAndGV4dC0yeGwnLFxuICAgICAgJ3RleHQtY2VudGVyJyxcbiAgICAgICdhbGlnbi1taWRkbGUnLFxuICAgICAgJ2xlYWRpbmctMTAnLFxuICAgIF0sXG4gICAgJ0JhdHRsZVNoaXAnXG4gICk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBkaXNwbGF5SGVhZGVyID0gKCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2hlYWRlcicsICdoZWFkZXInLCBbXSwgbnVsbCk7XG5cbiAgZWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KCkpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUhlYWRlcjtcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuLi9mYWN0b3JpZXMvc2hpcEZhY3RvcnlcIjtcbmltcG9ydCB7IFNISVBfVFlQRVMgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9TaGlwc1wiO1xuaW1wb3J0IHsgZGlzcGxheUdhbWUgfSBmcm9tIFwiLi9kaXNwbGF5R2FtZVwiOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuY29uc3QgZHJhZ1N0YXJ0ID0gKHNoaXAsIGUpID0+IHtcbiAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIEpTT04uc3RyaW5naWZ5KHNoaXApKTtcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKGUudGFyZ2V0LDAsMCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS01MCcpLCAwKTtcblxufVxuXG5jb25zdCBkcmFnRW5kID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTUwJyk7XG59XG5cbmNvbnN0IGRyYWdPdmVyID0gKHBsYXllciwgeCwgeSwgZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHNoaXAgPSBKU09OLnBhcnNlKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7IFxuICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgc2hpcC5pc0hvcml6b250YWwpKSB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYmctYmx1ZS0yMDAnKTtcbiAgfSBlbHNlIHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdiZy1yZWQtMjAwJyk7XG4gIH1cbn1cblxuY29uc3QgZHJhZ0xlYXZlID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdiZy1ibHVlLTIwMCcpO1xuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdiZy1yZWQtMjAwJyk7XG59XG5cbmNvbnN0IGRyb3AgPSAocGxheWVyLCB4LCB5LCBlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZHJhZ0xlYXZlKGUpO1xuICBjb25zdCBzaGlwID0gSlNPTi5wYXJzZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJykpO1xuICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgc2hpcC5pc0hvcml6b250YWwpKSB7XG4gICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoU0hJUF9UWVBFUy5pbmRleE9mKHNoaXAudHlwZSkpLCB4LCB5LCBzaGlwLmlzSG9yaXpvbnRhbCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkaXNwbGF5R2FtZSgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpKTtcbiAgfVxufVxuXG5leHBvcnQgeyBkcmFnU3RhcnQsIGRyYWdFbmQsIGRyYWdPdmVyLCBkcmFnTGVhdmUsIGRyb3AgfSAvL2VzbGludC1kaXNhYmxlLWxpbmUiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuaW1wb3J0IGxvYWRWaWV3cyBmcm9tICcuL2hhbmRsZXJzL3ZpZXdzJztcblxuY29uc3Qgc3RhcnRBcHAgPSAoKSA9PiB7XG4gIGxvYWRWaWV3cygnI2NvbnRlbnQnKTtcbn07XG5cbnN0YXJ0QXBwKCk7XG4iXSwibmFtZXMiOlsiR2FtZSIsIlNoaXAiLCJkaXNwbGF5R2FtZSIsImRpc3BsYXlHYW1lT3Zlck1vZGFsIiwicmVkcmF3R2FtZUJvYXJkIiwiU0hJUF9UWVBFUyIsImdhbWUiLCJpbml0R2FtZSIsInBsYXllcnMiLCJzZXRUdXJuIiwicGxhY2VSYW5kb21TaGlwcyIsImNyZWF0ZUZsZWV0IiwiZmxlZXQiLCJmb3JFYWNoIiwic2hpcFR5cGUiLCJpbmRleCIsInNoaXAiLCJwdXNoIiwibmV3VHVybiIsInBsYXllciIsImlzQUkiLCJwbGF5ZXJJbmRleCIsImZpbmRJbmRleCIsInAiLCJhdHRhY2tSYW5kb20iLCJnYW1lQm9hcmRJZCIsImlzR2FtZU92ZXIiLCJjb25zb2xlIiwibG9nIiwiU0hJUF9MRU5HVEhTIiwiQ2FycmllciIsIkJhdHRsZXNoaXAiLCJDcnVpc2VyIiwiU3VibWFyaW5lIiwiRGVzdHJveWVyIiwiUGxheWVyIiwidGhlU2hpcCIsInN1Y2Nlc3MiLCJpc0hvcml6b250YWwiLCJNYXRoIiwicmFuZG9tIiwieCIsImZsb29yIiwiZ2FtZWJvYXJkIiwiYm9hcmQiLCJsZW5ndGgiLCJ5IiwiaXNWYWxpZFBvc2l0aW9uIiwicGxhY2VTaGlwIiwiZ2FtZU92ZXIiLCJhbGxTaGlwc1N1bmsiLCJTSVpFIiwiR2FtZWJvYXJkIiwiQXJyYXkiLCJmcm9tIiwibWlzc2VzIiwibWF4IiwibWluIiwiaSIsImhpdEluZGV4IiwiaGl0IiwiZ2V0U2hpcEluZGV4IiwiaiIsImlzU3VuayIsIm5hbWUiLCJ0dXJuIiwiX3R1cm4iLCJlbmVteSIsImhpdHMiLCJpc1ZhbGlkQXR0YWNrIiwicmVjZWl2ZUF0dGFjayIsImF0dGFja1ZlY3RvcnMiLCJrIiwiYXR0YWNrIiwiaWQiLCJ0eXBlIiwibnVtSGl0cyIsImVsZW1lbnQiLCJjcmVhdGVIdG1sRWxlbWVudCIsImFycmF5Q2xhc3NlcyIsImNvbnRlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJteUNsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiZGlzcGxheUhlYWRlciIsImdldEVsZW1lbnQiLCJzZWxlY3RvciIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwic2V0VGhlbWUiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImRvY3VtZW50RWxlbWVudCIsInJlbW92ZSIsIm1haW5MYXlvdXQiLCJhcHBlbmRDaGlsZCIsImxvYWRWaWV3cyIsIm1haW5Db250ZW50IiwiZHJhZ1N0YXJ0IiwiZHJhZ0VuZCIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwiZHJvcCIsInRoZUdhbWUiLCJ0aGVGbGVldCIsInRoZUJvYXJkIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZXBsYWNlQ2hpbGQiLCJkaXNwbGF5R2FtZUJvYXJkIiwiZGlzcGxheUdhbWVPdmVyTW9kYWxDb250ZW50IiwiYm9keSIsIm9uY2xpY2siLCJldmVudCIsInRhcmdldCIsInJlbW92ZUNoaWxkIiwiZGlzcGxheVJvdGF0ZUJ1dHRvbiIsInJvdGF0ZSIsInBhcmVudEVsZW1lbnQiLCJkaXNwbGF5U2hpcCIsImRpc3BsYXlHYW1lQm9hcmRUaXRsZSIsInRpdGxlIiwiZGlzcGxheUdhbWVUaWxlIiwicGxhY2VTaGlwcyIsImF0dGFja2luZ1BsYXllciIsImUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGxheVNoaXBUaWxlIiwic2V0QXR0cmlidXRlIiwiZGlzcGxheVNoaXBUaXRsZSIsImRpc3BsYXlTaGlwQ29udGFpbmVyIiwic2hpZnQiLCJoZWFkZXJUZXh0IiwiZGF0YVRyYW5zZmVyIiwiZWZmZWN0QWxsb3dlZCIsInNldERhdGEiLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0RHJhZ0ltYWdlIiwic2V0VGltZW91dCIsInByZXZlbnREZWZhdWx0IiwicGFyc2UiLCJnZXREYXRhIiwiaW5kZXhPZiIsInN0YXJ0QXBwIl0sInNvdXJjZVJvb3QiOiIifQ==