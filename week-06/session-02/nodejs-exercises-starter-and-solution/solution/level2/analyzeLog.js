// Exercise 2.5 — Log File Analyzer
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'access.log');
const content = fs.readFileSync(logPath, 'utf8');

const lines = content.split('\n').filter(Boolean);

const counts = { INFO: 0, WARNING: 0, ERROR: 0 };

for (const line of lines) {
  const level = line.split(' ')[0];
  if (counts.hasOwnProperty(level)) {
    counts[level]++;
  }
}

console.log(`INFO: ${counts.INFO}`);
console.log(`WARNING: ${counts.WARNING}`);
console.log(`ERROR: ${counts.ERROR}`);
