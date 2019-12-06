import React from "react";

import { Asteroid, AsteroidProps } from "./asteroid";
import { Player } from "./player";
import { Timer } from "./timer";
import { any, number } from "prop-types";
interface GameProps {
    // game has no inputs
}
interface GameState {
    timerTime: number;
    playerx: number;
    playery: number;
    spawnAsteroid: number;
    asteroidPositions: AsteroidProps[];
    maxHeightOfGame: number;
    //temporaryAsteroidPositions: [];
}

export class AsteroidDash extends React.Component<GameProps, GameState> {
    state: GameState = {
        timerTime: 0,
        playerx: 20,
        playery: 20,
        spawnAsteroid: 0,
        asteroidPositions: [],
        maxHeightOfGame: 90
        //temporaryAsteroidPositions: []
    };
    render() {
        return (
            <div
                style={{
                    width: "100vw",
                    height: this.state.maxHeightOfGame + "vh",
                    overflow: "hidden"
                }}
            >
                <Timer
                    x={0}
                    y={2}
                    time={this.state.timerTime}
                    backgroundColor={"blue"}
                />
                <Player x={this.state.playerx} y={this.state.playery} />
                {this.state.asteroidPositions.map(coordinates => (
                    <Asteroid {...coordinates}></Asteroid>
                ))}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keyup", this.keyPress);
        window.setInterval(this.changeTimer.bind(this), 1000);
        window.setInterval(this.makeAsteroid.bind(this), 1000);
        window.setInterval(this.updateAsteroids.bind(this), 500);
    }
    componentWillUnmount() {
        document.removeEventListener("keyup", this.keyPress);
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
            y: Math.random() * this.state.maxHeightOfGame,
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
        console.log(this.state.asteroidPositions.length);
    }
}
