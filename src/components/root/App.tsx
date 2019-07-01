import * as React from "react";
import "./App.css";
import { displayDialogRaw } from "util/Dialogs";
import { DialogTest } from "components/DialogTest";

export class App extends React.Component<{}> {
    public render() {
        // because this is the top level component this will return a Fragment,
        // the div is specified in the index.html file.
        return (
            <React.Fragment>
                <div className="BOX" />
                <div className="BOX" />
                <div className="BOX" />
                <div className="BOX" />
                <button
                    onClick={() => {
                        displayDialogRaw((res, rej) => (
                            <DialogTest res={res} rej={rej} />
                        )).then(
                            () => {
                                alert("was resolved!");
                            },
                            () => {
                                alert("was rejected");
                            },
                        );
                    }}
                >
                    open dialog
                </button>
            </React.Fragment>
        );
    }
}

export default App;
