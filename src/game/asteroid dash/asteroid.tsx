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
                    height: "1vmin",
                    width: "1vmin",
                    borderRadius: "10000vmin",
                    position: "absolute",
                    top: this.props.y + "vmin",
                    left: this.props.x + "vmin"
                }}
            ></div>
        );
    }
}
