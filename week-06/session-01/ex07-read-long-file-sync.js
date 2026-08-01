// Declare to use fs module
const fs = require('fs');

// Read file Synchronously. 
// The next lines of code do not execute until the entire file has been completely read
const content = fs.readFileSync('./data/summa-theologica.txt','utf-8');

console.log('Sync read: ', content);

console.log('This program reads a file synchronously.');