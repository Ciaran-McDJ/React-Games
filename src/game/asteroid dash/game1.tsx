import React from "react";

import { Asteroid, AsteroidProps } from "./asteroid";
import { Player } from "./player";
import { Timer } from "./timer";
import { any, number } from "prop-types";
import { Link } from "react-router-dom";
interface GameProps {
    // game has no inputs
}
interface GameState {
    timerTime: number;
    playerx: number;
    playery: number;
    playerRadius: number;
    spawnAsteroid: number;
    asteroidPositions: AsteroidProps[];
    maxHeightOfGame: number;
}

export class AsteroidDash extends React.Component<GameProps, GameState> {
    state: GameState = {
        timerTime: 0,
        playerx: 20,
        playery: 20,
        playerRadius: 2 /** in vmax */,
        spawnAsteroid: 0,
        asteroidPositions: [],
        maxHeightOfGame: 90
    };
    intervalIDs: number[] = [];
    render() {
        return (
            <div
                style={{
                    width: "100vw",
                    height: this.state.maxHeightOfGame + "vh",
                    maxWidth: "100vw",
                    maxHeight: this.state.maxHeightOfGame + "vh",
                    overflow: "hidden"
                }}
            >
                <Link to="/">opening screen</Link>
                <div></div>
                <Timer
                    x={0}
                    y={2}
                    time={this.state.timerTime}
                    backgroundColor={"blue"}
                />
                <Player
                    x={this.state.playerx}
                    y={this.state.playery}
                    radius={this.state.playerRadius}
                />
                {this.state.asteroidPositions.map(coordinates => (
                    <Asteroid {...coordinates}></Asteroid>
                ))}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keyup", this.keyPress);
        this.intervalIDs = [
            window.setInterval(this.changeTimer.bind(this), 1000),
            window.setInterval(this.makeAsteroid.bind(this), 1000),
            window.setInterval(this.updateAsteroids.bind(this), 500)
        ];
    }
    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyPress);
        for (const intervalID of this.intervalIDs) {
            window.clearInterval(intervalID);
        }

        // TODO: remove event listeners, not simple with bind inline above.
    }
    keyPress = (event: KeyboardEvent) => {
        // console.log("KEY PRESS", event.code);
        if (event.code === "ArrowUp") {
            if (this.state.playery > 100 - this.state.maxHeightOfGame) {
                this.setState(state => ({ playery: state.playery - 2 }));
            }
        } else if (event.code === "ArrowDown") {
            if (this.state.playery < 100) {
                this.setState(state => ({ playery: state.playery + 2 }));
            }
        } else if (event.code === "ArrowLeft") {
            if (this.state.playerx > 0) {
                this.setState(state => ({ playerx: state.playerx - 2 }));
            }
        } else if (event.code === "ArrowRight") {
            if (this.state.playerx < 100) {
                this.setState(state => ({ playerx: state.playerx + 2 }));
            }
        }
    };
    changeTimer() {
        this.setState({
            timerTime: this.state.timerTime + 1
        });
    }
    makeAsteroid() {
        let newAsteroid: AsteroidProps = {
            x: 100,
            y:
                Math.random() * this.state.maxHeightOfGame +
                (100 - this.state.maxHeightOfGame),
            color: `rgb(${Math.random() * 255}, ${Math.random() *
                255}, ${Math.random() * 255}) `
        };
        this.setState({
            asteroidPositions: [...this.state.asteroidPositions, newAsteroid]
        });
    }

    //moves asteroids and checks if they collide with player
    updateAsteroids() {
        this.state.asteroidPositions.map(coordinates => (coordinates.x -= 1));

        let x = this.state.asteroidPositions.filter(
            coordinates => coordinates.x > 0
        );
        this.setState({ asteroidPositions: x });
        this.state.asteroidPositions.map(coordinates =>
            this.collisionCheck(() => this.gameOver(), coordinates)
        );
        // this.state.asteroidPositions.some
    }
    collisionCheck(run: Function, coordinate: AsteroidProps) {
        let maxCenterDistances =
            this.state.playerRadius + 1; /**radius of asteroid */
        let dx =
            this.state.playerx + this.state.playerRadius - (coordinate.x + 1);
        let dy =
            this.state.playery + this.state.playerRadius - (coordinate.y + 1);
        if (Math.sqrt(dx * dx + dy * dy) < maxCenterDistances) {
            run();
        }
    }
    gameOver() {
        console.log("adsfhbhf");
    }
}
