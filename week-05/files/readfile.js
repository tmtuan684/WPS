/**
 * 
 */
const fs = require('fs');

let file = fs.readFileSync("./books/KingJames-Bible.txt", "UTF-8");

console.log(file);

console.log("Reading the file...");