import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "components/root/App";
import * as serviceWorker from "util/serviceWorker";
import { Provider } from "react-redux";
import { store } from "reduxStore";
import SysBar from "components/root/SysBar";
import { Overlay } from "util/Dialogs";

//
// root div will act as it's own container, with the header on top and main content within.
// this will render both children so we don't add an unecessary layer.
ReactDOM.render(
    <Provider store={store}>
        <Overlay // this creates a portal to #Overlay div
        />
        <SysBar // this creates a portal to #sys-bar nav
        />
        <App // this renders a fragment of the things to put inside the #App container.
        />
    </Provider>,
    document.getElementById("App"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
