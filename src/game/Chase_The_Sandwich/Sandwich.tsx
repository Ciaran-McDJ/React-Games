import React from "react";
import { HookedComponent } from "../../components/hooklib";
import { defaultGameConfig, gameConfigContext } from "./config";

interface sandwichProps {
    color: string;
}

class _Sandwich extends HookedComponent<sandwichProps> {
    @HookedComponent.RenderAffecting
    public sandwichX = Math.random()*100;
    @HookedComponent.RenderAffecting
    public sandwichY = Math.random()*100;

    public gameConfig = defaultGameConfig;

    public repositionSandwich() {
        this.sandwichX = Math.random()*100
        this.sandwichY = Math.random()*100
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
