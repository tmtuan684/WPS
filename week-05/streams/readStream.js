const fs = require('fs');

let readStream = fs.createReadStream('./sample_chat_log.txt', 'UTF-8');

let data; 

readStream.once("data", (chunk) => {    // Event that emits once at the beginning of the operation of the stream object 
    console.log('Start reading log...');
    console.log('=====================');
    console.log(chunk);
});

readStream.on("data", (chunk) => {
    console.log(`chunk length: ${chunk.length}`); // Event that emits multiple times
    data += chunk;
    console.log(`data length: ${data.length}`);
});

readStream.on("end", () => {
    console.log(`\nFinished reading; ${data.length} read`);
})

console.log('Reading the file');

// fs.readFile('./sample_chat_log.txt', 'UTF-8', (err, data) => {
//     console.log(`Amount of characters: ${data.length}`);
// }); // The entire file is read before the callback is called.
// console.log("Reading the chat log");