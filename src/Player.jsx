import React from "react";

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>
          ❌
        </a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}
export default Player;
