import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * This creates a React.Portal to the #sys-bar div
 * Which is placed above the #App div.
 * This contains the standard elements like ericsson logo and such
 */
export function SysBar() {
    return ReactDOM.createPortal(
        // TODO: implement the system bar.
        <React.Fragment>SYS BAR HEADER!</React.Fragment>,
        document.getElementById("sys-bar")!,
    );
}

export default SysBar;
