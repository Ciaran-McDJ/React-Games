import React from "react";

interface PlayerProps {
    /** x position in pixels */
    x: number;
    /** y position in pixels */
    y: number;
    /** radius of player */
    radius: number;
}
// export class Player extends React.Component<PlayerProps> {
//     render() {
//         return (
//             <div
//                 style={{
//                     top: this.props.y,
//                     left: this.props.x,
//                     position: "absolute",
//                     backgroundColor: "red"
//                 }}
//             >
//                 PLAYER
//             </div>
//         );
//     }
// }

export function Player(props: PlayerProps) {
    return (
        <div
            style={{
                top: props.y + "vmin",
                left: props.x + "vmin",
                height: props.radius + "vmin",
                width: props.radius + "vmin",
                borderRadius: "100vmin",
                position: "absolute",
                backgroundColor: "red"
            }}
        ></div>
    );
}
