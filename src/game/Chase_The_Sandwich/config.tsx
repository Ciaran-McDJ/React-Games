import React from "react";

export const defaultGameConfig = {
    /** Pixels */
    gameWidth: 300,
    /** Pixels */
    gameHeight: 300,

    playerSpeed: 1,
    // percent player moves per second
    vPlayer: 50,
    // percent ball of death moves per second
    vBall: 50,
    // frames per seccond
    fps: 30,
};
export const gameConfigContext = React.createContext(defaultGameConfig);
