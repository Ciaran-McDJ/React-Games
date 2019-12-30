import React from "react";
import { Link } from "react-router-dom";

interface GameProps {
    // game has no inputs
}
interface GameState {}

export class MatchGame extends React.Component<GameProps, GameState> {
    state: GameState = {};
    render() {
        return <Link to="/">opening screen</Link>;
    }
}
