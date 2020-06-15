import React, { createRef } from "react";
import { HookedComponent } from "../../components/hooklib";
import { useThing } from "../../Homemade Functions/get min size";
import { Player } from "./Player";
import { gameConfigContext } from "./config";
import { BallOfDeath } from "./BallOfDeath";
import { useInterval } from "Homemade Functions/utils";
import { stringify } from "querystring";
import { listenerCount } from "cluster";
import { map } from "lodash";

export function ChaseTheSandwich() {
    let gameConfig = React.useContext(gameConfigContext);
    const playerRef = React.useRef<Player>(null);
    let [refsOfBalls, changeRefsOfBalls] = React.useState([] as Array<React.RefObject<BallOfDeath>>)
    let [backgroundColor, changeBackgroundColor] = React.useState("white")

    useInterval(() => update(1/gameConfig.fps), 1000/gameConfig.fps);

    return (
        <div style={{
            display: "flex",
            alignSelf: "center",
            flexGrow: 1
        }}>
            <button onClick={summonBallOfDeath}>Hello</button>
            
            <svg
                style={{
                    alignSelf: "center",
                    width: gameConfig.gameWidth,
                    height: gameConfig.gameHeight,
                    borderWidth: 10,
                    borderColor: "red",
                    backgroundColor: backgroundColor,
                    borderStyle: "solid",
                }}
            >
                <Player ref={playerRef} color={"red"} />


                {refsOfBalls.map((ref)=><BallOfDeath ref={ref} color="black"/>)}
                
            </svg>
        </div>
    );
    function summonBallOfDeath() {
        changeRefsOfBalls([...refsOfBalls,createRef()])
    }


    function deathCollisionCheck(ballRef:React.RefObject<BallOfDeath>) {
        if (Math.sqrt(Math.pow(Math.abs(playerRef.current!.playerX-ballRef.current!.ballX),2) + Math.pow(Math.abs(playerRef.current!.playerY-ballRef.current!.ballY),2)) < Math.abs(gameConfig.ballRadius + gameConfig.playerRadius)) {
            changeBackgroundColor("lightgreen")
            console.log("SOoooooo much math")
        }
    }



    function update(time: number) {
        playerRef.current!.movePlayer(1/gameConfig.fps);
        for (let ref of refsOfBalls) {
            ref.current!.moveBall(time)
            deathCollisionCheck(ref)
        }
    }
}
