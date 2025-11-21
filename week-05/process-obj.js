/**
 * process object
 * Define a function to list all arguments from the command line 
 */
const path = require('path');
function showArg() {

    process.argv.forEach((val, i) => {
        console.log(`param ${i+1}, ${path.basename(val)}`);
    })
}
showArg();