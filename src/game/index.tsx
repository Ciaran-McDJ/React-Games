import React from "react";
import { AsteroidDash } from "./asteroid dash/game1";
import ReactDOM from "react-dom";
import Counter from "components/counter";
import { OpeningScreen } from "./opening menu/opening screen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// export default AsteroidDash;

export function runGame() {
    ReactDOM.render(
        <Router>
            {/* nav bar here */}
            <Switch>
                <Route path="/tutorial">
                    {/* other elements for tutorial */}
                    <Counter />
                </Route>
                <Route path="/asteroid-dash">
                    <AsteroidDash />
                    {/* test code here */}
                </Route>
                <Route path="/">
                    <OpeningScreen />

                    {/* possibly add links, maybe in nav instead */}
                </Route>
                {/* other routes? */}
            </Switch>
        </Router>,
        document.getElementById("root")
    );
}
