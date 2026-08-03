// Exercise 2.2 — Directory Import
//
// This file is already complete. It only works once utils/index.js exists --
// see utils/index-STARTER.js (rename it to index.js after completing the TODO,
// or rename utils/index-SOLUTION.js to index.js to see it work immediately).
//
// Run: node 2.2-app.js

const { add, multiply, capitalize, shout } = require('./utils');

console.log(add(2, 3));            // 5
console.log(multiply(2, 3));       // 6
console.log(capitalize('node'));   // Node
console.log(shout('hello'));       // HELLO!
