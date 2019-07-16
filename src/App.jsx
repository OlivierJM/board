/* eslint "indent": off */

import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayer";

import "./App.css";

let nextId = Math.floor(Math.random() * 1000);
const _players = localStorage.getItem("players");

class ScoreBoard extends React.Component {
    state = {
        players: _players === null ? [] : JSON.parse(_players)
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
        this.setState(this.state, () => {
            localStorage.setItem("players", JSON.stringify(this.state.players));
        });
        nextId++;
    };

    onRemovePlayer = index => {
        this.state.players.splice(index, 1);
        this.setState(this.state, () => {
            localStorage.setItem("players", JSON.stringify(this.state.players));
        });
    };

    render() {
        const { players } = this.state;
        console.log(this.state.players);
        return (
            <div className="scoreboard">
                <Header title={"Contact OlivierJM for any questions"} players={this.state.players} />
                {
                /*
                    <ReactCSSTransitionGroup
                    transitionName="list-item"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={true}
                    transitionEnterTimeout={500}
                    transitionLeave={true}
                    transitionLeaveTimeout={300}
                >
                   
                    {players.length
                        ? players.map((player, index) => {
                              return (
                                  <Player
                                      onScoreChange={delta =>
                                          this.onScoreChange(player.id, delta)
                                      }
                                      name={player.name}
                                      score={player.score}
                                      onRemove={() =>
                                          this.onRemovePlayer(index)
                                      }
                                      key={player.id}
                                  />
                              );
                          })
                        : null}
                  
                </ReactCSSTransitionGroup>
                <AddPlayerForm onAdd={this.onPlayerAdd} />
                */
                }
                
            </div>
        );
    }
}

ScoreBoard.propTypes = {
    title: PropTypes.string
};
export default ScoreBoard;
