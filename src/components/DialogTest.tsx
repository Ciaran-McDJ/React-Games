import * as React from "react";

export function DialogTest({ res, rej }: { res: () => void; rej: () => void }) {
    return (
        <dialog open style={{ height: "50%", width: "50%" }}>
            DIALOG!!
            <button onClick={res}>resolve</button>
            <button onClick={rej}>reject</button>
        </dialog>
    );
}
