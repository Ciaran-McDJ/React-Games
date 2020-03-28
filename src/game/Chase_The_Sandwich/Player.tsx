import React from "react";
import { HookedComponent, useEventListener } from "../../components/hooklib";
import { gameConfig } from "./config";
interface playerProps {
    color: string;
}

class _Player extends HookedComponent<playerProps> {
    useRender(props: playerProps) {
        useEventListener("keydown", event =>{
            console.log("moving", event)
        })
        const config = React.useContext(gameConfig);
        const [xPosition, changeXPosition] = React.useState(config.width);
        return (
            <circle
                cx={xPosition}
                cy="50"
                r="10"
                stroke="black"
                stroke-width="1"
                fill={props.color}
            />
        );
    }
}
export const Player = HookedComponent.finalize(_Player);
export type Player = _Player;
