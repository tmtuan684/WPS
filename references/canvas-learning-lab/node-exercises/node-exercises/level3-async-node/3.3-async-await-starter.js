// Exercise 3.3 -- Refactor & Time It
//
// Rewrite the same three-file read as an `async` function using `await`, wrapped
// in try/catch, and measure how long all three reads take together using
// console.time()/console.timeEnd().
//
// Run: node 3.3-async-await-starter.js  (after you finish the TODOs)

const fs = require('fs').promises;

async function readAllFiles() {
  // TODO 1: start a timer -- console.time('read')

  // TODO 2: wrap the following in try / catch / finally
  //   - await fs.readFile('sample-files/file1.txt', 'utf8')
  //   - await fs.readFile('sample-files/file2.txt', 'utf8')
  //   - await fs.readFile('sample-files/file3.txt', 'utf8')
  //   - console.log each result (trimmed)
  //   - in the catch block: console.error the error
  //   - in the finally block: console.timeEnd('read')
}

readAllFiles();

// BONUS (try after the above works): replace the three sequential `await` calls
// with a single `Promise.all([...])` so all three files are read CONCURRENTLY
// instead of one after another. Compare the timer output between both versions.
