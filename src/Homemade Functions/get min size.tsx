import React, { useState } from "react";

export function useThing() {
    var ref = React.useRef() as React.RefObject<any>;

    // var [h, changeThing] = useState(height);
    let calcH = 0;
    return [ref, calcH] as const;
}
