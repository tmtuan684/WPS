// Exercise 3.4 — Sequential vs. Concurrent Reads
const fs = require('fs').promises;

const files = ['small.txt', 'medium.txt', 'large.txt'];

// TODO: write readSequential() — an async function that awaits each
// file read one after another (in a loop, using await inside).
async function readSequential() {
  // TODO
}

// TODO: write readConcurrent() — an async function that uses
// Promise.all() to read all three files at once.
async function readConcurrent() {
  // TODO
}

async function main() {
  console.time('sequential');
  await readSequential();
  console.timeEnd('sequential');

  console.time('concurrent');
  await readConcurrent();
  console.timeEnd('concurrent');

  // TODO: write 1-2 sentences here (as a comment) explaining what you
  // observed and why.
}

main();
