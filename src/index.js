/* eslint "indent": off */

import React from "react";
import ReactDOM from "react-dom";
import Application from "./App";

const PLAYERS = [
    {
      name: "Austin Green",
      score: 22,
      id: 1 
    },
    {
      name: "Henrik Lundqvist",
      score: 30,
      id: 2
    },
    {
      name: "Henrik Zetterberg",
      score: 40,
      id: 3
    },
];

ReactDOM.render(
  <Application initialPlayers={PLAYERS} />,
  document.getElementById("root")
);
