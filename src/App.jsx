/* eslint "indent": off */

import React from "react";
import PropTypes from "prop-types";
import R from "ramda";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";

import "./App.css";

let nextId = 4;

class ScoreBoard extends React.Component {
    state = {
        // name: "",
        // score: 0,
        // id: 1,
        players: []
    };

    onScoreChange(id, delta) {
        this.setState(state => ({
            players: state.players.map(player => {
                if (player.id === id) {
                    if (delta === 1) {
                        player.score += 10;
                        R.add(player.score, 10);
                        // console.log(delta);
                    }
                    player.score -= 10;
                }
                return player;
            })
        }));
        // console.log(delta);

        // this.setState(this.state);
    }

    onPlayerAdd = name => {
        this.state.players.push({
            name: name,
            score: 0,
            id: nextId
        });
        this.setState(this.state);
        nextId++;
    };

    onRemovePlayer(index) {
        this.state.players.splice(index, 1);
        this.setState(this.state);
    }

    render() {
        return (
            <div className="scoreboard">
                <Header title={"Scoreboard"} players={this.state.players} />
                <div className="players">
                    {this.state.players.map((player, index) => {
                        console.log(player);
                        return (
                            <Player
                                onScoreChange={delta =>
                                    this.onScoreChange(player.id, delta)
                                }
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

ScoreBoard.propTypes = {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired
        })
    ).isRequired
};
export default ScoreBoard;
