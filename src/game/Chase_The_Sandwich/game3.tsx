import React, { createRef, useReducer } from "react";
import ReactDom from "react-dom";
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
    let [highScore, changeHighScore] = React.useState(0);

    // Below is a bunch of config states
    type ConfigAsStrings = Record<keyof typeof gameConfig, number | string>;
    // The up to date config that represents the inputs
    let [newConfig, changeNewConfig] = React.useReducer(
        (prevState: ConfigAsStrings, arg: Partial<ConfigAsStrings>) => ({
            ...prevState,
            ...arg,
        }),
        gameConfig
    );
    // The config that game is providing to children and using itself
    let [actualConfig, changeActualConfig] = React.useState(gameConfig);
    
    useInterval(() => ReactDom.unstable_batchedUpdates(update, 1/actualConfig.fps), 1000 / actualConfig.fps);
    // useInterval(() => update(1 / actualConfig.fps), 1000 / actualConfig.fps);

    return (
        <gameConfigContext.Provider value={actualConfig}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    flexGrow: 1,
                }}
            >
                highscore: {highScore}
                <br />
                score: {score}
                <br />
                {gameOver == false
                    ? "You didn't die yet, good job :)"
                    : "YOU DIED!!!!! :("}
                <br />
                <br />
                Configurations below:
                <br />
                {Object.keys(actualConfig).map((aspect) => (
                    <>
                        
                        <label>{aspect}</label>
                        <input
                            value={newConfig[aspect]}
                            onChange={(newInput) =>
                                changeNewConfig({
                                    [aspect]: newInput.target.value,
                                })
                            }
                        />
                    </>
                ))}
                <button onClick={restart}>restart</button>
                <svg
                    style={{
                        alignSelf: "center",
                        width: actualConfig.gameSize,
                        height: actualConfig.gameSize,
                        borderWidth: 10,
                        borderColor: "red",
                        backgroundColor:
                            gameOver == true ? "lightgreen" : "white",
                        borderStyle: "solid",
                    }}
                >
                    <Player ref={playerRef} color={actualConfig.p1colour} />
                    <Sandwich ref={sandwichRef} color="blue" />

                    {refsOfBalls.map((ref) => (
                        <BallOfDeath ref={ref} color="black" />
                    ))}
                </svg>
            </div>
        </gameConfigContext.Provider>
    );
    function summonBallOfDeath() {
        changeRefsOfBalls([...refsOfBalls, createRef()]);
    }

    function deathCollisionCheck(ballRef: React.RefObject<BallOfDeath>) {
        if (
            ballCollisionCheck(
                actualConfig.ballRadius,
                actualConfig.playerRadius,
                ballRef.current!.ballX,
                playerRef.current!.playerX,
                ballRef.current!.ballY,
                playerRef.current!.playerY
            )
        ) {
            changeGameOver(true);
        }
        // for(let idx = 0; idx < 8; idx+=1){

        // }
    }

    function restart() {
        changeGameOver(false);
        changeRefsOfBalls([]);
        changeScore(0);
        //Config that I will change all the properties from strings to numbers
        let tempConfig = {} as typeof gameConfig;
        let configProperties = Object.keys(newConfig);
        for (let aspect of configProperties) {
            //convert from strings to numbers then put strings back as strings
            tempConfig[aspect] = Number(newConfig[aspect]);
            const TADHG = typeof "";
            //TODO figure out how to make it generally all strings instead of that one specific one(or redo it and make it better)
            if (aspect=="p1colour") {
                tempConfig[aspect] = String(newConfig[aspect]);
            }
        }
        changeActualConfig(tempConfig);
    }

    function update(time: number) {
        playerRef.current!.movePlayer(time);
        for (let ref of refsOfBalls) {
            ref.current!.moveBall(time);
            deathCollisionCheck(ref);
        }
        if (
            ballCollisionCheck(
                actualConfig.sandwichRadius,
                actualConfig.playerRadius,
                sandwichRef.current!.sandwichX,
                playerRef.current!.playerX,
                sandwichRef.current!.sandwichY,
                playerRef.current!.playerY
            )
        ) {
            summonBallOfDeath();
            sandwichRef.current!.repositionSandwich(
                playerRef.current!.playerX,
                playerRef.current!.playerY
            );
            if (gameOver == false) {
                changeScore(score + 1);
                if (score + 1 > highScore) {
                    changeHighScore(score + 1);
                }
            }
        }
    }
}
