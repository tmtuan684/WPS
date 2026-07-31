// 3.1 -- Reference example, not an exercise. Read this before doing 3.2 and 3.3.
//
// Run from inside level3-async-node/, after copying sample-files/*.txt next to
// this file (or edit the paths below to point at sample-files/):
//   node 3.1-callback-hell-reference.js

const fs = require('fs');

fs.readFile('sample-files/file1.txt', 'utf8', (err, data1) => {
  if (err) throw err;
  console.log('Read file1:', data1.trim());

  fs.readFile('sample-files/file2.txt', 'utf8', (err, data2) => {
    if (err) throw err;
    console.log('Read file2:', data2.trim());

    fs.readFile('sample-files/file3.txt', 'utf8', (err, data3) => {
      if (err) throw err;
      console.log('Read file3:', data3.trim());
      console.log('Finished reading files.');
    });
  });
});
