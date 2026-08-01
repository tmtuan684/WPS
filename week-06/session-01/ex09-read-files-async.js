const fs = require('fs');

// Reading file 1, the largest file
fs.readFile ('data/summa-theologica.txt', 'utf8', (err, data1) => {
    if (err) throw err;
    console.log('Done Reading file 1 (the largest file)!');
})

// Reading file 2, quite long file
fs.readFile('data/quite-long-text.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Done Reading file 2 (quite long file)!');
})

// Reading file 3, ordinary file
fs.readFile('data/ordinary-text.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Done Reading file 3 (ordinary file)!');
})

console.log('Start reading files');