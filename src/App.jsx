/* eslint "indent": off */

import React from "react";
import PropTypes from "prop-types";
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

    // componentDidUpdate() {
    //     this.setState(state => ({
    //         players: state.players.
    //     }));
    // }

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
        this.setState({
            players: newPlayers
        });
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
