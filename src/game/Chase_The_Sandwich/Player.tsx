import React from "react";
import { HookedComponent, useEventListener } from "../../components/hooklib";
import { gameConfigContext } from "./config";
import { useInterval } from "Homemade Functions/utils";

interface playerProps {
    color: string;
}

class _Player extends HookedComponent<playerProps> {
    public useRender(props: playerProps) {
        let gameConfig = React.useContext(gameConfigContext);
        useEventListener("mousemove", setMousePosition);
        useInterval(() => movePlayer(1/gameConfig.fps), 1000/gameConfig.fps);
        let [mouseX, changeMouseX] = React.useState(0);
        let [mouseY, changeMouseY] = React.useState(0);
        let [playerX, changePlayerX] = React.useState(50);
        let [playerY, changePlayerY] = React.useState(50);
        return (
            <circle
                cx={playerX + "%"}
                cy={playerY + "%"}
                r={3 + "%"}
                stroke="black"
                stroke-width="1"
                fill={props.color}
            />
        );
        function setMousePosition(event) {
            changeMouseX((event.offsetX / gameConfig.gameWidth) * 100);
            changeMouseY((event.offsetY / gameConfig.gameHeight) * 100);
        }

        function movePlayer(time: number) {
            // time in seconds
            // distances between player and mouse
            let distX = mouseX - playerX;
            let distY = mouseY - playerY;
            let playerMouseDist = Math.sqrt(distX * distX + distY * distY);
            if ((gameConfig.vPlayer*time)>(playerMouseDist)) {
                changePlayerX(mouseX)
                changePlayerY(mouseY)
                return
            }
            changePlayerX(
                Math.max(Math.min(playerX +
                    (distX / playerMouseDist) * (gameConfig.vPlayer * time), 100), 0)
            );
            changePlayerY(
                Math.max(Math.min(playerY +
                    (distY / playerMouseDist) * (gameConfig.vPlayer * time), 100), 0)
            );
        }
    }
}
export const Player = HookedComponent.finalize(_Player);
export type Player = _Player;
