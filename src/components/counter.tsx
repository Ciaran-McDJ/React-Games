import React, { Component } from "react";

class Counter extends Component {
    state = {
        count: 2
    };

    render() {
        return (
            <div>
                <span
                    style={{
                        fontSize: "50px",
                        color: this.state.count === 0 ? "yellow" : "blue"
                    }}
                >
                    {this.formatCount()}
                </span>
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

//count === 0 ? color:red : color:blue

// CAN GIVE TYPE AS ANY TO IGNORE TYPES
// let stuff: any = {
//     fontSize: "1vh"
// };
// stuff.color = "red";

// CAN 'CAST' TO ANY TO IGNORE IN SPECIFIC PLACES
// const someData: string = stuff as any;
