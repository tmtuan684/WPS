// Exercise 3.1 — Callback-Based File Reading
const fs = require('fs');

// PREDICTION: Since fs.readFile() is asynchronous and non-blocking,
// Node starts all three reads "at once" and moves on immediately to
// "Started reading files." The smaller files typically finish first,
// so the expected order is: small -> medium -> large (roughly, size-based).

fs.readFile('small.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Done reading small.txt');
});

fs.readFile('medium.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Done reading medium.txt');
});

fs.readFile('large.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Done reading large.txt');
});

console.log('Started reading files.');
