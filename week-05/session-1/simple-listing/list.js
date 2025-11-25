/**
 * Program to take a directory as a third argument list its content 
 */

const fs = require('fs');

// If user provides a directory, list its content
// otherwise, list content in th current directory
let dir = process.argv.length === 3 ? process.argv[2] : "./";

let files = fs.readdirSync(dir);
 
console.log(files); 