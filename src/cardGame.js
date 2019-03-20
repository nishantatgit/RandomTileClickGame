import score from "./score";
import constants from "./constants";
export default function(
  cardClass,
  containerClass,
  activeCardClass,
  { onIncCallback, onDecCallback, onResetCallback } = options
) {
  const { IS_RUNNING, IS_INITIALIZED, IS_STOPPED } = gameConstants;
  const { noOfCards, cardFlashInterval, maxNoOfCards } = constants;

  let currentStatus = IS_STOPPED;
  let scoreCard;
  let flashJob;

  const getActiveCardNumber = () =>
    parseInt(Math.random() * maxNoOfCards) % noOfCards;

  const setGameState = status => {
    currentStatus = status;
    return status;
  };

  const getGameState = () => currentStatus;

  const cardFlash = flashDuration => {
    const idx = getActiveCardNumber();
    const selector = `.${cardClass}`;
    document.querySelectorAll(selector)[idx].classList.add(activeCardClass);
    setTimeout(() => {
      document
        .querySelectorAll(selector)
        [idx].classList.remove(activeCardClass);
    }, flashDuration);
  };

  const bindClick = containerClass => {
    document
      .querySelector(getClassSelector(containerClass))
      .addEventListener("click", onClickHandler);
  };

  const getClassSelector = str => `.${str}`;

  const getIDSelector = str => `#${str}`;

  const unBindClick = containerClass => {
    document
      .querySelector(getClassSelector(containerClass))
      .removeEventListener("click", onClickHandler);
  };

  const onClickHandler = ({ target } = {}) => {
    if (!target) return;
    const classList = target.classList.value.split(" ");
    classList.indexOf("active-card") === -1
      ? scoreCard.decreaseScore()
      : scoreCard.increaseScore();
  };

  return {
    initGame: function(cb) {
      console.log("initializing game");
      if (getGameState() === IS_STOPPED) {
        scoreCard = score();
        scoreCard
          .setOnIncrement(onIncCallback)
          .setOnDecrement(onDecCallback)
          .setOnReset(onResetCallback);

        if (cb) cb();
        setGameState(IS_INITIALIZED);
      }
    },
    startGame: function(cb) {
      if (getGameState() === IS_INITIALIZED) {
        flashJob = setInterval(cardFlash, cardFlashInterval, 1000);
        bindClick(containerClass);
        if (cb) cb();
        setGameState(IS_RUNNING);
      }
    },
    endGame: function(cb) {
      if (getGameState() === IS_RUNNING) {
        clearInterval(flashJob);
        unBindClick(containerClass);
        if (cb) cb();
        setGameState(IS_INITIALIZED);
        if (scoreCard) scoreCard.resetScore();
      }
    },
    getScore: function() {
      if (scoreCard) return scoreCard.getScore();
    },
    displayScore: function(scoreClass) {
      document.querySelectorAll(getClassSelector(scoreClass))[0].innerHTML =
        (scoreCard && scoreCard.getScore()) || 0;
    }
  };
}

const gameConstants = {
  IS_RUNNING: "is running",
  IS_INITIALIZED: "is initialized",
  IS_STOPPED: "is stopped"
};

export { gameConstants };
