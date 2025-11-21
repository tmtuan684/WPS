const fs = require('fs');

let content = `
    this is my new file
`;
fs.writeFile('myfile2.txt', content.trim(), function(err,data) {
    if(err) {
        console.err(err);
    }
    else {
        console.log(data);
        console.log("File created");
    }
});

