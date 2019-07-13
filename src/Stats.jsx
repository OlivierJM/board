import React from "react";
import PropTypes from "prop-types";

function Stats(props) {
    let totalPlayers = props.players.length;
    let totalPoints = props.players.reduce(
        (acc, next) => (acc += next.score),
        0
    );

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

Stats.propTypes = {
    players: PropTypes.array.isRequired
};

export default Stats;
