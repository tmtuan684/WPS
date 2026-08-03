// Exercise 3.2 -- Refactor callback hell into a Promise chain (Solution)
//
// Run: node 3.2-promises-solution.js

const fs = require('fs').promises;

fs.readFile('sample-files/file1.txt', 'utf8')
  .then(data1 => {
    console.log('Read file1:', data1.trim());
    return fs.readFile('sample-files/file2.txt', 'utf8');
  })
  .then(data2 => {
    console.log('Read file2:', data2.trim());
    return fs.readFile('sample-files/file3.txt', 'utf8');
  })
  .then(data3 => {
    console.log('Read file3:', data3.trim());
    console.log('Finished reading files.');
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });
