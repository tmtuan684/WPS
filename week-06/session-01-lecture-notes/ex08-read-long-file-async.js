// Declare to use fs module
const fs = require('fs');

// Read file asynchronously
// The next lines of code can be executed even when the file has not completely read.
fs.readFile('./data/quite-long-text.txt','utf-8', (err, data) => {
    if (err) throw err;
    console.log('Async read successfully ');    
});

console.log('This program reads a file asynchronously.');