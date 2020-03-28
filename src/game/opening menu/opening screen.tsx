import React from "react";
import { Link } from "react-router-dom";

interface PROPSTYPES {}
const styles: React.CSSProperties = {
    width: "40%",
    //height: "10vh",
    borderWidth: "1.5vw",
    borderColor: "red",
    borderStyle: "solid",
    flexGrow: 1
};

export function OpeningScreen() {
    return (
        <div
            style={{
                backgroundColor: "rgba(0,254,254,0.5)",
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
            }}
        >
            <div
                style={{
                    ...styles
                }}
            >
                <Link to="/asteroid-dash">Asteroids!!!</Link>
            </div>
            <div
                style={{
                    ...styles
                }}
            >
                <Link to="/match">Matching!!!</Link>
            </div>
            <div
                style={{
                    ...styles
                }}
            >
                <Link to="/chase-the-sandwich">Chase That Sandwich!!!</Link>
            </div>
            <div
                style={{
                    ...styles
                }}
            >
                game to be made
            </div>
        </div>
    );
}

export function OpeningScreen_old(props: PROPSTYPES) {
    return <React.Fragment></React.Fragment>;
}
