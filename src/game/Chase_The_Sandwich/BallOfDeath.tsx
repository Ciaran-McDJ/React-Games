import React from "react";
import { HookedComponent, useEventListener } from "../../components/hooklib";
import { gameConfigContext, defaultGameConfig } from "./config";
import { useInterval } from "Homemade Functions/utils";

interface ballProps {
    color: string
}

class _BallOfDeath extends HookedComponent<ballProps> {
    @HookedComponent.RenderAffecting
    public ballX = 10;
    @HookedComponent.RenderAffecting
    public ballY = 10;

    public gameConfig = defaultGameConfig;
    public angle = Math.random()*360;
    public ballXSpeed = (Math.sin(this.angle));
    public ballYSpeed = (Math.cos(this.angle));



    

    
    private moveBall(time: number) {
        // the positions that the ball will be set to
        let newX = 0
        let newY = 0
        // set newX and newY
            newX = (this.ballX+this.gameConfig.vBall*this.ballXSpeed*time)
            newY = (this.ballY+this.gameConfig.vBall*this.ballYSpeed*time)
        // changing angle if passing edge to turn around
        if ((newX>100)||(newX<0)) {
            this.ballXSpeed = -this.ballXSpeed
            if (newX<0) {
                //reflect in the x=0 line
                newX = -newX
            } else {
                // reflect in the x=100 line
                newX = 100-(newX-100)
            }
        }
        if ((newY>100)||(newY<0)) {
            this.ballYSpeed = -this.ballYSpeed
            if (newY<0) {
                //reflect in the y=0 line
                newY = -newY
            } else {
                // reflect in the y=100 line
                newY = 100-(newY-100)
            }
        }
        this.ballX = newX
        this.ballY = newY
        console.log(7)
    }
    public useRender(props: ballProps) {
        this.gameConfig = React.useContext(gameConfigContext);
        useInterval(() => this.moveBall(1/30), 1000/30);
        return (
            <circle
                cx={this.ballX + "%"}
                cy={this.ballY + "%"}
                r={5 + "%"}
                stroke="black"
                stroke-width="1"
                fill={props.color}
            />
        );
    }
}
export const BallOfDeath = HookedComponent.finalize(_BallOfDeath);
export type BallOfDeath = _BallOfDeath;