export default function({
  initialScore = 0,
  onInc,
  onDec,
  onReset,
  incCounter = 1,
  decCounter = 1
} = {}) {
  let score = initialScore;
  let onIncrement = onInc;
  let onDecrement = onDec;
  let incrementCounter = incCounter;
  let decrementCounter = decCounter;
  return {
    increaseScore() {
      score += incrementCounter;
      if (onIncrement) onIncrement();
    },
    decreaseScore() {
      if (score > 0) score -= decrementCounter;
      if (onDecrement) onDecrement();
    },
    resetScore() {
      score = initialScore;
      if (onReset) onReset();
    },
    setOnIncrement(cb) {
      if (!cb) return;
      onIncrement = cb;
      return this;
    },
    setOnDecrement(cb) {
      if (!cb) return;
      onDecrement = cb;
      return this;
    },
    setOnReset(cb) {
      if (!cb) return;
      onReset = cb;
      return this;
    },
    clearOnIncrement() {
      onIncrement = null;
      return this;
    },
    clearOnDecrement() {
      onDecrement = null;
      return this;
    },
    getScore() {
      return score;
    },
    setIncrementCounter(val) {
      if (val) incrementCounter = val;
      return this;
    },
    setDecrementCounter(val) {
      if (val) decrementCounter = val;
      return this;
    },
    getIncrementCounter() {
      return incrementCounter;
    },
    getDecrementCounter() {
      return decrementCounter;
    }
  };
}
