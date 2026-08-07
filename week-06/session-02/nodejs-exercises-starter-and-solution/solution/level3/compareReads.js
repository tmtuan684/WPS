// Exercise 3.4 — Sequential vs. Concurrent Reads
const fs = require('fs').promises;

const files = ['small.txt', 'medium.txt', 'large.txt'];

async function readSequential() {
  for (const file of files) {
    await fs.readFile(file, 'utf8');
  }
}

async function readConcurrent() {
  await Promise.all(files.map(file => fs.readFile(file, 'utf8')));
}

async function main() {
  console.time('sequential');
  await readSequential();
  console.timeEnd('sequential');

  console.time('concurrent');
  await readConcurrent();
  console.timeEnd('concurrent');

  // Observation: the concurrent version is generally faster (or at least
  // not slower) because all three reads are issued to the OS/event loop
  // at once instead of waiting for each one to finish before starting the
  // next. The difference becomes more noticeable as file sizes grow or
  // when reading from slower storage/network sources.
}

main();
