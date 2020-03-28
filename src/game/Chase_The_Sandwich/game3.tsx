import React from "react";
import { HookedComponent } from "../../components/hooklib";
import { Player } from "./Player";
import {gameConfig} from "./config"
export function ChaseTheSandwich() {
    const actualSize = {width: 200, height: 300}
    return (
        <gameConfig.Provider value={actualSize}>
        <svg
            style={{
                flexGrow: 1,
                borderWidth: "1.5vw",
                borderColor: "red",
                borderStyle: "solid"
            }}
        >
            <Player color={"red"}/>
        </svg>
        </gameConfig.Provider>
        
    );
}
