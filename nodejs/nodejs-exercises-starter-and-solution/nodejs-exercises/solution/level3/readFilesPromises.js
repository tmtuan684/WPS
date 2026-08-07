// Exercise 3.2 — Convert Callbacks to Promises
const fs = require('fs').promises;

fs.readFile('small.txt', 'utf8')
  .then(data => console.log('Done reading small.txt'))
  .catch(err => console.error('Error reading small.txt:', err.message));

fs.readFile('medium.txt', 'utf8')
  .then(data => console.log('Done reading medium.txt'))
  .catch(err => console.error('Error reading medium.txt:', err.message));

fs.readFile('large.txt', 'utf8')
  .then(data => console.log('Done reading large.txt'))
  .catch(err => console.error('Error reading large.txt:', err.message));

console.log('Started reading files.');
