// this export just gets the compiler to see this as a module
// otherwise it complains that there are no imports or exports
export default null;

// CAN GIVE TYPE AS ANY TO IGNORE TYPES
// let stuff: any = {
//     fontSize: "1vh"
// };
// stuff.color = "red";

// CAN 'CAST' TO ANY TO IGNORE IN SPECIFIC PLACES
// const someData: string = stuff as any;

// const things = ["hello", "world", "Stuff"];

// for (var idx = 0; idx < things.length; idx += 1) {
//     const elem = things[idx];
//     const nextElem = things[idx + 1];
//     console.log(elem);
// }

// function test() {
//     if (true) {
//         var x = 5;
//         const y = 6;

//         console.log(x, y);
//     }
//     console.log(x, y);
// }
// var Th = 3;
