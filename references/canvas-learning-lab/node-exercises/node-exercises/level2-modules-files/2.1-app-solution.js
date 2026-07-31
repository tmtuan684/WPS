// Exercise 2.1 — CommonJS require/module.exports (Solution)
//
// Run: node 2.1-app-solution.js

const { add, multiply } = require('./2.1-math-utils.js');

console.log(add(4, 7));       // 11
console.log(multiply(6, 3));  // 18
