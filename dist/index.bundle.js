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
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "initGame": () => (/* binding */ initGame),
/* harmony export */   "newTurn": () => (/* binding */ newTurn),
/* harmony export */   "placeRandomShips": () => (/* binding */ placeRandomShips)
/* harmony export */ });
/* harmony import */ var _factories_gameFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/gameFactory */ "./src/factories/gameFactory.js");
/* harmony import */ var _views_displayGame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/displayGame */ "./src/views/displayGame.js");

 //eslint-disable-line

var game; //eslint-disable-line

var placeRandomShips = function placeRandomShips() {
  // for now place random ships
  game.players.forEach(function (player) {
    return game.placeRandomShips(player);
  });
};

var initGame = function initGame() {
  game = new _factories_gameFactory__WEBPACK_IMPORTED_MODULE_0__["default"]();
  game.players[0].setTurn(game.players[1]);
  placeRandomShips();
  return game;
};

var newTurn = function newTurn(player) {
  if (player.isAI === true) {
    var playerIndex = game.players.findIndex(function (p) {
      return p === player;
    });
    game.players[playerIndex].attackRandom(game.players[(playerIndex + 1) % 2]);
    var gameBoardId = 'gameboard';
    gameBoardId += (playerIndex + 1) % 2;
    (0,_views_displayGame__WEBPACK_IMPORTED_MODULE_1__.redrawGameBoard)(game.players[(playerIndex + 1) % 2], gameBoardId); // check game over

    if (game.isGameOver()) {
      console.log('GAME OVER'); //eslint-disable-line

      (0,_views_displayGame__WEBPACK_IMPORTED_MODULE_1__.displayGameOverModal)();
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
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Ship, [{
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
/* harmony import */ var _views_displayGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/displayGame */ "./src/views/displayGame.js");
/* harmony import */ var _views_displayHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/displayHeader */ "./src/views/displayHeader.js");
/* harmony import */ var _createHtmlElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createHtmlElement */ "./src/handlers/createHtmlElement.js");
/* harmony import */ var _components_GameController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/GameController */ "./src/components/GameController.js");





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
  var element = (0,_createHtmlElement__WEBPACK_IMPORTED_MODULE_2__["default"])('div', null, ['flex', 'flex-col', 'w-full', 'content-center', 'gap-8'], null);
  (0,_components_GameController__WEBPACK_IMPORTED_MODULE_3__.initGame)();
  element.appendChild((0,_views_displayHeader__WEBPACK_IMPORTED_MODULE_1__["default"])());
  element.appendChild((0,_views_displayGame__WEBPACK_IMPORTED_MODULE_0__.displayGame)(_components_GameController__WEBPACK_IMPORTED_MODULE_3__.game));
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
/* harmony export */   "redrawGameBoard": () => (/* binding */ redrawGameBoard)
/* harmony export */ });
/* harmony import */ var _components_GameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/GameController */ "./src/components/GameController.js");
/* harmony import */ var _handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../handlers/createHtmlElement */ "./src/handlers/createHtmlElement.js");
// import Game from "../factories/gameFactory";
 //eslint-disable-line


var theGame;

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
      var game = document.getElementById('game');
      game.parentNode.replaceChild(displayGame(theGame), game); // eslint-disable-line

      document.body.removeChild(element);
    }
  };
};

var displayGameBoardTitle = function displayGameBoardTitle(player) {
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', null, ['font-["PressStart2P"]', 'col-span-10'], null);
  element.innerHTML = player.name;
  return element;
};

var displayGameTile = function displayGameTile(player, x, y) {
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

  return element;
};

var displayGameBoard = function displayGameBoard(player) {
  var playerIndex = theGame.players.findIndex(function (p) {
    return p === player;
  });
  var gameBoardId = 'gameboard';
  gameBoardId += playerIndex;
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', gameBoardId, ['grid', 'grid-cols-10', 'grid-rows-11', 'min-w-content'], null);
  element.appendChild(displayGameBoardTitle(player));

  for (var i = 0; i < player.gameboard.board.length; i += 1) {
    for (var j = 0; j < player.gameboard.board[0].length; j += 1) {
      element.appendChild(displayGameTile(player, j, i));
    }
  }

  return element;
};

var redrawGameBoard = function redrawGameBoard(player, id) {
  var theBoard = document.getElementById(id);
  theBoard.parentNode.replaceChild(displayGameBoard(player), theBoard);
};

