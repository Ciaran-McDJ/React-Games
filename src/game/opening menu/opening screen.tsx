import React from "react";
import { Link } from "react-router-dom";

interface PROPSTYPES {}
const styles: React.CSSProperties = {
    width: "48vw",
    height: "48vh",
    borderWidth: "1.5vw",
    borderColor: "red",
    borderStyle: "solid",
    position: "absolute"
};
export function OpeningScreen(props: PROPSTYPES) {
    return (
        <React.Fragment>
            <div
                style={{
                    ...styles,
                    top: "0vh",
                    left: "0vw"
                }}
            >
                <Link to="/asteroid-dash">Asteroids!!!</Link>
            </div>
            <div
                style={{
                    ...styles,
                    top: "0vh",
                    left: "50vw"
                }}
            >
                <Link to="/match">Matching!!!</Link>
            </div>
            <div
                style={{
                    ...styles,
                    top: "50vh",
                    left: "0vw"
                }}
            >
                game to be made
            </div>
            <div
                style={{
                    ...styles,
                    top: "50vh",
                    left: "50vw"
                }}
            >
                game to be made
            </div>
        </React.Fragment>
    );
}
