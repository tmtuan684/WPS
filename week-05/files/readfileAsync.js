/**
 * 
 */
const fs = require('fs');

fs.readFile('./books/CSLewis-Nania.txtx', "UTF-8", (err, data) => {
    if (err) {
        console.log(err);
    }
    else 
        console.log(data);
});
console.log("Reading the file...");

