// Exercise 3.3 — Convert Promises to Async/Await
const fs = require('fs').promises;

// TODO: write an async function that reads small.txt, medium.txt, and
// large.txt using await, wrapped in a try/catch. Log "Done reading <file>"
// for each, and log an error message if a file can't be read.

// TODO: also test it against a file that does NOT exist, e.g. "missing.txt",
// and confirm your catch block handles it gracefully.

console.log('Started reading files.');
