import React from "react";

const defaultGameConfig = {
    width: 300,
    height: 200,
    // /** turns percentage of width into pixel x value */
    // widthPixel(percentage: number){
    //     return percentage/100 * defaultGameConfig.width
    // },
    // /** turns percentage of height into pixel y value */
    // heightPixel(percentage: number){
    //     return percentage/100 * defaultGameConfig.height
    // }
}
export const gameConfig = React.createContext(defaultGameConfig);