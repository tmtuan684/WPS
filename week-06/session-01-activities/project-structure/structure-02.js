const fs = require('fs');
const path = require('path');

// Define the folder structure as a list of directories to create
const directories = [
  'src/myapp',
  'src/test'
];

// Define the files to create inside those directories (with starter content)
const files = [
  { path: 'src/myapp/__init__.py', content: '' },
  { path: 'src/myapp/utils.py', content: '# Utility functions for myapp\n' },
  { path: 'src/test/__init__.py', content: '' },
  { path: 'src/test/test_division.py', content: '# Tests for division logic\n' }
];

// Create all directories first (recursive: true creates parent folders too,
// and does nothing if a folder already exists — no error either way)
directories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
  console.log('Created directory:', dir);
});

// Then create each file inside its directory
files.forEach((file) => {
  fs.writeFileSync(file.path, file.content);
  console.log('Created file:     ', file.path);
});

console.log('\nProject structure created successfully.');