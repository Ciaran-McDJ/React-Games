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

// export interface Ball {
//     x: number;
//     y: number;
//     r: number;
// }

// function dist2D(dx: number, dy:number){
//     return Math.sqrt(dx*dx + dy*dy);
// }
// export function collisionCheck(a: Ball, b: Ball){
//     return dist2D(a.x-b.x, a.y-b.y) <= (a.r + b.r);
// }