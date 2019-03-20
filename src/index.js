import game from "./cardGame";
import stringConstants from "./textContent";

(function() {
  function main() {
    function onIncCallback() {
      document.querySelectorAll(".js-score-value")[0].innerHTML =
        cardGame && cardGame.getScore();
    }

    function onGameStartCallback() {
      document.querySelectorAll(".js-title")[0].textContent =
        stringConstants.GAME_STARTED;
    }

    function onGameEndCallback() {
      document.querySelectorAll(".js-title")[0].textContent =
        stringConstants.GAME_START;
    }

    function bindEvents() {
      document
        .querySelectorAll(".js-game-start-button")[0]
        .addEventListener("click", e => {
          e.preventDefault();
          if (cardGame) {
            cardGame.startGame(onGameStartCallback);
            e.currentTarget.classList.add("disabled");
            document
              .querySelectorAll(".js-game-end-button")[0]
              .classList.remove("disabled");
          }
        });
      document
        .querySelectorAll(".js-game-end-button")[0]
        .addEventListener("click", e => {
          e.preventDefault();
          if (cardGame) {
            cardGame.endGame(onGameEndCallback);
            e.currentTarget.classList.add("disabled");
            document
              .querySelectorAll(".js-game-start-button")[0]
              .classList.remove("disabled");
          }
        });
    }

    const cardGame = game("js-card", "js-card-grid", "active-card", {
      onIncCallback,
      onDecCallback: onIncCallback,
      onResetCallback: onIncCallback
    });
    cardGame.initGame();
    bindEvents(cardGame);
  }

  document.addEventListener("DOMContentLoaded", main);
})();
