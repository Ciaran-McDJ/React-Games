import React from "react";

export interface AsteroidProps {
    x: number;
    y: number;
    color: string;
}

export class Asteroid extends React.Component<AsteroidProps> {
    render() {
        return (
            <div
                style={{
                    backgroundColor: this.props.color,
                    height: "10px",
                    width: "10px",
                    borderRadius: "100px",
                    position: "absolute",
                    bottom: this.props.y + "%",
                    left: this.props.x + "%"
                }}
            ></div>
        );
    }
}
