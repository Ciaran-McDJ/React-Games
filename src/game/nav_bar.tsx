import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <div style={{ backgroundColor: "rgba(255,255,0,0.7)", height: 20 }}>
            NAV <Link to="/">Home!!!!!!!!!</Link>
        </div>
    );
}
