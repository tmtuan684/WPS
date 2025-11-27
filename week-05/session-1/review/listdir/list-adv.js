/**
 * Program to take a directory as a third argument list its content, indicating if a content item is a FILE or a DIRECTORY
 */
const fs = require('fs');
const path = require('path');

let dir = process.argv.length === 3 ? process.argv[2] : "./";

let files = fs.readdirSync(dir);

for(let item of files) {
    const stat = fs.statSync(path.join(dir,item));
    if (stat.isFile()) {
        console.log(item, " -> FILE");
    }
    else if (stat.isDirectory()) {
        console.log(item, " -> DIRECTORY");
    }
}