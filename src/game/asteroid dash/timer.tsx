import React from "react";
import { Color } from "csstype";

interface timerProps {
    time: number;
    //x position in pixels
    x: number;
    //y position in pixels
    y: number;
    backgroundColor: any;
}
export class Timer extends React.Component<timerProps> {
    render() {
        return (
            <div
                style={{
                    fontSize: 20,
                    position: "absolute",
                    top: this.props.y + "vh",
                    right: this.props.x + "vw",
                    backgroundColor: this.props.backgroundColor
                }}
            >
                Time: {this.props.time}
            </div>
        );
    }
}
