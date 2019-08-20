import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/counter";
import * as serviceWorker from "./notTouch/serviceWorker";

// import "bootstrap/dist/css/bootstrap.css";
// import "./index.css";

ReactDOM.render(<Counter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// const things = ["hello", "world", "Stuff"];

// for (var idx = 0; idx < things.length; idx += 1) {
//     const elem = things[idx];
//     const nextElem = things[idx + 1];
//     console.log(elem);
// }

// function test() {
//     if (true) {
//         var x = 5;
//         const y = 6;

//         console.log(x, y);
//     }
//     console.log(x, y);
// }
// var Th = 3;
