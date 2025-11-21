/**
 * A program that accepts three parameters: --dir to specify a directory, --type to choose whether to list files, directories, or both, and --search for file or folder name to filter and then displays the matching items.
 */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
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
let search = indexOf("--search") === 0 ? "" : process.argv[indexOf("--search")];

let files = fs.readdirSync(dir);

console.log(`Listing content from ${chalk.blue(dir)} \nType ${chalk.yellow(type)}\nSearch ${chalk.green(search)}`);

for(let item of files) {
    const stat = fs.statSync(path.join(dir, item));

    const searchMatch = search === "" || item.toLowerCase() === search.toLowerCase();
    const typeMatch = type === "*" || (stat.isFile() && type.toLowerCase() === "file") || 
                        (stat.isDirectory() && type.toLowerCase() === "directory"); 
    
    if (searchMatch && typeMatch)
        console.log(item);
}
