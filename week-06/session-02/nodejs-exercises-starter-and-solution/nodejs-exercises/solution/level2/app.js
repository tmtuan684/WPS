// Exercise 2.1 — Your First Module (consumer)
const { add, subtract, multiply } = require('./mathUtils');

console.log('add(2, 3) =', add(2, 3));
console.log('subtract(5, 2) =', subtract(5, 2));
console.log('multiply(4, 6) =', multiply(4, 6));
