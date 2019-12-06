import React, { Component } from "react";

class Counter extends Component {
    state = {
        count: 0,
        tags: ["tag1", "tag2", "tag3"]
    };

    // constructor() {
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
    };
    turnTagIntoElem = tag => <li key={tag}>{tag}</li>;
    render() {
        return (
            <div>
                <span style={this.getStyles()}>{this.formatCount()}</span>
                <br />
                <button onClick={this.handleIncrement}>Increment</button>

                {this.state.tags.length === 0 && <p>"There are no tags"</p>}
                <ul>{this.state.tags.map(this.turnTagIntoElem)}</ul>
            </div>
        );
    }
    getStyles() {
        return {
            fontSize: "50px",
            color: this.state.count === 0 ? "yellow" : "blue"
        };
    }
    formatCount() {
        const { count } = this.state;

        return count === 0 ? "Zero" : count;
    }
}

export default Counter;

// function useCounter(initialValue: number = 0){
//     return React.useReducer((count: number, inc: number)=>count+inc, initialValue);
// }
// function makeRegisterHook<Args extends any[]>(registerListener: (...args: Args)=>void, unregister: (...args: Args)=>void){
//     return function useListener(...args: Args){
//         React.useEffect(()=>{
//             registerListener(...args);
//             return ()=>{
//                 unregister(...args);
//             }
//         })
//     }
// }
// const useWindowEventListener = makeRegisterHook(window.addEventListener, window.removeEventListener);

// function CounterHooks(props){
//     const [count, increment] = useCounter();
//     useWindowListener('ke')
//     return
// }
