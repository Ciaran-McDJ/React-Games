import React from "react";
import { AsteroidDash } from "./asteroid dash/game1";
import { MatchGame } from "./match/game2";
import ReactDOM from "react-dom";
import Counter from "components/counter";
import { OpeningScreen } from "./opening menu/opening screen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavBar } from "./nav_bar";
import { ChaseTheSandwich } from "./Chase_The_Sandwich/game3";
export function runGame() {
    ReactDOM.render(
        <Router>
            <div
                id="app"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "calc(100vh - 16px)"
                }}
            >
                <NavBar />
                <Switch>
                    <Route path="/tutorial">
                        {/* other elements for tutorial */}
                        <Counter />
                    </Route>
                    <Route path="/asteroid-dash">
                        <AsteroidDash />
                        {/* test code here */}
                    </Route>
                    <Route path="/match">
                        <MatchGame />
                        {/* test code here */}
                    </Route>
                    <Route path="/chase-the-sandwich">
                        <ChaseTheSandwich />
                    </Route>
                    <Route path="/">
                        <OpeningScreen />
                        {/* possibly add links, maybe in nav instead */}
                    </Route>
                    {/* other routes? */}
                </Switch>
            </div>
        </Router>,
        document.getElementById("root")
    );
}
