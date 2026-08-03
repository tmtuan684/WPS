// Exercise 3.2 -- Refactor callback hell into a Promise chain
//
// Starting point: this is the SAME nested-callback version from 3.1.
// Your job: rewrite it using fs.promises and .then()/.catch() chaining instead
// of nested callbacks. Each .then() should return the next file's promise.
//
// Run: node 3.2-promises-starter.js  (after you finish the TODOs)

const fs = require('fs').promises;

// TODO: replace the block below with a .then() chain.
// Structure to aim for:
//
// fs.readFile('sample-files/file1.txt', 'utf8')
//   .then(data1 => {
//     console.log('Read file1:', data1.trim());
//     return fs.readFile('sample-files/file2.txt', 'utf8');
//   })
//   .then(data2 => {
//     console.log('Read file2:', data2.trim());
//     return fs.readFile('sample-files/file3.txt', 'utf8');
//   })
//   .then(data3 => {
//     console.log('Read file3:', data3.trim());
//     console.log('Finished reading files.');
//   })
//   .catch(err => {
//     console.error('An error occurred:', err);
//   });
