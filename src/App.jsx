/* eslint "indent": off */

import React from "react";
import "./App.css";

let nextId = 4;

function Stats(props) {
  let totalPlayers = props.players.length;
  let totalPoints = props.players.reduce((acc, next) => (acc += next.score), 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0
    };
    this.onStop = this.onStop.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.onTick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStop = () => {
    this.setState({ running: false });
  };

  onTick = () => {
    if (this.state.running) {
      let now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      });
    }
  };

  onStart = () => {
    this.setState({
      running: true,
      previousTime: Date.now()
    });
  };

  onReset = () => {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    });
  };

  render() {
    let seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {this.state.running ? (
          <button onClick={this.onStop}>Stop</button>
        ) : (
          <button onClick={this.onStart}>Start</button>
        )}
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

let AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      name: ""
    };
  },

  onNameChange: function(e) {
    this.setState({ name: e.target.value });
  },

  onSubmit: function(e) {
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({ name: "" });
  },

  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};

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

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};

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

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

ScoreBoard.propTypes = {
  title: React.PropTypes.string,
  initialPlayers: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    })
  ).isRequired
};
class ScoreBoard extends React.Component {
  state = {
    name: "",
    score: 0,
    id: 1
  };

  onScoreChange(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  }

  onPlayerAdd(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    });
    this.setState(this.state);
    nextId++;
  }

  onRemovePlayer(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  }

  render() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div className="players">
          {this.state.players.map((player, index) => {
            return (
              <Player
                onScoreChange={delta => this.onScoreChange(index, delta)}
                name={player.name}
                score={player.score}
                onRemove={() => this.onRemovePlayer(index)}
                key={player.id}
              />
            );
          })}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
}

export default Application;
