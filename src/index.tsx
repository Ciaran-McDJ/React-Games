import React from "react";
import * as serviceWorker from "./notTouch/serviceWorker";
import { runGame } from "./game";

// const Player = () => <div>PLAYER IS COMMENTED OUT</div>;

runGame();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
