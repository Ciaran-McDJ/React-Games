import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Dialogs.css";

let isShowingDialog = false;
let _displayDialog: (dialog: React.ReactNode) => void;
let _closeDialog: () => void;
/**
 * This component must only be instantiated from top level index.tsx.
 *
 * This manages displaying the dialogs and other overlays that should cover the entire application.
 */
export function Overlay() {
    const [display, setDisplay] = React.useState<React.ReactNode>(null);
    isShowingDialog = display !== null;
    _displayDialog = setDisplay;
    _closeDialog = () => setDisplay(null);

    return ReactDOM.createPortal(display, document.getElementById("Overlay")!);
}
/**
 * This error is thrown when ever some code tries to show a dialog when another dialog is already being shown.
 */
export const ALREADY_SHOWING_DIALOG_ERROR = new Error(
    "A dialog or other overlay is already being displayed",
);
/**
 * Inner most raw version of displaying a dialog or other overlay.
 * This function takes a callback similar to a promise and should return a UI ReactNode to
 * display as a overlay message. When either the resolve or reject function has been called the dialog will be closed.
 */
export function displayDialogRaw<Res = undefined, Err = any>(
    uiGen: (
        resolve: [Res] extends [undefined]
            ? (val?: Res) => void
            : (val: Res) => void,
        reject: (reason?: Err) => void,
    ) => React.ReactNode,
) {
    if (isShowingDialog) {
        throw ALREADY_SHOWING_DIALOG_ERROR;
    } else {
        return new Promise<Res>((res, rej) => {
            const display = uiGen(
                res as [Res] extends [undefined]
                    ? (val?: Res) => void
                    : (val: Res) => void,
                rej,
            );
            _displayDialog(display);
        }).finally(_closeDialog);
    }
}
