import React from "react";

export const defaultGameConfig = {
    /** Pixels */
    gameWidth: 300,
    /** Pixels */
    gameHeight: 300,
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

};
export const gameConfigContext = React.createContext(defaultGameConfig);
