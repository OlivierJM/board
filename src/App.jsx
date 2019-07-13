/* eslint "indent": off */

import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";

import "./App.css";

let nextId = Math.floor(Math.random() * 1000);
const players = localStorage.getItem("players");

class ScoreBoard extends React.Component {
    state = {
        players: players === null ? [] : JSON.parse(players)
    };

    onScoreChange(id, delta) {
        const { players } = this.state;
        const newPlayers = players
            .map(player => {
                if (player.id === id) {
                    if (delta === "inc") {
                        player.score += 10;
                    } else {
                        player.score -= 10;
                    }
                }
                return player;
            })
            .sort((a, b) => b.score - a.score);
        this.setState(
            {
                players: newPlayers
            },
            () => {
                localStorage.setItem("players", JSON.stringify(newPlayers));
            }
        );
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

    onRemovePlayer = index => {
        this.state.players.splice(index, 1);
        this.setState(this.state, () => {
            localStorage.setItem("players", JSON.stringify(this.state.players));
        });
    };

    render() {
        console.log(players);
        return (
            <div className="scoreboard">
                <Header title={"Bible Quiz"} players={this.state.players} />
                <div className="players">
                    {this.state.players.map((player, index) => {
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
    title: PropTypes.string
};
export default ScoreBoard;
