/**
 * Program to take a directory as a third argument and file type of file or directory as forth argument and list items of the chosen file types
 */
const fs = require('fs');
const path = require('path');

let dir = process.argv.length === 3 ? process.argv[2] : "./";
let type = process.argv.length === 4 ? process.argv[3] : "";

let files = fs.readdirSync(dir);

for(let item of files) {
    const stat = fs.statSync(path.join(dir,item));
    if (type === "file" && stat.isFile() ) 
        console.log(item, " -> FILE");
    else if (type === "directory" && stat.isDirectory()) 
        console.log(item, " -> DIRECTORY");
    else 
        console.log(item);
}
