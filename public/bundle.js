/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cardGame.js":
/*!*************************!*\
  !*** ./src/cardGame.js ***!
  \*************************/
/*! exports provided: default, gameConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameConstants\", function() { return gameConstants; });\n/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./score */ \"./src/score.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(\n  cardClass,\n  containerClass,\n  activeCardClass,\n  { onIncCallback, onDecCallback, onResetCallback } = options\n) {\n  const { IS_RUNNING, IS_INITIALIZED, IS_STOPPED } = gameConstants;\n  const { noOfCards, cardFlashInterval, maxNoOfCards } = _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n  let currentStatus = IS_STOPPED;\n  let scoreCard;\n  let flashJob;\n\n  const getActiveCardNumber = () =>\n    parseInt(Math.random() * maxNoOfCards) % noOfCards;\n\n  const setGameState = status => {\n    currentStatus = status;\n    return status;\n  };\n\n  const getGameState = () => currentStatus;\n\n  const cardFlash = flashDuration => {\n    const idx = getActiveCardNumber();\n    const selector = `.${cardClass}`;\n    document.querySelectorAll(selector)[idx].classList.add(activeCardClass);\n    setTimeout(() => {\n      document\n        .querySelectorAll(selector)\n        [idx].classList.remove(activeCardClass);\n    }, flashDuration);\n  };\n\n  const bindClick = containerClass => {\n    document\n      .querySelector(getClassSelector(containerClass))\n      .addEventListener(\"click\", onClickHandler);\n  };\n\n  const getClassSelector = str => `.${str}`;\n\n  const getIDSelector = str => `#${str}`;\n\n  const unBindClick = containerClass => {\n    document\n      .querySelector(getClassSelector(containerClass))\n      .removeEventListener(\"click\", onClickHandler);\n  };\n\n  const onClickHandler = ({ target } = {}) => {\n    if (!target) return;\n    const classList = target.classList.value.split(\" \");\n    classList.indexOf(\"active-card\") === -1\n      ? scoreCard.decreaseScore()\n      : scoreCard.increaseScore();\n  };\n\n  return {\n    initGame: function(cb) {\n      console.log(\"initializing game\");\n      if (getGameState() === IS_STOPPED) {\n        scoreCard = Object(_score__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        scoreCard\n          .setOnIncrement(onIncCallback)\n          .setOnDecrement(onDecCallback)\n          .setOnReset(onResetCallback);\n\n        if (cb) cb();\n        setGameState(IS_INITIALIZED);\n      }\n    },\n    startGame: function(cb) {\n      console.log(\"starting game\", containerClass);\n      if (getGameState() === IS_INITIALIZED) {\n        flashJob = setInterval(cardFlash, cardFlashInterval, 1000);\n        bindClick(containerClass);\n        if (cb) cb();\n        setGameState(IS_RUNNING);\n      }\n    },\n    endGame: function(cb) {\n      console.log(\"ending game\");\n      if (getGameState() === IS_RUNNING) {\n        clearInterval(flashJob);\n        unBindClick(containerClass);\n        if (cb) cb();\n        setGameState(IS_INITIALIZED);\n        if (scoreCard) scoreCard.resetScore();\n      }\n    },\n    getScore: function() {\n      if (scoreCard) return scoreCard.getScore();\n    },\n    displayScore: function(scoreClass) {\n      document.querySelectorAll(getClassSelector(scoreClass))[0].innerHTML =\n        (scoreCard && scoreCard.getScore()) || 0;\n    }\n  };\n});\n\nconst gameConstants = {\n  IS_RUNNING: \"is running\",\n  IS_INITIALIZED: \"is initialized\",\n  IS_STOPPED: \"is stopped\"\n};\n\n\n\n\n//# sourceURL=webpack:///./src/cardGame.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  noOfCards: 50,\n  cardFlashInterval: 4000,\n  maxNoOfCards: 10000\n});\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cardGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cardGame */ \"./src/cardGame.js\");\n/* harmony import */ var _textContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./textContent */ \"./src/textContent.js\");\n\n\n\n(function() {\n  function main() {\n    function onIncCallback() {\n      document.querySelectorAll(\".js-score-value\")[0].innerHTML =\n        cardGame && cardGame.getScore();\n    }\n\n    function onGameStartCallback() {\n      document.querySelectorAll(\".js-title\")[0].textContent =\n        _textContent__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GAME_STARTED;\n    }\n\n    function onGameEndCallback() {\n      document.querySelectorAll(\".js-title\")[0].textContent =\n        _textContent__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GAME_START;\n    }\n\n    function bindEvents() {\n      document\n        .querySelectorAll(\".js-game-start-button\")[0]\n        .addEventListener(\"click\", e => {\n          e.preventDefault();\n          if (cardGame) {\n            cardGame.startGame(onGameStartCallback);\n            e.currentTarget.classList.add(\"disabled\");\n            document\n              .querySelectorAll(\".js-game-end-button\")[0]\n              .classList.remove(\"disabled\");\n          }\n        });\n      document\n        .querySelectorAll(\".js-game-end-button\")[0]\n        .addEventListener(\"click\", e => {\n          e.preventDefault();\n          if (cardGame) {\n            cardGame.endGame(onGameEndCallback);\n            e.currentTarget.classList.add(\"disabled\");\n            document\n              .querySelectorAll(\".js-game-start-button\")[0]\n              .classList.remove(\"disabled\");\n          }\n        });\n    }\n\n    const cardGame = Object(_cardGame__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"js-card\", \"js-card-grid\", \"active-card\", {\n      onIncCallback,\n      onDecCallback: onIncCallback,\n      onResetCallback: onIncCallback\n    });\n    cardGame.initGame();\n    bindEvents(cardGame);\n  }\n\n  document.addEventListener(\"DOMContentLoaded\", main);\n})();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function({\n  initialScore = 0,\n  onInc,\n  onDec,\n  onReset,\n  incCounter = 1,\n  decCounter = 1\n} = {}) {\n  let score = initialScore;\n  let onIncrement = onInc;\n  let onDecrement = onDec;\n  let incrementCounter = incCounter;\n  let decrementCounter = decCounter;\n  return {\n    increaseScore() {\n      score += incrementCounter;\n      if (onIncrement) onIncrement();\n    },\n    decreaseScore() {\n      if (score > 0) score -= decrementCounter;\n      if (onDecrement) onDecrement();\n    },\n    resetScore() {\n      console.log(\"reset score called\");\n      score = initialScore;\n      if (onReset) onReset();\n    },\n    setOnIncrement(cb) {\n      if (!cb) return;\n      onIncrement = cb;\n      return this;\n    },\n    setOnDecrement(cb) {\n      if (!cb) return;\n      onDecrement = cb;\n      return this;\n    },\n    setOnReset(cb) {\n      if (!cb) return;\n      onReset = cb;\n      return this;\n    },\n    clearOnIncrement() {\n      onIncrement = null;\n      return this;\n    },\n    clearOnDecrement() {\n      onDecrement = null;\n      return this;\n    },\n    getScore() {\n      return score;\n    },\n    setIncrementCounter(val) {\n      if (val) incrementCounter = val;\n      return this;\n    },\n    setDecrementCounter(val) {\n      if (val) decrementCounter = val;\n      return this;\n    },\n    getIncrementCounter() {\n      return incrementCounter;\n    },\n    getDecrementCounter() {\n      return decrementCounter;\n    }\n  };\n});\n\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ }),

/***/ "./src/textContent.js":
/*!****************************!*\
  !*** ./src/textContent.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  GAME_STARTED: \"Game has started. Click on highlighted tile to score\",\n  GAME_START: \"Start Game\"\n});\n\n\n//# sourceURL=webpack:///./src/textContent.js?");

/***/ })

/******/ });