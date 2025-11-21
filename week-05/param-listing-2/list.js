/**
 * A program that accepts two parameters: --dir to specify a directory, and --type to choose whether to list files, directories, or both, and then displays the matching items.
 */
const fs = require('fs');
const path = require('path');

/**
 * Get argument of the a specific parameter
 * @param {*} flag 
 * @returns positive index if argument exists, 0 if the argument does not exist 
 */
function indexOf(flag) {
    let indexAfterFlag = process.argv.indexOf(flag) + 1; 
    return indexAfterFlag;
}

let dir = indexOf("--dir") === 0 ? "./" : process.argv[indexOf("--dir")];
let type = indexOf("--type") === 0 ? "*" : process.argv[indexOf("--type")];

let files = fs.readdirSync(dir);

for(let item of files) {
    const stat = fs.statSync(path.join(dir, item));
    if (type === "file" && stat.isFile() ) 
        console.log(item, " -> FILE");
    else if (type === "directory" && stat.isDirectory()) 
        console.log(item, " -> DIRECTORY");
    else 
        console.log(item);
}