var displayGame = function displayGame(game) {
  theGame = game;
  var element = (0,_handlers_createHtmlElement__WEBPACK_IMPORTED_MODULE_1__["default"])('div', 'game', ['flex', 'flex-wrap-reverse', 'w-full', 'justify-center', 'gap-8'], null);
  element.appendChild(displayGameBoard(theGame.players[1]));
  element.appendChild(displayGameBoard(theGame.players[0])); // element.appendChild(displayGameOverModal());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7O0FBRUEsSUFBTStCLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07RUFDckJsQiwyREFBUyxDQUFDLFVBQUQsQ0FBVDtBQUNELENBRkQ7O0FBSUFrQixRQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb21wb25lbnRzL0dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvbXBvbmVudHMvU2hpcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZmFjdG9yaWVzL2dhbWVGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9oYW5kbGVycy9jcmVhdGVIdG1sRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9oYW5kbGVycy92aWV3cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy92aWV3cy9kaXNwbGF5R2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy92aWV3cy9kaXNwbGF5SGVhZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlcy5jc3M/NTIzMSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lIGZyb20gJy4uL2ZhY3Rvcmllcy9nYW1lRmFjdG9yeSc7XG5pbXBvcnQge2Rpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXJNb2RhbCxyZWRyYXdHYW1lQm9hcmR9IGZyb20gJy4uL3ZpZXdzL2Rpc3BsYXlHYW1lJzsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5cbmxldCBnYW1lOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuY29uc3QgcGxhY2VSYW5kb21TaGlwcyA9ICgpID0+IHtcbiAgLy8gZm9yIG5vdyBwbGFjZSByYW5kb20gc2hpcHNcbiAgZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4gZ2FtZS5wbGFjZVJhbmRvbVNoaXBzKHBsYXllcikpO1xufTtcblxuY29uc3QgaW5pdEdhbWUgPSAoKSA9PiB7XG4gIGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnBsYXllcnNbMF0uc2V0VHVybihnYW1lLnBsYXllcnNbMV0pO1xuICBwbGFjZVJhbmRvbVNoaXBzKCk7XG4gIHJldHVybiBnYW1lO1xufTtcblxuY29uc3QgbmV3VHVybiA9IChwbGF5ZXIpID0+IHtcbiAgaWYgKHBsYXllci5pc0FJID09PSB0cnVlKSB7XG4gICAgY29uc3QgcGxheWVySW5kZXggPSBnYW1lLnBsYXllcnMuZmluZEluZGV4KChwKSA9PiBwID09PSBwbGF5ZXIpO1xuICAgIGdhbWUucGxheWVyc1twbGF5ZXJJbmRleF0uYXR0YWNrUmFuZG9tKGdhbWUucGxheWVyc1socGxheWVySW5kZXggKyAxKSAlIDJdKTtcblxuICAgIGxldCBnYW1lQm9hcmRJZCA9ICdnYW1lYm9hcmQnO1xuICAgIGdhbWVCb2FyZElkICs9IChwbGF5ZXJJbmRleCArIDEpICUgMjtcblxuICAgIHJlZHJhd0dhbWVCb2FyZChnYW1lLnBsYXllcnNbKHBsYXllckluZGV4ICsgMSkgJSAyXSwgZ2FtZUJvYXJkSWQpO1xuXG4gICAgLy8gY2hlY2sgZ2FtZSBvdmVyXG4gICAgaWYgKGdhbWUuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBjb25zb2xlLmxvZygnR0FNRSBPVkVSJyk7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZGlzcGxheUdhbWVPdmVyTW9kYWwoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGluaXRHYW1lLCBwbGFjZVJhbmRvbVNoaXBzLCBuZXdUdXJuLCBnYW1lIH07XG4iLCJleHBvcnQgY29uc3QgU0hJUF9UWVBFUyA9IFtcbiAgJ0NhcnJpZXInLFxuICAnQmF0dGxlc2hpcCcsXG4gICdDcnVpc2VyJyxcbiAgJ1N1Ym1hcmluZScsXG4gICdEZXN0cm95ZXInLFxuXTtcblxuZXhwb3J0IGNvbnN0IFNISVBfTEVOR1RIUyA9IHtcbiAgQ2FycmllcjogNSxcbiAgQmF0dGxlc2hpcDogNCxcbiAgQ3J1aXNlcjogMyxcbiAgU3VibWFyaW5lOiAzLFxuICBEZXN0cm95ZXI6IDIsXG59O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllckZhY3RvcnknO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSc7XG5pbXBvcnQgeyBTSElQX1RZUEVTIH0gZnJvbSAnLi4vY29tcG9uZW50cy9TaGlwcyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBsYXllcnMgPSBbXTtcbiAgICB0aGlzLnBsYXllcnNbMF0gPSBuZXcgUGxheWVyKCdQbGF5ZXInKTtcbiAgICB0aGlzLnBsYXllcnNbMV0gPSBuZXcgUGxheWVyKCdFbmVteScsIHRydWUpO1xuICB9XG5cbiAgcGxhY2VSYW5kb21TaGlwcyhwbGF5ZXIpIHsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgU0hJUF9UWVBFUy5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdGhlU2hpcCA9IG5ldyBTaGlwKGluZGV4KTtcbiAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICB3aGlsZSAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcbiAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllci5nYW1lYm9hcmQuYm9hcmRbMF0ubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoKTtcblxuICAgICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5pc1ZhbGlkUG9zaXRpb24odGhlU2hpcCwgeCwgeSwgaXNIb3Jpem9udGFsKSkge1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHRoZVNoaXAsIHgsIHksIGlzSG9yaXpvbnRhbCk7XG4gICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzR2FtZU92ZXIoKSB7XG4gICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcikgPT4ge1xuICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkgPT09IHRydWUpIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ2FtZU92ZXI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNvbnN0IFNJWkUgPSAxMDtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oQXJyYXkoU0laRSksICgpID0+IG5ldyBBcnJheShTSVpFKSk7XG4gICAgdGhpcy5taXNzZXMgPSBBcnJheS5mcm9tKEFycmF5KFNJWkUpLCAoKSA9PiBuZXcgQXJyYXkoU0laRSkpO1xuICB9XG5cbiAgaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHksIGlzSG9yaXpvbnRhbCkge1xuICAgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8vIGNoZWNrIGhvcml6b250YWwgb3ZlcmxhcHBpbmcgc2hpcHMgJiBub3Qgb2ZmIGdhbWVib2FyZCBlZGdlXG4gICAgLy8gY29uc3QgeiA9IHNoaXAubGVuZ3RoO1xuXG4gICAgaWYgKGlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHggKyBzaGlwLmxlbmd0aCA+IFNJWkUpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gY2hlY2sgbm90IG92ZXJsYXBwaW5nIC8gbmV4dCB0byBhIHNoaXBcbiAgICAgIGlmICh0aGlzLmJvYXJkW3ldW01hdGgubWF4KDAsIHggLSAxKV0pIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmJvYXJkW3ldW01hdGgubWluKHggKyBzaGlwLmxlbmd0aCwgU0laRSAtIDEpXSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeV1beCArIGldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW01hdGgubWluKHkgKyAxLCB0aGlzLmJvYXJkLmxlbmd0aCAtIDEpXVt4ICsgaV0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtNYXRoLm1heCgwLCB5IC0gMSldW3ggKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoZWNrIHZlcnRpY2FsIG92ZXJsYXBwaW5nIHNoaXBzICYgbm90IG9mZiBnYW1lYm9hcmQgZWRnZVxuICAgIGlmIChpc0hvcml6b250YWwgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoeSArIHNoaXAubGVuZ3RoID4gU0laRSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5ib2FyZFtNYXRoLm1heCgwLCB5IC0gMSldW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ib2FyZFtNYXRoLm1pbih5ICsgc2hpcC5sZW5ndGgsIFNJWkUgLSAxKV1beF0pIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIGlmICh0aGlzLmJvYXJkW3kgKyBzaGlwLmxlbmd0aF1beF0pIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt5ICsgaV1beF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbeSArIGldW01hdGgubWluKHggKyAxLCB0aGlzLmJvYXJkWzBdLmxlbmd0aCAtIDEpXSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3kgKyBpXVtNYXRoLm1heCgwLCB4IC0gMSldKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt5ICsgaV1beF0pIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCB4LCB5LCBpc0hvcml6b250YWwpIHtcbiAgICAvLyBjaGVjayBpZiBwb3Npc2JsZSB0byBwbGFjZSBwZWljZVxuICAgIGlmICghdGhpcy5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSwgaXNIb3Jpem9udGFsKSkgcmV0dXJuO1xuXG4gICAgLy8gcGxhY2VzIGhvcml6b250YWwgLSB0b2FkZCB2ZXJ0aWNhbCBwbGFjZW1lbnRcbiAgICBpZiAoaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt5XVt4ICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0hvcml6b250YWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt5ICsgaV1beF0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFNoaXBJbmRleCh4LCB5KSB7XG4gICAgbGV0IGhpdEluZGV4ID0gMDtcbiAgICAvLyBjaGVjayBob3Jpem9udGFsXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmJvYXJkW3ldW3hdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoeCAtIGkgPj0gMCkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt5XVt4IC0gaV0gPT09IHRoaXMuYm9hcmRbeV1beF0pIHtcbiAgICAgICAgICBoaXRJbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIHZlcnRpY2FsXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmJvYXJkW3ldW3hdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoeSAtIGkgPj0gMCkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt5IC0gaV1beF0gPT09IHRoaXMuYm9hcmRbeV1beF0pIHtcbiAgICAgICAgICBoaXRJbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoaXRJbmRleDtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIC8vIGNoZWNrIGlmIGhpdCBhIHNoaXBcbiAgICBpZiAodGhpcy5ib2FyZFt5XVt4XSkge1xuICAgICAgdGhpcy5ib2FyZFt5XVt4XS5oaXQodGhpcy5nZXRTaGlwSW5kZXgoeCwgeSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pc3Nlc1t5XVt4XSA9ICdtaXNzJztcbiAgICB9XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTSVpFOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgU0laRTsgaiArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW2ldW2pdKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmJvYXJkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5JztcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSA9ICdQbGF5ZXInLCBpc0FJID0gZmFsc2UpIHtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLmlzQUkgPSBpc0FJO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXQgdHVybigpIHtcbiAgICByZXR1cm4gdGhpcy5fdHVybjsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cblxuICBzZXQgdHVybih4KSB7XG4gICAgdGhpcy5fdHVybiA9IHg7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG5cbiAgc2V0VHVybihlbmVteSkge1xuICAgIHRoaXMudHVybiA9IHRydWU7XG4gICAgZW5lbXkudHVybiA9IGZhbHNlOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxuXG4gIGlzVmFsaWRBdHRhY2socGxheWVyLCB4LCB5KSB7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8vIG1ha2Ugc3VyZSBmYWxscyB3aXRoaW4gYm91bmRzIG9mIGdhbWVib2FyZFxuICAgIGlmICh4IDwgMCB8fCB4ID49IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbMF0ubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHkgPCAwIHx8IHkgPj0gcGxheWVyLmdhbWVib2FyZC5ib2FyZC5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLm1pc3Nlc1t5XVt4XSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKHBsYXllci5nYW1lYm9hcmQuYm9hcmRbeV1beF0pIHtcbiAgICAgIGlmIChcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5ib2FyZFt5XVt4XS5oaXRzW3BsYXllci5nYW1lYm9hcmQuZ2V0U2hpcEluZGV4KHgsIHkpXVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhdHRhY2socGxheWVyLCB4LCB5KSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZEF0dGFjayhwbGF5ZXIsIHgsIHkpKSB7XG4gICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNrUmFuZG9tKHBsYXllcikge1xuICAgIC8vIGNoZWNrIGZvciBhbnkgaGl0cyB3aXRob3V0IHN1bmsgc2hpcHNcbiAgICAvLyBjaGVjayBzdXJyb3VuZGluZyBzcGFjZXMsIGlmIG5vdCBhIHZhbGlkIG1vdmUgdGhlbiBjaG9vc2UgdGhlIG5leHQgJ2hpdCdcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbMF0ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyLmdhbWVib2FyZC5ib2FyZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAocGxheWVyLmdhbWVib2FyZC5ib2FyZFtqXVtpXSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQuYm9hcmRbal1baV0uaGl0c1tcbiAgICAgICAgICAgICAgcGxheWVyLmdhbWVib2FyZC5nZXRTaGlwSW5kZXgoaSwgailcbiAgICAgICAgICAgIF0gPT09ICdoaXQnICYmXG4gICAgICAgICAgICAhcGxheWVyLmdhbWVib2FyZC5ib2FyZFtqXVtpXS5pc1N1bmsoKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgYXR0YWNrVmVjdG9ycyA9IFtcbiAgICAgICAgICAgICAgWy0xLCAwXSxcbiAgICAgICAgICAgICAgWzAsIDFdLFxuICAgICAgICAgICAgICBbMSwgMF0sXG4gICAgICAgICAgICAgIFswLCAtMV0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGF0dGFja1ZlY3RvcnMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuaXNWYWxpZEF0dGFjayhcbiAgICAgICAgICAgICAgICAgIHBsYXllcixcbiAgICAgICAgICAgICAgICAgIGkgKyBhdHRhY2tWZWN0b3JzW2tdWzBdLFxuICAgICAgICAgICAgICAgICAgaiArIGF0dGFja1ZlY3RvcnNba11bMV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKFxuICAgICAgICAgICAgICAgICAgcGxheWVyLFxuICAgICAgICAgICAgICAgICAgaSArIGF0dGFja1ZlY3RvcnNba11bMF0sXG4gICAgICAgICAgICAgICAgICBqICsgYXR0YWNrVmVjdG9yc1trXVsxXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICB3aGlsZSAoc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkWzBdLmxlbmd0aCk7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGxheWVyLmdhbWVib2FyZC5ib2FyZC5sZW5ndGgpO1xuXG4gICAgICBpZiAodGhpcy5pc1ZhbGlkQXR0YWNrKHBsYXllciwgeCwgeSkpIHtcbiAgICAgICAgdGhpcy5hdHRhY2socGxheWVyLCB4LCB5KTtcbiAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IHsgU0hJUF9UWVBFUywgU0hJUF9MRU5HVEhTIH0gZnJvbSAnLi4vY29tcG9uZW50cy9TaGlwcyc7XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihpZCkge1xuICAgIHRoaXMudHlwZSA9IFNISVBfVFlQRVNbaWRdO1xuICAgIHRoaXMubGVuZ3RoID0gU0hJUF9MRU5HVEhTW3RoaXMudHlwZV07XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhpdHNbaW5kZXhdID0gJ2hpdCc7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgbGV0IG51bUhpdHMgPSAwO1xuICAgIHRoaXMuaGl0cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gJ2hpdCcpIHtcbiAgICAgICAgbnVtSGl0cyArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChudW1IaXRzID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSHRtbEVsZW1lbnQodHlwZSwgaWQsIGFycmF5Q2xhc3NlcywgY29udGVudCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgaWYgKGlkKSBlbGVtZW50LmlkID0gaWQ7XG4gIGlmIChhcnJheUNsYXNzZXMpIHtcbiAgICBhcnJheUNsYXNzZXMuZm9yRWFjaCgobXlDbGFzcykgPT4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKG15Q2xhc3MpKTtcbiAgfVxuICBpZiAoY29udGVudCkgZWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuIiwiaW1wb3J0IHsgZGlzcGxheUdhbWUgfSBmcm9tICcuLi92aWV3cy9kaXNwbGF5R2FtZSc7XG5pbXBvcnQgZGlzcGxheUhlYWRlciBmcm9tICcuLi92aWV3cy9kaXNwbGF5SGVhZGVyJztcbmltcG9ydCBjcmVhdGVIdG1sRWxlbWVudCBmcm9tICcuL2NyZWF0ZUh0bWxFbGVtZW50JztcbmltcG9ydCB7IGluaXRHYW1lLCBnYW1lIH0gZnJvbSAnLi4vY29tcG9uZW50cy9HYW1lQ29udHJvbGxlcic7XG5cbmNvbnN0IGdldEVsZW1lbnQgPSAoc2VsZWN0b3IsIHBhcmVudE5vZGUgPSBkb2N1bWVudCkgPT5cbiAgcGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuY29uc3Qgc2V0VGhlbWUgPSAoKSA9PiB7XG4gIC8vIHNldCBsaWdodCAvIGRhcmsgdGhlbWUgYmFzZWQgb24gbWVkaWEgcHJlZmVyZW5jZVxuICBpZiAoXG4gICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXNcbiAgKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICB9XG59O1xuXG5jb25zdCBtYWluTGF5b3V0ID0gKCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBbJ2ZsZXgnLCAnZmxleC1jb2wnLCAndy1mdWxsJywgJ2NvbnRlbnQtY2VudGVyJywgJ2dhcC04J10sXG4gICAgbnVsbFxuICApO1xuXG4gIGluaXRHYW1lKCk7XG5cbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkaXNwbGF5SGVhZGVyKCkpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlHYW1lKGdhbWUpKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmNvbnN0IGxvYWRWaWV3cyA9IChzZWxlY3RvcikgPT4ge1xuICBzZXRUaGVtZSgpO1xuXG4gIGNvbnN0IG1haW5Db250ZW50ID0gZ2V0RWxlbWVudChzZWxlY3Rvcik7XG4gIG1haW5Db250ZW50LmFwcGVuZENoaWxkKG1haW5MYXlvdXQoKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9hZFZpZXdzO1xuIiwiLy8gaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2ZhY3Rvcmllcy9nYW1lRmFjdG9yeVwiO1xuaW1wb3J0IHtpbml0R2FtZSwgbmV3VHVybiwgcGxhY2VSYW5kb21TaGlwc30gZnJvbSAnLi4vY29tcG9uZW50cy9HYW1lQ29udHJvbGxlcic7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuaW1wb3J0IGNyZWF0ZUh0bWxFbGVtZW50IGZyb20gJy4uL2hhbmRsZXJzL2NyZWF0ZUh0bWxFbGVtZW50JztcblxubGV0IHRoZUdhbWU7XG5cbmNvbnN0IGRpc3BsYXlHYW1lT3Zlck1vZGFsQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIG51bGwsXG4gICAgW1xuICAgICAgJ2ZvbnQtW1wiUHJlc3NTdGFydDJQXCJdJyxcbiAgICAgICd0ZXh0LXdoaXRlJyxcbiAgICAgICdiZy1ibGFjaycsXG4gICAgICAnYmctb3BhY2l0eS01MCcsXG4gICAgICAnZmxleCcsXG4gICAgICAndy1mdWxsJyxcbiAgICAgICdoLTI0JyxcbiAgICAgICdqdXN0aWZ5LWNlbnRlcicsXG4gICAgICAnaXRlbXMtY2VudGVyJyxcbiAgICBdLFxuICAgICdHQU1FIE9WRVInXG4gICk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZU92ZXJNb2RhbCA9ICgpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdkaXYnLFxuICAgICdnYW1lLW92ZXItbW9kYWwnLFxuICAgIFtcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAnZmxleCcsXG4gICAgICAnaXRlbXMtY2VudGVyJyxcbiAgICAgICdqdXN0aWZ5LWNlbnRlcicsXG4gICAgICAnZml4ZWQnLFxuICAgICAgJ3otMTAnLFxuICAgICAgJ2luc2V0LTAnLFxuICAgICAgJ3ctZnVsbCcsXG4gICAgICAnaC1mdWxsJyxcbiAgICAgICdvdmVyZmxvdy15LWF1dG8nLFxuICAgICAgJ2JnLWdyYXktNTAwJyxcbiAgICAgICdiZy1vcGFjaXR5LTc1JyxcbiAgICBdLFxuICAgIG51bGxcbiAgKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlHYW1lT3Zlck1vZGFsQ29udGVudCgpKTtcblxuICB3aW5kb3cub25jbGljayA9IChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IGVsZW1lbnQpIHtcbiAgICAgIHRoZUdhbWUgPSBpbml0R2FtZSgpO1xuICAgICAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG4gICAgICBnYW1lLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGRpc3BsYXlHYW1lKHRoZUdhbWUpLCBnYW1lKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG4gIH07XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZUJvYXJkVGl0bGUgPSAocGxheWVyKSA9PiB7IFxuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgbnVsbCxcbiAgICBbJ2ZvbnQtW1wiUHJlc3NTdGFydDJQXCJdJywgJ2NvbC1zcGFuLTEwJ10sXG4gICAgbnVsbFxuICApO1xuXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gcGxheWVyLm5hbWU7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZVRpbGUgPSAocGxheWVyLCB4LCB5KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBjcmVhdGVIdG1sRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICBudWxsLFxuICAgIFtcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAnYmctd2hpdGUnLFxuICAgICAgJ2ZsZXgnLFxuICAgICAgJ3ctOCcsXG4gICAgICAnaC04JyxcbiAgICAgICdib3JkZXInLFxuICAgICAgJ2JvcmRlci1zbGF0ZS01MDAnLFxuICAgICAgJ3RleHQtYmxhY2snLFxuICAgICAgJ2l0ZW1zLWNlbnRlcicsXG4gICAgICAnanVzdGlmeS1jZW50ZXInLFxuICAgIF0sXG4gICAgbnVsbFxuICApO1xuXG4gIGlmIChwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3ldW3hdICYmIHBsYXllci5nYW1lYm9hcmQuYm9hcmRbeV1beF0uaXNTdW5rKCkpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtYmxhY2snKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3RleHQtcmVkLTUwMCcpO1xuICB9XG5cbiAgaWYgKFxuICAgIHBsYXllci5nYW1lYm9hcmQuYm9hcmRbeV1beF0gJiZcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3ldW3hdLmhpdHNbcGxheWVyLmdhbWVib2FyZC5nZXRTaGlwSW5kZXgoeCwgeSldXG4gICkge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJ1gnO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYmctYmx1ZS0yMDAnKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgaWYgKHBsYXllci5nYW1lYm9hcmQubWlzc2VzW3ldW3hdKSB7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAn4oCiJztcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGlmIChwbGF5ZXIuaXNBSSA9PT0gZmFsc2UpIHtcbiAgICBpZiAocGxheWVyLmdhbWVib2FyZC5ib2FyZFt5XVt4XSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdiZy1ibHVlLTIwMCcpO1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaG92ZXI6YmctZ3JheS00MDAnKTtcblxuICAgIC8vIG9ubHkgYWxsb3cgcGxheWVyIHRvIGNsaWNrIG9uIEFJIGJvYXJkXG4gICAgZWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgY29uc3QgYXR0YWNraW5nUGxheWVyID1cbiAgICAgICAgKHRoZUdhbWUucGxheWVycy5maW5kSW5kZXgoKGUpID0+IGUgPT09IHBsYXllcikgKyAxKSAlIDI7XG4gICAgICBpZiAodGhlR2FtZS5wbGF5ZXJzW2F0dGFja2luZ1BsYXllcl0uaXNWYWxpZEF0dGFjayhwbGF5ZXIsIHgsIHkpKSB7XG4gICAgICAgIHRoZUdhbWUucGxheWVyc1thdHRhY2tpbmdQbGF5ZXJdLmF0dGFjayhwbGF5ZXIsIHgsIHkpO1xuXG4gICAgICAgIGxldCBnYW1lQm9hcmRJZCA9ICdnYW1lYm9hcmQnO1xuICAgICAgICBnYW1lQm9hcmRJZCArPSAoYXR0YWNraW5nUGxheWVyICsgMSkgJSAyO1xuICAgICAgICByZWRyYXdHYW1lQm9hcmQocGxheWVyLCBnYW1lQm9hcmRJZCk7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZGlzcGxheUdhbWVUaWxlKHBsYXllciwgeCwgeSksIGVsZW1lbnQpO1xuXG4gICAgICAgIC8vIGNoZWNrIGdhbWUgb3ZlclxuICAgICAgICBpZiAodGhlR2FtZS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICBkaXNwbGF5R2FtZU92ZXJNb2RhbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1R1cm4ocGxheWVyKTsgLy8gbGV0IEFJIGhhdmUgYSB0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZUJvYXJkID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBwbGF5ZXJJbmRleCA9IHRoZUdhbWUucGxheWVycy5maW5kSW5kZXgoKHApID0+IHAgPT09IHBsYXllcik7XG4gIGxldCBnYW1lQm9hcmRJZCA9ICdnYW1lYm9hcmQnO1xuICBnYW1lQm9hcmRJZCArPSBwbGF5ZXJJbmRleDtcblxuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgZ2FtZUJvYXJkSWQsXG4gICAgWydncmlkJywgJ2dyaWQtY29scy0xMCcsICdncmlkLXJvd3MtMTEnLCAnbWluLXctY29udGVudCddLFxuICAgIG51bGxcbiAgKTtcblxuICBlbGVtZW50LmFwcGVuZENoaWxkKGRpc3BsYXlHYW1lQm9hcmRUaXRsZShwbGF5ZXIpKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllci5nYW1lYm9hcmQuYm9hcmRbMF0ubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheUdhbWVUaWxlKHBsYXllciwgaiwgaSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgcmVkcmF3R2FtZUJvYXJkID0gKHBsYXllciwgaWQpID0+IHtcbiAgY29uc3QgdGhlQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIHRoZUJvYXJkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGRpc3BsYXlHYW1lQm9hcmQocGxheWVyKSwgdGhlQm9hcmQpO1xufTtcblxuY29uc3QgZGlzcGxheUdhbWUgPSAoZ2FtZSkgPT4ge1xuICB0aGVHYW1lID0gZ2FtZTtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdkaXYnLFxuICAgICdnYW1lJyxcbiAgICBbJ2ZsZXgnLCAnZmxleC13cmFwLXJldmVyc2UnLCAndy1mdWxsJywgJ2p1c3RpZnktY2VudGVyJywgJ2dhcC04J10sXG4gICAgbnVsbFxuICApO1xuXG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheUdhbWVCb2FyZCh0aGVHYW1lLnBsYXllcnNbMV0pKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZChkaXNwbGF5R2FtZUJvYXJkKHRoZUdhbWUucGxheWVyc1swXSkpO1xuXG4gIC8vIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZGlzcGxheUdhbWVPdmVyTW9kYWwoKSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyTW9kYWwsIHJlZHJhd0dhbWVCb2FyZCB9O1xuIiwiaW1wb3J0IGNyZWF0ZUh0bWxFbGVtZW50IGZyb20gJy4uL2hhbmRsZXJzL2NyZWF0ZUh0bWxFbGVtZW50JztcblxuY29uc3QgaGVhZGVyVGV4dCA9ICgpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KFxuICAgICdoMScsXG4gICAgJ251bGwnLFxuICAgIFtcbiAgICAgICdmb250LVtcIlByZXNzU3RhcnQyUFwiXScsXG4gICAgICAndGV4dC0yeGwnLFxuICAgICAgJ3RleHQtY2VudGVyJyxcbiAgICAgICdhbGlnbi1taWRkbGUnLFxuICAgICAgJ2xlYWRpbmctMTAnLFxuICAgIF0sXG4gICAgJ0JhdHRsZVNoaXAnXG4gICk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBkaXNwbGF5SGVhZGVyID0gKCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2hlYWRlcicsICdoZWFkZXInLCBbXSwgbnVsbCk7XG5cbiAgZWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJUZXh0KCkpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUhlYWRlcjtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5pbXBvcnQgbG9hZFZpZXdzIGZyb20gJy4vaGFuZGxlcnMvdmlld3MnO1xuXG5jb25zdCBzdGFydEFwcCA9ICgpID0+IHtcbiAgbG9hZFZpZXdzKCcjY29udGVudCcpO1xufTtcblxuc3RhcnRBcHAoKTtcbiJdLCJuYW1lcyI6WyJHYW1lIiwiZGlzcGxheUdhbWUiLCJkaXNwbGF5R2FtZU92ZXJNb2RhbCIsInJlZHJhd0dhbWVCb2FyZCIsImdhbWUiLCJwbGFjZVJhbmRvbVNoaXBzIiwicGxheWVycyIsImZvckVhY2giLCJwbGF5ZXIiLCJpbml0R2FtZSIsInNldFR1cm4iLCJuZXdUdXJuIiwiaXNBSSIsInBsYXllckluZGV4IiwiZmluZEluZGV4IiwicCIsImF0dGFja1JhbmRvbSIsImdhbWVCb2FyZElkIiwiaXNHYW1lT3ZlciIsImNvbnNvbGUiLCJsb2ciLCJTSElQX1RZUEVTIiwiU0hJUF9MRU5HVEhTIiwiQ2FycmllciIsIkJhdHRsZXNoaXAiLCJDcnVpc2VyIiwiU3VibWFyaW5lIiwiRGVzdHJveWVyIiwiUGxheWVyIiwiU2hpcCIsInNoaXAiLCJpbmRleCIsInRoZVNoaXAiLCJzdWNjZXNzIiwiaXNIb3Jpem9udGFsIiwiTWF0aCIsInJhbmRvbSIsIngiLCJmbG9vciIsImdhbWVib2FyZCIsImJvYXJkIiwibGVuZ3RoIiwieSIsImlzVmFsaWRQb3NpdGlvbiIsInBsYWNlU2hpcCIsImdhbWVPdmVyIiwiYWxsU2hpcHNTdW5rIiwiU0laRSIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsIm1pc3NlcyIsIm1heCIsIm1pbiIsImkiLCJoaXRJbmRleCIsImhpdCIsImdldFNoaXBJbmRleCIsImoiLCJpc1N1bmsiLCJuYW1lIiwidHVybiIsIl90dXJuIiwiZW5lbXkiLCJoaXRzIiwiaXNWYWxpZEF0dGFjayIsInJlY2VpdmVBdHRhY2siLCJhdHRhY2tWZWN0b3JzIiwiayIsImF0dGFjayIsImlkIiwidHlwZSIsIm51bUhpdHMiLCJlbGVtZW50IiwiY3JlYXRlSHRtbEVsZW1lbnQiLCJhcnJheUNsYXNzZXMiLCJjb250ZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwibXlDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImlubmVySFRNTCIsImRpc3BsYXlIZWFkZXIiLCJnZXRFbGVtZW50Iiwic2VsZWN0b3IiLCJwYXJlbnROb2RlIiwicXVlcnlTZWxlY3RvciIsInNldFRoZW1lIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJkb2N1bWVudEVsZW1lbnQiLCJyZW1vdmUiLCJtYWluTGF5b3V0IiwiYXBwZW5kQ2hpbGQiLCJsb2FkVmlld3MiLCJtYWluQ29udGVudCIsInRoZUdhbWUiLCJkaXNwbGF5R2FtZU92ZXJNb2RhbENvbnRlbnQiLCJib2R5Iiwib25jbGljayIsImV2ZW50IiwidGFyZ2V0IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZXBsYWNlQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImRpc3BsYXlHYW1lQm9hcmRUaXRsZSIsImRpc3BsYXlHYW1lVGlsZSIsImF0dGFja2luZ1BsYXllciIsImUiLCJkaXNwbGF5R2FtZUJvYXJkIiwidGhlQm9hcmQiLCJoZWFkZXJUZXh0Iiwic3RhcnRBcHAiXSwic291cmNlUm9vdCI6IiJ9