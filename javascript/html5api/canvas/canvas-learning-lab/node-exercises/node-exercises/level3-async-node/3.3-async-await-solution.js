// Exercise 3.3 -- Refactor & Time It (Solution)
//
// Run: node 3.3-async-await-solution.js

const fs = require('fs').promises;

async function readAllFiles() {
  console.time('read');
  try {
    const data1 = await fs.readFile('sample-files/file1.txt', 'utf8');
    console.log('Read file1:', data1.trim());

    const data2 = await fs.readFile('sample-files/file2.txt', 'utf8');
    console.log('Read file2:', data2.trim());

    const data3 = await fs.readFile('sample-files/file3.txt', 'utf8');
    console.log('Read file3:', data3.trim());

    console.log('Finished reading files.');
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    console.timeEnd('read');
  }
}

readAllFiles();

// BONUS solution -- concurrent version using Promise.all:
//
// async function readAllFilesConcurrently() {
//   console.time('read-concurrent');
//   try {
//     const [data1, data2, data3] = await Promise.all([
//       fs.readFile('sample-files/file1.txt', 'utf8'),
//       fs.readFile('sample-files/file2.txt', 'utf8'),
//       fs.readFile('sample-files/file3.txt', 'utf8')
//     ]);
//     console.log('Read file1:', data1.trim());
//     console.log('Read file2:', data2.trim());
//     console.log('Read file3:', data3.trim());
//   } catch (err) {
//     console.error('An error occurred:', err);
//   } finally {
//     console.timeEnd('read-concurrent');
//   }
// }
// readAllFilesConcurrently();
