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
import { Sandwich } from "./Sandwich";
import { ballCollisionCheck } from "Homemade Functions/ballCollisionCheck";

export function ChaseTheSandwich() {
    let gameConfig = React.useContext(gameConfigContext);
    const playerRef = React.useRef<Player>(null);
    const sandwichRef = React.useRef<Sandwich>(null);
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
                <Sandwich ref={sandwichRef} color="blue"/>

                {refsOfBalls.map((ref)=><BallOfDeath ref={ref} color="black"/>)}
                
            </svg>
        </div>
    );
    function summonBallOfDeath() {
        changeRefsOfBalls([...refsOfBalls,createRef()])
    }


    function deathCollisionCheck(ballRef:React.RefObject<BallOfDeath>) {
        if (ballCollisionCheck(gameConfig.ballRadius, gameConfig.playerRadius, ballRef.current!.ballX, playerRef.current!.playerX, ballRef.current!.ballY, playerRef.current!.playerY)) {
            //Math.sqrt(Math.pow(Math.abs(playerRef.current!.playerX-ballRef.current!.ballX),2) + Math.pow(Math.abs(playerRef.current!.playerY-ballRef.current!.ballY),2)) < Math.abs(gameConfig.ballRadius + gameConfig.playerRadius)) {
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
        if (ballCollisionCheck(gameConfig.sandwichRadius, gameConfig.playerRadius, sandwichRef.current!.sandwichX, playerRef.current!.playerX, sandwichRef.current!.sandwichY, playerRef.current!.playerY)) {
            summonBallOfDeath()
            sandwichRef.current!.repositionSandwich()
        }
    }
}
