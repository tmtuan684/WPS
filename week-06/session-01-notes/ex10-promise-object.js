const fs = require('fs/promises');

async function myReadFile() {
    try {
        const data = await fs.readFile('./data/ordinary-text.txt', 'utf-8');
        console.log("File content: ", data);
    }
    catch (err) {
        console.error("Error reading file: ", err);
    }
}

myReadFile();