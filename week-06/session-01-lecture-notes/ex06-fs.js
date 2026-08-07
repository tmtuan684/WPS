const fs = require('fs');

// Make a folder
fs.mkdirSync('my_folder');

// Make a text file
fs.writeFileSync('my_folder/my_file.txt', 'This is an example file content.');

// Make a copy of the file and name it my_copy_file.txt
fs.copyFileSync('my_folder/my_file.txt', 'my_folder/my_copy_file.txt');

