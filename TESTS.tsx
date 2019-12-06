import React, { Component } from "react";

class Counter extends Component {
    state = {
        count: 0
    };

    render() {
        const STYLES = {
            fontSize: "50px",
            color: this.state.count === 0 ? "yellow" : "blue"
        };
        return (
            <div>
                <span style={STYLES}>{this.formatCount()}</span>
                <button>Increment</button>
            </div>
        );
    }
    formatCount() {
        const { count } = this.state;

        return count === 0 ? "Zero" : count;
    }
}

export default Counter;
