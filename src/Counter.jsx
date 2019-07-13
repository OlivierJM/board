import React from "react";

function Counter(props) {
  return (
    <div className="counter">
      <button
        className="counter-action decrement"
        onClick={() => props.onChange(-1)}
      >
        {" "}
        -{" "}
      </button>
      <div className="counter-score">{props.score}</div>
      <button
        className="counter-action increment"
        onClick={() => props.onChange(1)}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
}
export default Counter;
