const fs = require('fs');

let content = `
    this is my new file
`;

fs.writeFileSync('myfile.txt', content.trim());

