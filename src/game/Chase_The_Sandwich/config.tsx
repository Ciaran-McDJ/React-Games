import React from "react";

export const defaultGameConfig = {
    /** Pixels of width and height */
    gameSize: 300,
    // percent player moves per second
    vPlayer: 50,
    // radius in %
    playerRadius: 3,
    // percent ball of death moves per second
    vBall: 70,
    // radius in %
    ballRadius: 6,
    // radius in %
    sandwichRadius: 3,
    // frames per seccond
    fps: 30,
    // colour of player 1
    p1colour: "red"

};
export const gameConfigContext = React.createContext(defaultGameConfig);
