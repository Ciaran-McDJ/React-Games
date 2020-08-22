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
    let [refsOfBalls, changeRefsOfBalls] = React.useState(
        [] as Array<React.RefObject<BallOfDeath>>
    );
    let [score, changeScore] = React.useState(0);
    let [gameOver, changeGameOver] = React.useState(false);
    let [highScore, changeHighScore] = React.useState(0)
    //state variables for changing config
    let [newPlayerRadius, changeNewPlayerRadius] = React.useState(String(gameConfig.playerRadius))

    useInterval(() => update(1 / gameConfig.fps), 1000 / gameConfig.fps);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                flexGrow: 1,
            }}
        >
            highscore: {highScore}
            <br/>
            score: {score}
            <br/>
            {gameOver == false
                ? "You didn't die yet, good job :)"
                : "YOU DIED!!!!! :("}
            <br/>
            <br/>
            Configurations below:
            <input value={newPlayerRadius} onChange={(newInput)=>{changeNewPlayerRadius(newInput.target.value)}}></input>
            <br/>
            <button onClick={restart}>restart</button>
            <svg
                style={{
                    alignSelf: "center",
                    width: gameConfig.gameSize,
                    height: gameConfig.gameSize,
                    borderWidth: 10,
                    borderColor: "red",
                    backgroundColor: gameOver==true?"lightgreen":"white",
                    borderStyle: "solid",
                }}
            >
                <Player ref={playerRef} color={"red"} />
                <Sandwich ref={sandwichRef} color="blue" />

                {refsOfBalls.map((ref) => (
                    <BallOfDeath ref={ref} color="black" />
                ))}
            </svg>
        </div>
    );
    function summonBallOfDeath() {
        changeRefsOfBalls([...refsOfBalls, createRef()]);
    }

    function deathCollisionCheck(ballRef: React.RefObject<BallOfDeath>) {
        if (
            ballCollisionCheck(
                gameConfig.ballRadius,
                gameConfig.playerRadius,
                ballRef.current!.ballX,
                playerRef.current!.playerX,
                ballRef.current!.ballY,
                playerRef.current!.playerY
            )
        ) {
            changeGameOver(true);
        }
    }

    function restart() {
        changeGameOver(false)
        changeRefsOfBalls([])
        changeScore(0)

    }

    function update(time: number) {
        playerRef.current!.movePlayer(1 / gameConfig.fps);
        for (let ref of refsOfBalls) {
            ref.current!.moveBall(time);
            deathCollisionCheck(ref);
        }
        if (
            ballCollisionCheck(
                gameConfig.sandwichRadius,
                gameConfig.playerRadius,
                sandwichRef.current!.sandwichX,
                playerRef.current!.playerX,
                sandwichRef.current!.sandwichY,
                playerRef.current!.playerY
            )
        ) {
            summonBallOfDeath();
            sandwichRef.current!.repositionSandwich(playerRef.current!.playerX, playerRef.current!.playerY);
            if (gameOver == false) {
                changeScore(score + 1);
                if (score+1>highScore) {
                    changeHighScore(score+1)
                }
            }
        }
    }
}
