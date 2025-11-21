/**
 * 
 */
const fs = require('fs');

let writeStream = fs.createWriteStream('log.txt', 'UTF-8');

console.log("Everything that you type will be recorded into log.txt\n--------------\n")
process.stdin.once("data", (data) => {
    writeStream.write("Log starts\n=================\n");
});

process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    if(input !== "exit") 
        writeStream.write(input);
    else {
        writeStream.close();
        process.exit();
    }
})
