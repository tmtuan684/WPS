// Exercise 3.5 — Build a CLI Word Counter with npm
// Setup:
//   npm init -y
//   npm install chalk@4   (chalk@4 works with require(); v5+ is ESM-only)
//
// Run with: node wordCount.js small.txt

const fs = require('fs').promises;
const chalk = require('chalk');

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error(chalk.red('Usage: node wordCount.js <path-to-file>'));
    process.exitCode = 1;
    return;
  }

  const content = await fs.readFile(filePath, 'utf8');

  const words = content
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.replace(/[^a-z0-9']/g, ''))
    .filter(Boolean);

  const total = words.length;

  const frequency = {};
  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }

  const topWords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  console.log(chalk.green(`Total words: ${total}`));
  console.log(chalk.yellow('Top 3 words:'));
  topWords.forEach(([word, count], i) => {
    console.log(chalk.cyan(`  ${i + 1}. ${word} (${count})`));
  });
}

main().catch(err => console.error(chalk.red('Error:'), err.message));
