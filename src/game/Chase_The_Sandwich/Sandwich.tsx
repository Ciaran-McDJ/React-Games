import React from "react";
import { HookedComponent } from "../../components/hooklib";
import { defaultGameConfig, gameConfigContext } from "./config";
import { ballCollisionCheck } from "Homemade Functions/ballCollisionCheck";

interface sandwichProps {
    color: string;
}

class _Sandwich extends HookedComponent<sandwichProps> {
    @HookedComponent.RenderAffecting
    public sandwichX = Math.random()*100;
    @HookedComponent.RenderAffecting
    public sandwichY = Math.random()*100;

    public gameConfig = defaultGameConfig;

    public repositionSandwich(playerX:number, playerY:number) {
        let newX = Math.random()*100
        let newY = Math.random()*100
        let replaces = 0
        while (ballCollisionCheck(7, 7, newX, playerX, newY, playerY)) {
            newX = Math.random()*100
            newY = Math.random()*100
            replaces += 1
            if (replaces > 5){
                console.log("WHAT!!! THIS ACTUALLY HAPPENED!!!!!!")
                break
            }

        }


        this.sandwichX = newX
        this.sandwichY = newY
    }

    public useRender(props: sandwichProps) {
        this.gameConfig = React.useContext(gameConfigContext);
        return (
            <circle
                cx={this.sandwichX + "%"}
                cy={this.sandwichY + "%"}
                r={this.gameConfig.sandwichRadius + "%"}
                stroke="blue"
                stroke-width="1"
                fill={props.color}
            />
        );
    }
}

export const Sandwich = HookedComponent.finalize(_Sandwich);
export type Sandwich = _Sandwich;
