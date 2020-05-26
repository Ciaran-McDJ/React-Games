import React from "react";
import { HookedComponent } from "../../components/hooklib";
import { useThing } from "../../Homemade Functions/get min size";
import { Player } from "./Player";
import { gameConfigContext } from "./config";
import { BallOfDeath } from "./BallOfDeath";
import { useInterval } from "Homemade Functions/utils";

export function ChaseTheSandwich() {
    let gameConfig = React.useContext(gameConfigContext);
    const playerRef = React.useRef<Player>(null);
    return (
        <div style={{
            display: "flex",
            alignSelf: "center",
            flexGrow: 1
        }}>
            <svg
                style={{
                    alignSelf: "center",
                    width: gameConfig.gameWidth,
                    height: gameConfig.gameHeight,
                    borderWidth: 10,
                    borderColor: "red",
                    borderStyle: "solid",
                }}
            >
                <Player ref={playerRef} color={"red"} />
                <BallOfDeath color="black"/>
            </svg>
        </div>
    );
    // function update(time: number) {
    //     playerRef.current!.movePlayer(1);
    // }
}
