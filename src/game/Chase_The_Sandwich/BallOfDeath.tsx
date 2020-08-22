import React from "react";
import { HookedComponent, useEventListener } from "../../components/hooklib";
import { gameConfigContext, defaultGameConfig } from "./config";
import { useInterval } from "Homemade Functions/utils";

interface ballProps {
    color: string;
}

class _BallOfDeath extends HookedComponent<ballProps> {
    @HookedComponent.RenderAffecting
    public ballX = 0;
    @HookedComponent.RenderAffecting
    public ballY = 0;

    public gameConfig = defaultGameConfig;
    public angle = Math.random() * 360;
    public ballXSpeed = Math.sin(this.angle);
    public ballYSpeed = Math.cos(this.angle);

    public moveBall(time: number) {
        // the positions that the ball will be set to
        let newX = 0;
        let newY = 0;
        // set newX and newY
        newX = this.ballX + this.gameConfig.vBall * this.ballXSpeed * time;
        newY = this.ballY + this.gameConfig.vBall * this.ballYSpeed * time;
        // changing angle if passing edge to turn around
        if (newX > 100 || newX < 0) {
            this.ballXSpeed = -this.ballXSpeed;
            if (newX < 0) {
                //reflect in the x=0 line
                newX = -newX;
            } else {
                // reflect in the x=100 line
                newX = 100 - (newX - 100);
            }
        }
        if (newY > 100 || newY < 0) {
            this.ballYSpeed = -this.ballYSpeed;
            if (newY < 0) {
                //reflect in the y=0 line
                newY = -newY;
            } else {
                // reflect in the y=100 line
                newY = 100 - (newY - 100);
            }
        }
        this.ballX = newX;
        this.ballY = newY;
    }
    public useRender(props: ballProps) {
        this.gameConfig = React.useContext(gameConfigContext);
        return (
            <React.Fragment>
                <circle
                    cx={this.ballX + "%"}
                    cy={this.ballY + "%"}
                    r={this.gameConfig.ballRadius + "%"}
                    stroke="black"
                    stroke-width="1"
                    fill={props.color}
                />
                <image
                    href="Saw_blade.gif"
                    x={this.ballX - this.gameConfig.ballRadius + "%"}
                    y={this.ballY - this.gameConfig.ballRadius + "%"}
                    width={this.gameConfig.ballRadius * 2 + "%"}
                    height={this.gameConfig.ballRadius * 2 + "%"}
                />
            </React.Fragment>
        );
    }
}
export const BallOfDeath = HookedComponent.finalize(_BallOfDeath);
export type BallOfDeath = _BallOfDeath;
