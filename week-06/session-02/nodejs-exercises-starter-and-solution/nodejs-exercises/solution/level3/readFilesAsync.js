// Exercise 3.3 — Convert Promises to Async/Await
const fs = require('fs').promises;

async function readOneFile(filename) {
  try {
    await fs.readFile(filename, 'utf8');
    console.log(`Done reading ${filename}`);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
  }
}

async function main() {
  // Fire off all three without awaiting each other here so the
  // non-blocking behavior is preserved (same spirit as 3.1/3.2).
  readOneFile('small.txt');
  readOneFile('medium.txt');
  readOneFile('large.txt');

  // Also demonstrate error handling against a missing file.
  readOneFile('missing.txt');

  console.log('Started reading files.');
}

main();
