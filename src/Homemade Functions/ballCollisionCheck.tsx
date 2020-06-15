import React from "react";

export function ballCollisionCheck(
    ball1r: number,
    ball2r: number,
    ball1x: number,
    ball2x: number,
    ball1y: number,
    ball2y: number
) {
    return(
    Math.sqrt(
        Math.pow(Math.abs(ball1x - ball2x), 2) +
            Math.pow(Math.abs(ball1y - ball2y), 2)
    ) < Math.abs(ball1r + ball2r)
    )
}
