import React from "react";

export function useInterval(callback: () => void, ms: number) {
    const cRef = React.useRef(callback);
    cRef.current = callback;
    React.useEffect(() => {
        const cleanupID = setInterval(() => {
            cRef.current();
        }, ms);
        return () => {
            clearInterval(cleanupID);
        };
    }, [ms]);
}

export function useMyEventListener(whenToCall: any, functionToRun: any) {
    React.useEffect(() => {
        window.addEventListener(whenToCall, functionToRun);
        return cleanUp
    }, [whenToCall, functionToRun]);
    function cleanUp(){
        window.removeEventListener(whenToCall, functionToRun)
    }
}
