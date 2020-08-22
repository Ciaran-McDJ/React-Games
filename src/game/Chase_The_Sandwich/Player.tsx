import React from "react";
import { HookedComponent, useEventListener } from "../../components/hooklib";
import { gameConfigContext, defaultGameConfig } from "./config";
import { useInterval } from "Homemade Functions/utils";
// import { Ball } from "Homemade Functions/ballCollisionCheck";

interface playerProps {
    color: string;
}

class _Player extends HookedComponent<playerProps> {
    //implements Ball {

    // get x(){
    //     return this.playerX;
    // }
    // get y(){
    //     return this.playerY;
    // }
    // get r(){
    //     return this.gameConfig.playerRadius;
    // }

    @HookedComponent.RenderAffecting
    public playerX = 50;
    @HookedComponent.RenderAffecting
    public playerY = 50;
    public mouseX = 0;
    public mouseY = 0;

    private gameConfig = defaultGameConfig;

    private setMousePosition(event) {
        //gives mouse position in percent of box
        this.mouseX = (event.offsetX / this.gameConfig.gameSize) * 100;
        this.mouseY = (event.offsetY / this.gameConfig.gameSize) * 100;
    }

    public movePlayer(time: number) {
        // time in seconds
        // distances between player and mouse
        let distX = this.mouseX - this.playerX;
        let distY = this.mouseY - this.playerY;
        let playerMouseDist = Math.sqrt(distX * distX + distY * distY);
        if (this.gameConfig.vPlayer * time > playerMouseDist) {
            this.playerX = this.mouseX;
            this.playerY = this.mouseY;
            return;
        }
        this.playerX = Math.max(
            Math.min(
                this.playerX +
                    (distX / playerMouseDist) *
                        (this.gameConfig.vPlayer * time),
                100
            ),
            0
        );
        this.playerY = Math.max(
            Math.min(
                this.playerY +
                    (distY / playerMouseDist) *
                        (this.gameConfig.vPlayer * time),
                100
            ),
            0
        );
    }

    public useRender(props: playerProps) {
        this.gameConfig = React.useContext(gameConfigContext);
        useEventListener("mousemove", this.setMousePosition.bind(this));

        return (
            <circle
                cx={this.playerX + "%"}
                cy={this.playerY + "%"}
                r={this.gameConfig.playerRadius + "%"}
                stroke="black"
                stroke-width="1"
                fill={props.color}
            />
        );
    }
}
export const Player = HookedComponent.finalize(_Player);
export type Player = _Player;
