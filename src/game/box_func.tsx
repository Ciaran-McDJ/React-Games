import React from "react";

interface props {
    width: number;
    height: number;
    horizontalCenter: any;
}

function Box(Props: props) {
    return (
        <div
            style={{
                width: "48vw",
                height: "48vh",
                borderWidth: "1.5vw",
                borderColor: "red",
                borderStyle: "solid",
                position: "absolute"
            }}
        ></div>
    );
}
